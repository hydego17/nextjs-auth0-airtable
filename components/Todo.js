import React, { useContext } from "react"
import { TodosContext } from "../context/TodosContext"

export default function Todo({ todo }) {
  const { updateTodo, deleteTodo } = useContext(TodosContext)

  // Handle data change when checkbox is toggled
  const handleToggleCompleted = () => {
    const updatedFields = {
      ...todo.fields,
      completed: !todo.fields.completed,
    }

    const updatedTodo = { id: todo.id, fields: updatedFields }

    updateTodo(updatedTodo)
  }

  return (
    <div>
      <li className="flex bg-white items-center border rounded my-2 py-3 px-4">
        <input
          type="checkbox"
          name="completed"
          id="completed"
          checked={todo.fields.completed}
          className="mr-4 h-4 w-4 cursor-pointer "
          onChange={handleToggleCompleted}
        />

        <p
          className={`flex-1 font-semibold text-gray-800 ${
            //conditionally add linetrough if marked as completed
            todo.fields.completed ? "line-through" : ""
          }`}
        >
          {todo.fields.description}
        </p>

        <button
          type="button"
          className="text-sm bg-gray-200 hover:bg-red-600 hover:text-white text-gray-800 font-bold py-2 px-3 rounded transition duration-200 ease focus:outline-none"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </li>
    </div>
  )
}
