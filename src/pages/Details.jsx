import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

function Details() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  function handBack(event) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <div className="flex flex-col">
      {loading && <PacmanLoader color="yellow" className="mx-auto" />}
      <button
        className="mt-10 ml-24 bg-purple-700 py-2 px-4 rounded-md text-white"
        onClick={handBack}
      >
        Back
      </button>
      <div className="p-4 flex gap-32 justify-center mt-14">
        <div className="bg-transparent">
          <img
            className="w-96 h-auto rounded-lg"
            src={book.thumbnailUrl}
            alt={book.title}
          />
        </div>
        <div className="w-1/2 p-4  bg-red-600 shadow-lg rounded-lg">
          <h1 className="text-2xl font-sans">
            <span className="font-bold">Name:</span> {book.title}
          </h1>
          <h2 className="text-2xl font-thin">
            <span className="font-bold">Author: </span>
            {book.authors}
          </h2>
          <h4>
            <span className="font-bold">Pages: </span>
            {book.pageCount} pages
          </h4>
          <p>
            <span className="font-bold">Categories: </span>
            {book.categories ? book.categories.join(", ") : "No categories"}
          </p>
          <p>
            <span className="font-bold">Short Description: </span>
            {book.shortDescription || "No description available."}
          </p>
          <br />
          <p>
            <span className="font-bold">Long Description: </span>
            {book.longDescription || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Details;
