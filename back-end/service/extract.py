from pdf2image import convert_from_path
import os
import cv2
import numpy as np
import tempfile
from sqlalchemy.orm import Session
from . import answer as answer_service
from . import question as question_service
from util.base64 import convert_to_base64, resize_img
import pandas as pd
from model import models
import http3, random
from bs4 import BeautifulSoup
import asyncio
from schema.constant import NameSourceExam
import requests
from sys import platform
#region
def asyncQuery(url):
    client = http3.AsyncClient()
    
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    htmlText = loop.run_until_complete(client.get(url, verify=False,headers={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"}))
    # htmlText= await client.get(url, verify=False,headers={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"})
    soup = BeautifulSoup(htmlText.text, 'html.parser')
    loop.close()
    return soup

def get_url_download(source_url: str, source: NameSourceExam):
        soup = asyncQuery(source_url)
        try:
            href = None
            if (source == NameSourceExam.TOAN_MATH) :
                content = soup.find("div", class_="entry-content clearfix")
                btn_download = content.find("center").find("a")
                href = btn_download.get("href")
                return href

            
            if (source == NameSourceExam.ON_LUYEN) :
                btn_download = soup.find("a", class_="btn btn-primary mb-3 btn_doc")
                href = btn_download.get("href")
                return href
            print(href)
            return href
        except Exception as e:
            print(e.args)
            return None
        
def download_file_and_convert_to_img(url: str):
    print(url)
    response = requests.get(url)
    file_name = "dethi.pdf"
    file = open(file_name, "wb")
    file.write(response.content)
    file.close()

    if platform == "win32":
        dir_path = os.getcwd()
        dir_path = dir_path.replace("\\", "\\\\")
        poppler_path = 'poppler-0.68.0\\bin'
        full_path = f"{dir_path}\\{poppler_path}"
        pages = convert_from_path(file_name, 500, poppler_path=full_path)
        os.remove(file_name)
        return pages
    else:
        pages = convert_from_path(file_name, 500)
        os.remove(file_name)
        return pages

def process_download_file_and_get_full_img(source_url: str, source: NameSourceExam):
    try:
        url = get_url_download(source_url, source)
        pages = download_file_and_convert_to_img(url)
        result = create_img_full(pages)
        return result
    except Exception as error:
        print(f"error when getting full img: {str(error.args)}")
#endregion


#region
# create image_full

def del_last_page(img):
    line_white = img[-1,:,:]
    line = img.shape[0]-1
    line_h = 0
    line_l = 0
    while True:
        comparison = line_white == img[line,:,:]
        equal_image = comparison.all()
        if equal_image == False:
            line_l = line
            while True:
                comparison1 = line_white == img[line,:,:]
                equal_image1 = comparison1.all()
                if equal_image1 == True:
                    line_h = line
                    return line_h - 10
                line -= 1
        line -= 1

def convert_pdf_to_img(file):
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        temp_path = temp_file.name
        file.file.seek(0)
        temp_file.write(file.file.read())
        
    # content = await file.read()
    print(platform)
    if platform == "win32":
        dir_path = os.getcwd()
        dir_path = dir_path.replace("\\", "\\\\")
        poppler_path = 'poppler-0.68.0\\bin'
        full_path = f"{dir_path}\\{poppler_path}"
        print(full_path)
        pages = convert_from_path(temp_path, 500, poppler_path=full_path)
        os.remove(temp_path)
        return pages
    else:
        pages = convert_from_path(temp_path, 500)
        os.remove(temp_path)
        return pages
    

def create_img_full(pages):
    image_res = []
    for page in pages:
        cv_image = cv2.cvtColor(np.array(page), cv2.COLOR_RGB2BGR) # COLOR_BGR2GRAY
        line_h = del_last_page(cv_image)
        cv_image = cv_image[:line_h,:,:]
        image_res.append(cv_image)
    
    result = image_res[0].copy()
    for index in range (1, len(image_res)):
        result = cv2.vconcat([result, image_res[index]])
    return (result, image_res[0])

def process_get_full_img(file):
    try:
        pages = convert_pdf_to_img(file)
        result = create_img_full(pages)
        return result
    except Exception as error:
        print(f"error when getting full img: {str(error.args)}")

#endregion



#region
#detect chữ câu
def check_cau(image_cau, img, column):
    list_cau = []

    for i in range(img.shape[0] - image_cau.shape[0]):
        for j in range( column-15, column+10 ):
            image_ = img[i:i+image_cau.shape[0],j:j+image_cau.shape[1],:]
            comparison = image_cau == image_
            equal_image = comparison.all()
            if equal_image:
                list_cau.append((i,j))
    if len(list_cau) >= 4:
        return True
    else:
        return False

def extract_cau_(img_page_1):
    try:
        img = img_page_1.copy()
        h,w, c = img.shape
        # print(img.shape)
        column_white = img[h*3//4:,0,:]
        # print(column_white.shape)
        column = 0
        # column_1 = 0
        # column_2 = 0
        while True:
            comparison = column_white == img[h*3//4:,column,:]
            equal_image = comparison.all()
            if equal_image == False:
                # print(column)
                # img_____ = img[:,column:,:]
                # cv2.imwrite(file+"/xxxxx.png", img_____)
                img_column = img[h*3//4:,column,:]
                line = img_column.shape[0]-1
                while True:
                    comparison1 = img_column[-1,:] == img_column[line,:]
                    equal_image1 = comparison1.all()
                    if equal_image1 == False:
                        # img_____ = img[:h-line,column:,:]
                        # cv2.imwrite(file+"/xxxxx.png", img_____)
                        img_cau = img[h-img_column.shape[0]+line-40:h-img_column.shape[0]+line+30,column-10:column+150,:]
                        if check_cau(img_cau, img, column):
                            # cv2.imwrite(file+"/cau.png", img_cau)
                            # cv2.imshow("window_name", img_cau)
                            # cv2.waitKey(0)
                            return (column, img_cau)
                    line -= 1
                    if line < 50:
                        break
            column += 1
    except Exception as error:
        print(f"error when extracting text 'cau' :{str(error.args)}")

def detect_cau(img_full, img_text_question, column):
    try:
        img = img_full.copy()
        image_cau = img_text_question.copy()
        # print(img.shape)
        # print(image_cau.shape)

        list_cau = []

        for i in range(img.shape[0]-image_cau.shape[0]):
            for j in range(column-15,column+10):
                image_ = img[i:i+image_cau.shape[0],j:j+image_cau.shape[1],:]
                comparison = image_cau == image_
                equal_image = comparison.all()
                if equal_image:
                    list_cau.append((i,j))
        h_cau = []
        # comparison = image_cau == image_cau1
        # equal_image = comparison.all()
        list_img_questions = []
        for i in range(len(list_cau)-1):
                image_detect = img[list_cau[i][0]-10:list_cau[i+1][0]-10,list_cau[i][1]-20:,:]
                h_cau.append(list_cau[i + 1][0] - list_cau[i][0])
                # cv2.imwrite(file + f"/cau{i+1}.png", image_detect)
                # cv2.imshow("window_name", image_detect)
                # cv2.waitKey(0)
                list_img_questions.append(image_detect)
        print(f"detect cau thanh cong!")
        
        # cv2.imshow("image_detect", image_detect)
        # cv2.waitKey(0)
        return (h_cau.index(min(h_cau)) + 1, list_img_questions)
    except Exception as error:
        print("error when detecting question : " + str(error.args))
#endregion

#region
#detect chữ A. B. C. D.
def extract_ABCD(img_question_h_min, img_text_cau):
    try:
        img = img_question_h_min.copy()
        image_cau = img_text_cau.copy()
        img = img[image_cau.shape[0]+30:,:,:]
        h,w,c = img.shape
        column_white = img[:,0,:]
        column = 0
        while True:
            comparison = column_white == img[:,column,:]
            equal_image = comparison.all()
            if equal_image == False:
                img_column = img[:,column,:]
                line = img_column.shape[0]-1
                while True:
                    comparison1 = img_column[-1,:] == img_column[line,:]
                    equal_image1 = comparison1.all()
                    if equal_image1 == False:
                        line -= 10
                        space = []
                        count = 0
                        for c in range(column,img.shape[1]):
                            comparison2 = img_column[-1,:] == img[line,c,:]
                            equal_image2 = comparison2.all()
                            if equal_image2 == True:
                                count += 1
                            else:
                                space.append([count,c])
                                count = 0

                        space_check = []
                        for s in space:
                            if s[0] > 100:
                                space_check.append(s)                  

                        return extract_(space_check, line, column, img)
                    line -= 1
            column += 1
    except Exception as error:
        print(f"error when extract ABCD: {str(error.args)}")
    return

def extract_(space_check, line, column, img):
    answer_A = img[line-50:line+15, column:column+50,:]
    answer_B = img[line-50:line+15, space_check[0][1]:space_check[0][1]+50,:]
    answer_C = img[line-50:line+15, space_check[1][1]:space_check[1][1]+50,:]
    answer_D = img[line-50:line+15, space_check[2][1]:space_check[2][1]+50,:]
    print(f"detect ABCD thanh cong!")
    # cv2.imshow("window_name", answer_A)
    # cv2.waitKey(0)
    # cv2.imshow("window_name", answer_B)
    # cv2.waitKey(0)
    # cv2.imshow("window_name", answer_C)
    # cv2.waitKey(0)
    # cv2.imshow("window_name", answer_D)
    # cv2.waitKey(0)

    return (answer_A,answer_B,answer_C,answer_D)

#endregion


#region
#extract answer
def lan_answer(img, line, column, h_answer, w_answer):
    white = np.full((h_answer,w_answer,3), img[0][0][0])
    i = 1
    while True:
        comparison = white == img[line:line+h_answer,column + i*w_answer:column + (i+1)*w_answer,:]
        equal_image = comparison.all()
        if equal_image == True:
            break
        i+=1
    white = np.full((10,i*w_answer,3), img[0][0][0])
    j = 1
    while True:
        comparison = white == img[line + j * 10: line+ (j+1) * 10,column :column + i*w_answer,:]
        equal_image = comparison.all()
        if equal_image == True:
            break
        j+=1
    
    k = -1

    while True:
        comparison = white == img[line + k * 10: line+ (k+1) * 10,column :column + i*w_answer,:]
        equal_image = comparison.all()
        if equal_image == True:
            break
        k-=1
    return img[line + k *10: line + j*10, column :column + i*w_answer,:]

def extract_answer(list_img_questions, exam_id, _answer_A, _answer_B, _answer_C, _answer_D, db: Session):
    print("start extract answer")
    list_answer_extract = []
    try:
        answer_A = _answer_A.copy()
        answer_B = _answer_B.copy()
        answer_C = _answer_C.copy()
        answer_D = _answer_D.copy()
        for index_question, _img_question in enumerate(list_img_questions):
            img = _img_question.copy()
            h, w, c = img.shape
            content_question = convert_to_base64(resize_img(img, 2))
            db_question = question_service.create_question(exam_id, content_question, index_question+1, db)
            h_answer, w_answer, c_answer = answer_A.shape
            a, b, c, d = True, True, True, True
            for line in range(h-h_answer):
                for column in range(w-w_answer):
                    if a:    
                        comparison_A = answer_A == img[line:line+h_answer,column:column+w_answer,:]
                        equal_image_A = comparison_A.all()
                        try:
                            if equal_image_A == True:
                                img_A = lan_answer(img, line, column, h_answer, w_answer)
                                # cv2.imwrite(file+f"/cau{i}_A.png", img_A)
                                # content_answer = convert_to_base64(resize_img(img_A, 2))
                                # answer_service.create_answer(db_question.question_id, content_answer, 1, db)
                                list_answer_extract.append({
                                    "question_id": db_question.question_id,
                                    "answer_number": 1,
                                    "content": convert_to_base64(resize_img(img_A, 2))
                                })
                                a = False
                        except Exception as error:
                            print(f"error when extract answer A: {str(error.args)}")

                    if b: 
                        comparison_B = answer_B == img[line:line+h_answer,column:column+w_answer,:]
                        equal_image_B = comparison_B.all()
                        try:
                            if equal_image_B == True:
                                img_B = lan_answer(img, line, column, h_answer, w_answer)
                                # cv2.imwrite(file+f"/cau{i}_B.png", img_B)
                                # content_answer = convert_to_base64(resize_img(img_B, 2))
                                # answer_service.create_answer(db_question.question_id, content_answer, 2, db)
                                list_answer_extract.append({
                                    "question_id": db_question.question_id,
                                    "answer_number": 2,
                                    "content": convert_to_base64(resize_img(img_B, 2))
                                })
                                b = False
                        except Exception as error:
                            print(f"error when extract answer B: {str(error.args)}")


                    comparison_C = answer_C == img[line:line+h_answer,column:column+w_answer,:]
                    equal_image_C = comparison_C.all()
                    if equal_image_C == True:
                        try:
                            img_C = lan_answer(img, line, column, h_answer, w_answer)
                            # content_answer = convert_to_base64(resize_img(img_C, 2))
                            # answer_service.create_answer(db_question.question_id, content_answer, 3, db)
                            # cv2.imwrite(file+f"/cau{i}_C.png", img_C)
                            list_answer_extract.append({
                                    "question_id": db_question.question_id,
                                    "answer_number": 3,
                                    "content": convert_to_base64(resize_img(img_C, 2))
                                })
                        except Exception as error:
                            print(f"error when extract answer C: {str(error.args)}")

                    if d:
                        comparison_D = answer_D == img[line:line+h_answer,column:column+w_answer,:]
                        equal_image_D = comparison_D.all()
                        try:
                            if equal_image_D == True:
                                img_D = lan_answer(img, line, column, h_answer, w_answer)
                                # content_answer = convert_to_base64(resize_img(img_D, 2))
                                # answer_service.create_answer(db_question.question_id, content_answer, 4, db)
                                # cv2.imwrite(file+f"/cau{i}_D.png", img_D)
                                list_answer_extract.append({
                                    "question_id": db_question.question_id,
                                    "answer_number": 4,
                                    "content": convert_to_base64(resize_img(img_D, 2))
                                })
                                d = True
                        except Exception as error:
                            print(f"error when extract answer D: {str(error.args)}")
        print(f"detect dap an thanh cong!")
        df = pd.DataFrame(list_answer_extract)

        # Drop duplicates based on the (question_id, answer_number) columns, keep the last occurrence
        df_unique = df.drop_duplicates(subset=["question_id", "answer_number"], keep="last")

        # Convert the DataFrame back to a list of dictionaries
        unique_answer_list = df_unique.to_dict("records")
        answers = [models.Answer(**answer_dict) for answer_dict in unique_answer_list]
        print(f"lưu vào DB thành công!")
        # Bulk insert the answers into the database
        db.bulk_save_objects(answers)
        db.commit()

        return
    except Exception as error:
        print(f"error when extracting answer: {str(error.args)}")
#endregion