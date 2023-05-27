from .base_service import BaseService
from schema.request_integration import RequestSearchIntegration, ResponseSearchIntegration
import asyncio
from fastapi import HTTPException
from schema.constant import TypeExam, NameSourceExam, GradeExam

class ToanMathService(BaseService):
    def __init__(self,):
        super(ToanMathService, self).__init__()

    def rewriteQuery(self, req:RequestSearchIntegration)-> str:
        url = None
        if req.type == TypeExam.Demo:
            url = "https://toanmath.com/de-thi-thu-mon-toan"
        elif req.type == TypeExam.MidTerm1:
            url = f"https://toanmath.com/de-thi-giua-hk1-toan-{req.grade}"
        elif req.type == TypeExam.MidTerm2:
            url = f"https://toanmath.com/de-thi-giua-hk2-toan-{req.grade}"
        elif req.type == TypeExam.EndTerm1:
            url = f"https://toanmath.com/de-thi-hk1-toan-{req.grade}"
        elif req.type == TypeExam.EndTerm2:
            url = f"https://toanmath.com/de-thi-hk2-toan-{req.grade}"

        if req.page > 1 and url != None:
            url += "/page/" + str(req.page)
        print("url: ", url)
        return url
    
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
    
    def parser_html(self, soup, req: RequestSearchIntegration):
        results=[]
        try:
            #print(type(soup))
            records = soup.find_all('div', class_='mh-col-1-2 mh-posts-grid-col clearfix')
            for record in records:
                date = record.find("div",class_='mh-meta entry-meta').find("a")
                #print(date)
                date = date.contents[0]
                content = record.find('h3',class_='entry-title mh-posts-grid-title').find("a")
                title = content.get("title")
                link = content.get("href")
                result = ResponseSearchIntegration(title = title, link = link, type=req.type, grade=req.grade, date =date, source=NameSourceExam.TOAN_MATH).dict()
                results.append(result)
            return results
        except Exception as e:
            print(e)
            return results

    async def process(self, req: RequestSearchIntegration):
        results = []
        try:
            url = self.rewriteQuery(req)
            if url == None:
                return results
            soup = await self.asyncDoQuery(url)
            results = self.parser_html(soup, req)
        except Exception as error:
            print(error.args)
        
        return results

    async def full_process(self, req: RequestSearchIntegration):
        list_req = self.gen_query(req)
        results=[]
        for _req in list_req:
            pre_result = await self.process(_req)
            if req.keyword is None or len(req.keyword.strip()) == 0:
                results += pre_result
            else:
                results += self.filterQuery(req.keyword, pre_result)
        return results

