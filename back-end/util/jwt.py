from datetime import datetime, timedelta
from jose import JWTError, jwt
from config.variable import config_jwt
from typing import TypeVar, Generic, Optional
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Request, HTTPException

def generate_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=config_jwt["ACCESS_TOKEN_EXPIRE_MINUTES"])
    to_encode.update({"exp": expire})
    encode_jwt = jwt.encode(to_encode, config_jwt["SECRET_KEY"], algorithm=config_jwt["ALGORITHM"])
    
    return encode_jwt

def decode_token(token: str):
    try:
        decode_token = jwt.decode(token, config_jwt["SECRET_KEY"], algorithms=[config_jwt["ALGORITHM"]])
        if decode_token["exp"] >= int(datetime.utcnow().timestamp()):
            return decode_token 
    except Exception as error:
        print(error)
    return {}
    
class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)

        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Sai định dạng Token.")
            if self.verify_jwt(credentials.credentials):
                raise HTTPException(
                    status_code=403, detail="Sai token hoặc hết hạn token.")
            return credentials.credentials
        else:
            raise HTTPException(
                status=403, detail="Lỗi Token")
        
    
    def verify_jwt(Self, jwt_token: str):
        try:
            payload = decode_token(jwt_token)
            return False
        except Exception as error:
            print(error)
        return True

class JWTBearerForTeacher(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearerForTeacher, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearerForTeacher, self).__call__(request)

        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Sai định dạng Token.")
            if self.verify_jwt(credentials.credentials):
                raise HTTPException(
                    status_code=403, detail="Sai token hoặc hết hạn token hoặc bạn không phải giáo viên.")
            return credentials.credentials
        else:
            raise HTTPException(
                status=403, detail="Lỗi Token")
        
    
    def verify_jwt(Self, jwt_token: str):
        try:
            payload = decode_token(jwt_token)
            role = payload["role"]
            if(int(role) == 2): return False

        except Exception as error:
            print(error)
        return True

class JWTBearerForAdmin(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearerForAdmin, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearerForAdmin, self).__call__(request)

        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Sai định dạng Token.")
            if self.verify_jwt(credentials.credentials):
                raise HTTPException(
                    status_code=403, detail="Sai token hoặc hết hạn token hoặc bạn không phải admin")
            return credentials.credentials
        else:
            raise HTTPException(
                status=403, detail="Lỗi Token")
        
    
    def verify_jwt(Self, jwt_token: str):
        try:
            payload = decode_token(jwt_token)
            role = payload["role"]
            if(int(role) == 0): return False
        except Exception as error:
            print(error)
        return True
    
class JWTBearerForTeacherAndAdmin(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearerForTeacherAndAdmin, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearerForTeacherAndAdmin, self).__call__(request)

        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Sai định dạng Token.")
            if self.verify_jwt(credentials.credentials):
                raise HTTPException(
                    status_code=403, detail="Sai token hoặc hết hạn token hoặc bạn không phải admin")
            return credentials.credentials
        else:
            raise HTTPException(
                status=403, detail="Lỗi Token")
        
    
    def verify_jwt(Self, jwt_token: str):
        try:
            payload = decode_token(jwt_token)
            role = payload["role"]
            if(int(role) == 0 or int(role == 2)): return False
        except Exception as error:
            print(error)
        return True