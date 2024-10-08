import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { FaFilter } from "react-icons/fa";
import library from "../images/library.jpg";

function Home() {
  const [books, setBooks] = useState([]);
  const [minPages, setMinPages] = useState(500);
  const [maxPages, setMaxPages] = useState(800);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchBooks = () => {
    setLoading(true);
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/books/filter?minPages=${minPages}&maxPages=${maxPages}`
      )
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  function handleSearch(ser) {
    axios
      .get(`${import.meta.env.VITE_API_URL}/books/search?query=${ser}`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const booksFilter = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleBook(id) {
    navigate(`/books/${id}`);
  }

  return (
    <div className="container"
      style={{
        backgroundImage: `url(${library})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-white mb-4">Book Filter</h2>
        <div className="flex gap-20 mb-6">
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                handleSearch(event.target.value);
              }}
              className="border border-purple-600 rounded-lg p-2 w-72 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="flex items-center mb-4">
            <label htmlFor="minPages" className="mr-2 text-white">Min page:</label>
            <input
              type="number"
              id="minPages"
              value={minPages}
              onChange={(event) => setMinPages(event.target.value)}
              className="border border-black rounded p-1 w-24 bg-transparent outline-none text-white"
            />
          </div>

          <div className="flex items-center mb-4">
            <label htmlFor="maxPages" className="mr-2 text-white">Max page:</label>
            <input
              type="number"
              id="maxPages"
              value={maxPages}
              onChange={(event) => setMaxPages(event.target.value)}
              className="border border-black rounded p-1 w-24 bg-transparent outline-none text-white"
            />
          </div>

          <div onSubmit={fetchBooks} className="flex items-center bg-purple-600 text-white rounded-md px-7 cursor-pointer0">
            <FaFilter />
            <button
              
              className="bg-purple-600 text-white rounded-md"
            >
              Filter
            </button>
          </div>
        </div>

        {loading && <PacmanLoader color="yellow" className="mt-12 mb-10" />}
        <div className="flex flex-wrap justify-center mt-24">
          {booksFilter.length > 0 &&
            booksFilter.map((book) => (
              <div
                key={book.id}
                onClick={() => handleBook(book.id)}
                className="border w-1/5 p-1 m-2 rounded-lg bg-gray-100 cursor-pointer text-white"
              >
                <img
                  className="w-full rounded-lg mb-2"
                  src={book.thumbnailUrl}
                  alt="Rasm mavjud emas"
                />
                <h2 className="text-lg mb-2 text-black font-normal">
                  <span className="font-bold">Name:</span> {book.title}
                </h2>
                <h4 className="text-sm mb-2 text-black">
                  <span className="font-bold">Pages:</span> {book.pageCount} pages
                </h4>
                <p className="text-sm mb-2 text-black">
                  <span className="font-bold">Categories:</span>{" "}
                  {book.categories ? book.categories.join(" , ") : "No categories"}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
