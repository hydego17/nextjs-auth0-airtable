export default function Navbar({ user }) {
  return (
    <nav className="flex justify-between items-center py-8">
      <p className=" text-3xl font-bold text-grey-800">My Todos</p>
      <div className="flex items-center">
        {user && (
          <div className="flex items-center">
            <p className="mr-4 font-medium">welcome, {user.nickname}</p>
            <a
              href="/api/logout"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-200 ease"
            >
              logout
            </a>
          </div>
        )}

        {!user && (
          <a
            href="/api/login"
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded transition duration-200 ease"
          >
            login
          </a>
        )}
      </div>
    </nav>
  )
}
