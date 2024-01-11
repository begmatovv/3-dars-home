import { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { MdEdit } from "react-icons/md";

function getNextId(arr) {
  return arr.length > 0 ? arr[arr.length - 1].id + 1 : 1;
}
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  function handleRemove(id) {
    const copyTodos = todos.filter((todo) => todo.id !== id);
    setTodos(copyTodos);
  }
  function handleEdit(e) {
    const copyTodos = todos.map((todo) => todo.text !== e);
    console.log(e.text);
    setInput(copyTodos.text);
  }

  function handleComplete(id) {
    const copyTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      } else return todo;
    });
    setTodos(copyTodos);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const copyTodos = [...todos];
    const id = getNextId(todos);
    copyTodos.push({ id: id, text: input, completed: false });
    setTodos(copyTodos);
    setInput("");
  }

  return (
    <div>
      <h1>Todo App</h1>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            name=""
            value={input}
            id=""
          />
          <button>Add</button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li
              onClick={() => handleComplete(todo.id)}
              className={todo.completed ? "completed" : ""}
            >
              {todo.text}
              <div className="btn-wrapper">
                <MdDeleteSweep
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(todo.id);
                  }}
                ></MdDeleteSweep>
                <MdEdit
                  className="edit-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(todo.text);
                  }}
                ></MdEdit>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>Total number of Todos:{todos.length}</div>
      <div>In Process:{todos.filter((todo) => !todo.completed).length}</div>
      <div>Completed:{todos.filter((todo) => todo.completed).length}</div>
    </div>
  );
}
export default App;
