import requests
import os
import pandas as pd
url_student = 'http://localhost:9000/register_student'
url_teacher = 'http://localhost:9000/register_teacher'
url_admin = "http://localhost:9000/register_admin"

requests.post(url_admin, json = {"name": "Admin 001", "email": "admin_001@gmail.com", "password": "ABcd1234"})
requests.post(url_admin, json = {"name": "Admin 002", "email": "admin_002@gmail.com", "password": "ABcd1234"})
requests.post(url_admin, json = {"name": "Admin 003", "email": "admin_003@gmail.com", "password": "ABcd1234"})

requests.post(url_student, json = {"name": "Student 001", "email": "student_001@gmail.com", "password": "ABcd1234"})
requests.post(url_student, json = {"name": "Student 002", "email": "student_002@gmail.com", "password": "ABcd1234"})
requests.post(url_student, json = {"name": "Student 003", "email": "student_003@gmail.com", "password": "ABcd1234"})

requests.post(url_teacher, json = {"name": "Teacher 001", "email": "teacher_001@gmail.com", "password": "ABcd1234"})
requests.post(url_teacher, json = {"name": "Teacher 002", "email": "teacher_002@gmail.com", "password": "ABcd1234"})
requests.post(url_teacher, json = {"name": "Teacher 003", "email": "teacher_003@gmail.com", "password": "ABcd1234"})

# x = requests.post(url_student, json = myobj)
data_student = pd.read_csv(os.path.join(os.path.dirname(__file__), "./student.csv"))
# print(data_student.head())
for index, row in data_student.iterrows():
    name, email = row["name"], row["email"]
    requests.post(url_student, json = {"name": name, "email": email, "password": "ABcd1234"})

data_teacher = pd.read_csv(os.path.join(os.path.dirname(__file__), "./teacher.csv"))
# print(data_student.head())
for index, row in data_teacher.iterrows():
    name, email = row["name"], row["email"]
    requests.post(url_teacher, json = {"name": name, "email": email, "password": "ABcd1234"})
