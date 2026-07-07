import pytest
from fastapi.testclient import TestClient

import main
from main import app

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_store():
    main.todos.clear()
    main.next_id = 1
    yield
    main.todos.clear()
    main.next_id = 1


def test_list_todos_starts_empty():
    response = client.get("/todos")
    assert response.status_code == 200
    assert response.json() == []


def test_create_todo():
    response = client.post("/todos", json={"title": "Buy milk"})
    assert response.status_code == 201
    body = response.json()
    assert body["id"] == 1
    assert body["title"] == "Buy milk"
    assert body["completed"] is False


def test_update_todo_toggle_completed():
    created = client.post("/todos", json={"title": "Walk dog"}).json()
    response = client.patch(f"/todos/{created['id']}", json={"completed": True})
    assert response.status_code == 200
    assert response.json()["completed"] is True


def test_delete_todo():
    created = client.post("/todos", json={"title": "Read book"}).json()
    response = client.delete(f"/todos/{created['id']}")
    assert response.status_code == 204

    remaining = client.get("/todos").json()
    assert all(todo["id"] != created["id"] for todo in remaining)


def test_update_nonexistent_todo_returns_404():
    response = client.patch("/todos/999", json={"completed": True})
    assert response.status_code == 404


def test_delete_nonexistent_todo_returns_404():
    response = client.delete("/todos/999")
    assert response.status_code == 404
