import { createContext, useState } from "react"

const TodosContext = createContext()

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([])

  const refreshTodos = async () => {
    try {
      const res = await fetch("/api/getTodos")
      const latestTodos = await res.json()
      setTodos(latestTodos)
    } catch (err) {
      console.error(err)
    }
  }

  const addTodo = async (description) => {
    try {
      const res = await fetch("/api/createTodo", {
        method: "POST",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const newTodo = await res.json()

      //add newtodo to array of todos
      setTodos((prevTodos) => {
        return [newTodo, ...prevTodos]
      })
    } catch (err) {
      console.error(err)
    }
  }

  const updateTodo = async (updatedTodo) => {
    try {
      await fetch("/api/updateTodo", {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: {
          "Content-Type": "application/json",
        },
      })

      //add edited todo  (based on id)
      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos]
        const existingTodo = existingTodos.find(
          (todo) => todo.id === updatedTodo.id
        )
        existingTodo.fields = updatedTodo.fields

        return existingTodos
      })
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await fetch("/api/deleteTodo", {
        method: "Delete",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      //filter the todos after delete process
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id)
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export { TodosContext, TodosProvider }
