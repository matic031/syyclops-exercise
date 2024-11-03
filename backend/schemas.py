from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class User(BaseModel):
    id: int = Field(..., gt=0)
    firstName: str
    lastName: str
    age: int = Field(..., gt=0)
    gender: str
    email: EmailStr
    phone: str


class UserUpdate(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
