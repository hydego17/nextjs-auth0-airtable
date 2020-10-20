import React, { useState, useContext } from "react"
import { TodosContext } from "../context/TodosContext"

export default function TodoForm() {
  const [todo, setTodo] = useState("")

  const { addTodo } = useContext(TodosContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    addTodo(todo)
    setTodo("")
  }

  return (
    <form className="form my-6" onSubmit={handleSubmit}>
      <div className="flex flex-col text-sm mb-2">
        <label className="font-bold mb-2 text-gray-800" htmlFor="todo">
          Todo
        </label>
        <input
          className=" text-gray-800  text-base border p-2 rounded appearance-none focus:outline-none focus:border-gray-500 transition duration-200 ease"
          type="text"
          name="todo"
          id="todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="ex. Learn about authentication and authorization"
        />
      </div>

      <button
        type="submit"
        className="w-full text-white bg-gray-700 hover:bg-gray-800  font-bold py-3 px-4 rounded
        ransition duration-200 ease focus:outline-none mb-2"
      >
        Submit
      </button>
    </form>
  )
}
