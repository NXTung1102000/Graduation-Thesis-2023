import requests

thi_thu_DH = 'https://www.mathvn.com/feeds/posts/default/-/Đề thi THỬ Đại học?alt=json&start-index=1&max-results=10'
thi_gk = 'https://www.mathvn.com/feeds/posts/default/-/Đề thi giữa kì?alt=json&start-index=1&max-results=10'
thi_ck = 'https://www.mathvn.com/feeds/posts/default/-/Đề thi học kì?alt=json&start-index=1&max-results=10'

r = requests.get(url = thi_thu_DH)

response = r.json()
res_exam = response["feed"]["entry"]

result = []

for exam in res_exam:
    info_ex = {
        "name": exam["title"]['$t'],
        "time": exam["updated"]['$t'],
        "url": exam["link"][len(exam["link"]) - 1]["href"]
    }
    result.append(info_ex)

for exam in result:
    print(exam)