import { TodosContext } from "../context/TodosContext"
import { useEffect, useContext } from "react"
import { table, minifyRecords } from "./api/utils/Airtable"
import Head from "next/head"
import Navbar from "../components/Navbar"
import Todo from "../components/Todo"
import auth0 from "./api/utils/auth0"
import TodoForm from "../components/TodoForm"

export default function Home({ initialTodos, user }) {
  const { todos, setTodos } = useContext(TodosContext)

  useEffect(() => {
    setTodos(initialTodos)
  }, [])

  return (
    <div>
      <Head>
        <title>Auth Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar user={user} />
      <main>
        {user && (
          <>
            <h1 className="font-medium text-2xl text-center mb-4">My Todos</h1>
            <TodoForm />
            <ul>
              {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
            </ul>
          </>
        )}
        {!user && (
          <p className=" rounded py-4 px-4 bg-gray-200 my-4 text-lg text-gray-600 font-medium">
            Please login to save your TODOs :)
          </p>
        )}
      </main>
    </div>
  )
}

// Grab todos and pass as props to Home component
export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req)

  let todos = []

  try {
    if (session?.user) {
      todos = await table
        .select({
          filterByFormula: `userId = '${session.user.sub}'`,
        })
        .firstPage()
    }

    return {
      props: {
        initialTodos: minifyRecords(todos),
        user: session?.user || null,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        err: "Something went wrong",
      },
    }
  }
}
