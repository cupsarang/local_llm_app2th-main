import uvicorn
from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel, HttpUrl

class UserCreate(BaseModel):
    name: str
    password: str
    avatar_url: Optional[HttpUrl] = None