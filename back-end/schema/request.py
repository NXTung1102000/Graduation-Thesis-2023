from typing import Generic, Optional, TypeVar, Dict
from pydantic.generics import GenericModel
from pydantic import BaseModel, Field

T = TypeVar('T')


class Parameter(BaseModel):
    data: Dict[str, str] = None


class RequestSchema(GenericModel):
    parameter: Parameter = Field(...)


class ResponseSchema(GenericModel, Generic[T]):
    code: str
    status: str
    message: str
    result: Optional[T] = None
    
class TokenResponse(BaseModel):
    user: object
    access_token :str
    token_type: str