from pydantic import BaseModel

class UserBase(BaseModel):
    email: str

class UserLogin(UserBase):
    password: str

class UserCreate(UserLogin):
    name: str

class UserInfo(UserBase):
    user_id: int
    name: str
    role: int
    is_blocked: bool

    class Config():
        orm_mode = True

class UserClassStatus(UserBase):
    user_id: int
    name: str
    status: int

    class Config():
        orm_mode = True