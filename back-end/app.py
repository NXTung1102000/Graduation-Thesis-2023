from fastapi import FastAPI
from controller.account import API_account
from controller.sign_in import API_SignIn
from config import db
db.Base.metadata.create_all(bind=db.engine)

app = FastAPI(title="Thi thử Toán trực tuyến")
app.include_router(API_account)
app.include_router(API_SignIn)

@app.get("/")
async def root():
    return {"message": "Chào mừng đến với Thi thử Toán trực tuyến"}