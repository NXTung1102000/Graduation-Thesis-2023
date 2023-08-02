from schema.request_integration import RequestSearchIntegration, ResponseSearchIntegration
from schema.constant import TypeExam, NameSourceExam, GradeExam
import requests
import string
from typing import List

class MathVNService:
    def remove_accents(self, input_str):
        s1 = u'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹ'
        s0 = u'AAAAEEEIIOOOOUUYaaaaeeeiioooouuyAaDdIiUuOoUuAaAaAaAaAaAaAaAaAaAaAaAaEeEeEeEeEeEeEeEeIiIiOoOoOoOoOoOoOoOoOoOoOoOoUuUuUuUuUuUuUuYyYyYyYy'
        s = ''
       # print input_str.encode('utf-8')
        for c in input_str:
            if c in s1:
                s += s0[s1.index(c)]
            else:
                s += c
        return s
    
    def matching(self, query:str, target:str):

        target = target.lower().replace(" ","")
        target=target.translate(str.maketrans('', '', string.punctuation))
        target = self.remove_accents(target)
        query = query.lower()
        query=query.translate(str.maketrans('', '', string.punctuation))
        query = self.remove_accents(query)
        query = query.replace(" ","").split(",")
        query = list(filter(None, query))
        for q in query:
            if q in target:
               # print(True,q,target)
                return True
       # print(False)
        return False
    
    def filterQuery(self, query:str, candidates:List[dict]):
        results = []
        for candidate in candidates:
            if self.matching(query, candidate["title"]):
                results.append(candidate)
        return results
    
    def rewriteQuery(self, req:RequestSearchIntegration)-> str:
        url = None
        if req.type == TypeExam.Demo:
            url = f"https://www.mathvn.com/feeds/posts/default/-/Đề thi THỬ Đại học?alt=json&start-index={req.page}&max-results=20"
        elif req.type == TypeExam.MidTerm1 or req.type == TypeExam.MidTerm2:
            url = f"https://www.mathvn.com/feeds/posts/default/-/Đề thi giữa kì?alt=json&start-index={req.page}&max-results=20"
        elif req.type == TypeExam.EndTerm1 or req.type == TypeExam.EndTerm2:
            url = f"https://www.mathvn.com/feeds/posts/default/-/Đề thi học kì?alt=json&start-index={req.page}&max-results=20"
        print(url)
        return url
    
    def get_data_of_response(self, url: str, req: RequestSearchIntegration):
        results=[]
        try:
            r = requests.get(url = url)
            response = r.json()
            res_exam = response["feed"]["entry"]
            for exam in res_exam:
                title = exam["title"]['$t']
                date = exam["updated"]['$t']
                link = exam["link"][len(exam["link"]) - 1]["href"]
                result = ResponseSearchIntegration(title=title,link=link,type=req.type, grade=req.grade,date=date,source=NameSourceExam.MATH_VN).dict()
                if req.grade == GradeExam.Grade10:
                    if self.matching("10", result["title"]):
                        results.append(result)
                elif req.grade == GradeExam.Grade11:
                    if self.matching("11", result["title"]):
                        results.append(result)
                elif req.grade == GradeExam.Grade12:
                    if self.matching("12", result["title"]):
                        results.append(result)
                else:
                    results.append(result)
            return results
        except Exception as e:
            print(e)
            return results
        
    def gen_query(self, req: RequestSearchIntegration):
        query_list = []

        # no keyword
        if req.keyword is None or len(req.keyword.strip()) == 0:

            # query has both Type and Grade
            if req.type is not None and req.grade is not None:
                query_list.append(req)

            # query has no both Type and Grade
            elif req.type is None and req.grade is None:

                # add query with type Demo
                query_list.append( RequestSearchIntegration(type=TypeExam.Demo, grade=None, keyword=req.keyword, page=req.page) )
                # add query other type whose grade
                for _type in (TypeExam.MidTerm1, TypeExam.MidTerm2, TypeExam.EndTerm1, TypeExam.EndTerm2):
                    for _grade in GradeExam:
                        _new_req = RequestSearchIntegration(type=_type, grade=_grade, keyword=req.keyword, page=req.page)
                        query_list.append(_new_req)
            
            # query has only Type
            elif req.type is not None and req.grade is None:
                if req.type == TypeExam.Demo:
                    query_list.append(RequestSearchIntegration(type=req.type, grade=None, keyword=req.keyword, page=req.page))
                else:
                    for _grade in GradeExam:
                        _new_req = RequestSearchIntegration(type=req.type, grade=_grade, keyword=req.keyword, page=req.page)
                        query_list.append(_new_req)

            # query has only Grade: req.type is None and req.grade is not None:
            else:
                for _type in TypeExam:
                    _new_req = RequestSearchIntegration(type=_type, grade=req.grade, keyword=req.keyword, page=req.page)
                    query_list.append(_new_req)

        else: # query has keyword => add page
            len_keyword = len(req.keyword.strip())
            print(len_keyword)

            # query has both Type and Grade
            if req.type is not None and req.grade is not None:
                for i in range( (req.page -1)*(len_keyword) +1, req.page* len_keyword +1):
                    _new_req = RequestSearchIntegration(type=req.type, grade=req.grade, keyword=req.keyword, page=i)
                    query_list.append(_new_req)

            # query has no both Type and Grade
            elif req.type is None and req.grade is None:
                for i in range( (req.page -1)*(len_keyword//2) +1, req.page* (len_keyword//2) +1):
                    # add query with type Demo
                    query_list.append( RequestSearchIntegration(type=TypeExam.Demo, grade=None, keyword=req.keyword, page=i) )
                    # add query other type whose grade
                    for _type in (TypeExam.MidTerm1, TypeExam.MidTerm2, TypeExam.EndTerm1, TypeExam.EndTerm2):
                        for _grade in GradeExam:
                            _new_req = RequestSearchIntegration(type=_type, grade=_grade, keyword=req.keyword, page=i)
                            query_list.append(_new_req)
            
            # query has only Type
            elif req.type is not None and req.grade is None:
                for i in range( (req.page -1)*(len_keyword) +1, req.page* len_keyword +1):
                    if req.type == TypeExam.Demo:
                        query_list.append(RequestSearchIntegration(type=req.type, grade=None, keyword=req.keyword, page=i))
                    else:
                        for _grade in GradeExam:
                            _new_req = RequestSearchIntegration(type=req.type, grade=_grade, keyword=req.keyword, page=i)
                            query_list.append(_new_req)

            # query has only Grade: req.type is None and req.grade is not None:
            else:
                for i in range( (req.page -1)*(len_keyword) +1, req.page* len_keyword +1):
                    for _type in TypeExam:
                        _new_req = RequestSearchIntegration(type=_type, grade=req.grade, keyword=req.keyword, page=i)
                        query_list.append(_new_req)

        return query_list
    
    def process(self, req: RequestSearchIntegration):
        results = []
        try:
            url = self.rewriteQuery(req)
            if url == None:
                return results
            results = self.get_data_of_response(url, req)
        except Exception as error:
            print(error.args)
        
        return results

    def full_process(self, req: RequestSearchIntegration):
        list_req = self.gen_query(req)
        results=[]
        for _req in list_req:

            pre_result = self.process(_req)
            if req.keyword is None or len(req.keyword.strip()) == 0:
                results += pre_result
            else:
                results += self.filterQuery(req.keyword, pre_result)
        return results