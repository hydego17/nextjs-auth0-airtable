export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4">
      <p className="text-2xl font-bold text-grey-800">My Todos</p>
      <div className="flex">
        <a
          href="/api/login"
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          login
        </a>
        <a
          href="/api/logout"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          logout
        </a>
      </div>
    </nav>
  )
}
