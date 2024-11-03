from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from users import get_users
from schemas import User, UserUpdate
from dotenv import load_dotenv
import os

load_dotenv()

origin = [os.getenv("APP_ORIGIN_URL", "http://localhost:3000")]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

users_db = [User(**user) for user in get_users()]


@app.get("/users/search", response_model=List[User])
def search_users(
    query: str = Query(..., description="Search by ID, first name, or last name")
):
    search_results = []
    query_str = query.lower()

    for user in users_db:
        if query_str in str(user.id):
            search_results.append(user)
            continue

        full_name = f"{user.firstName} {user.lastName}".lower()
        if (
            query_str in user.firstName.lower()
            or query_str in user.lastName.lower()
            or query_str in full_name
        ):
            search_results.append(user)

    if not search_results:
        raise HTTPException(
            status_code=404, detail="No users match the search criteria"
        )

    return search_results


@app.get("/users/{user_id}", response_model=User)
def get_user_by_id(user_id: int):
    user = next((u for u in users_db if u.id == user_id), None)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.put("/users/{user_id}", response_model=User)
def update_user(user_id: int, user_update: User):
    user = next((u for u in users_db if u.id == user_id), None)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    updated_data = user_update.model_dump(exclude_unset=True)
    for key, value in updated_data.items():
        setattr(user, key, value)

    return user


@app.get("/users", response_model=List[User])
def list_users(limit: int = 20):
    return users_db[:limit]
