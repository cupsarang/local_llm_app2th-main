from fastapi import FastAPI
import uvicorn
from dto import UserCreate

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}

@app.post("/user_info")
def create_user(user: UserCreate):
    print(create_user)
    return user

# port 등 설정할 때, 아래 추가

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8080,
        reload=True,
    )

# port 등 설정할때
# 단, main:app => __name__ 부분과 동일해야 하고, app=FastAPI() 의 이름과 동일해야 한다.