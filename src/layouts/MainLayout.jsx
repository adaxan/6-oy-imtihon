import { Link, useNavigate } from "react-router-dom";

function MainLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = function(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className=" base-container flex flex-col mx-auto">
      <header className="container bg-gray-800 text-white p-10 flex justify-between items-center">
        <h1 className="text-2xl font-bold"><Link to="/">My Books</Link></h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-green-400 font-bold">
                Home
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="hover:text-red-400 font-bold">
                Log out
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}

export default MainLayout;
