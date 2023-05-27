from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controller.user import API_user
from controller.sign_in import API_SignIn
from controller.exam import API_exam
from controller.classes.student_class import API_Class_Student
from controller.classes.teacher_class import API_Class_Teacher
from controller.search_integration import API_integration
from config import db
db.Base.metadata.create_all(bind=db.engine)

app = FastAPI(title="Thi thử Toán trực tuyến")

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(API_SignIn)
app.include_router(API_integration)
app.include_router(API_Class_Student)
app.include_router(API_Class_Teacher)
app.include_router(API_exam)
app.include_router(API_user)

@app.get("/")
async def root():
    return {"message": "Chào mừng đến với Thi thử Toán trực tuyến"}