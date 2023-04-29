from fastapi import FastAPI
from controller.account import API_account
from config import db
db.Base.metadata.create_all(bind=db.engine)

app = FastAPI()
app.include_router(API_account)

@app.get("/")
async def root():
    return {"message": "Chào mừng đến với Thi thử Toán trực tuyến"}