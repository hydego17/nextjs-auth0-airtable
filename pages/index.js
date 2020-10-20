import Head from "next/head"
import Navbar from "../components/Navbar"
import { table, minifyRecords } from "./api/utils/Airtable"

export default function Home({ initialTodos }) {
  return (
    <div>
      <Head>
        <title>Auth Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>
        <h1>Todo App</h1>
      </main>
    </div>
  )
}

// Grab todos and pass as props to Home component
export async function getServerSideProps(context) {
  try {
    const todos = await table.select({}).firstPage()
    return {
      props: {
        initialTodos: minifyRecords(todos),
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
