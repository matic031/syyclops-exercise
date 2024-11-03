from typing import List, Union
from fastapi import FastAPI, HTTPException, Query
from users import get_users
from schemas import User

app = FastAPI()

users_db = [User(**user) for user in get_users()]


@app.get("/users", response_model=List[User])
def list_users(limit: int = 20):
    return users_db[:limit]


@app.put("/users/{user_id}", response_model=User)
def update_user_endpoint(user_id: int, user: User):
    for index, existing_user in enumerate(users_db):
        if existing_user.id == user_id:
            updated_data = user.model_dump(exclude_unset=True)
            for key, value in updated_data.items():
                setattr(existing_user, key, value)
            users_db[index] = existing_user
            return existing_user
    raise HTTPException(status_code=404, detail="User not found")


@app.get("/users/search", response_model=List[User])
def search_users(
    query: Union[str, int] = Query(
        ..., description="Search by ID, first name, or last name"
    )
):
    search_results = []
    query_str = str(query).lower()

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
