import requests
import os
import pandas as pd
url_student = 'http://localhost:9000/register_student'
url_teacher = 'http://localhost:9000/register_teacher'
url_admin = "http://localhost:9000/register_admin"

# x = requests.post(url_student, json = myobj)
data_student = pd.read_csv(os.path.join(os.path.dirname(__file__), "./student.csv"))
# print(data_student.head())
for index, row in data_student.iterrows():
    name, email = row["name"], row["email"]
    print(name, email, "\n")
    requests.post(url_student, json = {"name": name, "email": email, "password": "Abcd1234"})

data_student = pd.read_csv(os.path.join(os.path.dirname(__file__), "./teacher.csv"))
# print(data_student.head())
for index, row in data_student.iterrows():
    name, email = row["name"], row["email"]
    print(name, email, "\n")
    requests.post(url_teacher, json = {"name": name, "email": email, "password": "Abcd1234"})
