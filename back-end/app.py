from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from config.db import get_db
from fastapi.middleware.cors import CORSMiddleware
from controller.user import API_user
from controller.sign_in import API_SignIn
from controller.exam import API_exam
from controller.classes.student_class import API_Class_Student
from controller.classes.teacher_class import API_Class_Teacher
from controller.search_integration import API_integration
from config import db, websocket
from controller.notification import API_notification

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

manager = websocket.ConnectionManager()

app.include_router(API_SignIn)
app.include_router(API_integration)
app.include_router(API_Class_Student)
app.include_router(API_Class_Teacher)
app.include_router(API_exam)
app.include_router(API_user)
app.include_router(API_notification)

@app.get("/")
async def root():
    return {"message": "Chào mừng đến với Thi thử Toán trực tuyến"}