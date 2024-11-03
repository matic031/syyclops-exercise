from pydantic import BaseModel, EmailStr, Field


class User(BaseModel):
    id: int = Field(..., gt=0)
    firstName: str
    lastName: str
    age: int = Field(..., gt=0)
    gender: str
    email: EmailStr
    phone: str
