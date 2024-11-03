from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

sample_user_data = {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "age": 30,
    "gender": "male",
    "email": "john@doe.com",
    "phone": "+1234567890",
}


def test_list_users_default_limit():
    response = client.get("/users")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) <= 20


def test_list_users_custom_limit():
    response = client.get("/users?limit=5")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 5


def test_update_user_success():
    update_data = {
        "id": 1,
        "firstName": "UpdatedFirstName",
        "lastName": "UpdatedLastName",
        "age": 31,
        "gender": "male",
        "email": "updated@example.com",
        "phone": "+9876543210",
    }
    response = client.put("/users/1", json=update_data)
    assert response.status_code == 200
    updated_user = response.json()
    assert updated_user["firstName"] == "UpdatedFirstName"
    assert updated_user["email"] == "updated@example.com"


def test_update_user_not_found():
    update_data = {
        "id": 99,
        "firstName": "NonExistent",
        "lastName": "User",
        "age": 30,
        "gender": "male",
        "email": "nonexistent@example.com",
        "phone": "+1234567890",
    }
    response = client.put("/users/99", json=update_data)
    assert response.status_code == 404
    assert response.json() == {"detail": "User not found"}


def test_invalid_email_update():
    invalid_data = sample_user_data.copy()
    invalid_data["email"] = "invalid-email"
    response = client.put("/users/1", json=invalid_data)
    assert response.status_code == 422


def test_negative_age():
    invalid_data = sample_user_data.copy()
    invalid_data["age"] = -1
    response = client.put("/users/1", json=invalid_data)
    assert response.status_code == 422


def test_non_integer_id():
    invalid_data = sample_user_data.copy()
    invalid_data["id"] = "abc"
    response = client.put("/users/1", json=invalid_data)
    assert response.status_code == 422


def test_search_user_by_id_partial_match():
    response = client.get("/users/search?query=1")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert any(user["id"] == 1 for user in data)
    assert any(user["id"] == 11 for user in data)


def test_search_user_by_full_name():
    response = client.get("/users/search?query=Liam%20Johnson")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == 1
