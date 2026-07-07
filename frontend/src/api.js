const BASE_URL = "https://todo-app-backend-ioq4.onrender.com";

export async function getTodos() {
  const res = await fetch(`${BASE_URL}/todos`);
  return res.json();
}

export async function addTodo(title) {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function toggleTodo(id, completed) {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  return res.json();
}

export async function deleteTodo(id) {
  await fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" });
}
