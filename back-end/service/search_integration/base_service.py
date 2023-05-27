from email import header
import requests
from bs4 import BeautifulSoup
from schema.request_integration import RequestSearchIntegration
import http3, string, random
from typing import Dict, List, Optional
import asyncio

class BaseService:
    def __init__(self):
        pass
    
    def doQuery(self, url:str):
        try:
            htmlText=requests.get(url).text
            soup = BeautifulSoup(htmlText, 'html.parser')
        except:
            return None
        return soup

    async def asyncDoQuery(self, url, sleep_range: float = 0 ):
        client = http3.AsyncClient()
        if True:
        #try:
            if sleep_range > 0:
                await asyncio.sleep(random.random())
            htmlText= await client.get(url, verify=False,headers={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"})
            soup = BeautifulSoup(htmlText.text, 'html.parser')
       # except:
            #return None
        # htmlText = requests.get(url, verify=False).text
        # soup = BeautifulSoup(htmlText, 'html.parser')
        return soup

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
    
    async def process(self, req:RequestSearchIntegration):
        raise NotImplementedError
    
    def rewriteQuery(self, req:RequestSearchIntegration)-> str:
        # take request body and rewrite query statement with coresponding web pages
        # return the url of the right webpage
        raise NotImplementedError 
        