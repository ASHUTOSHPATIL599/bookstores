import React, { useState } from "react";
import "../screens/register.css";
import { useNavigate } from "react-router-dom";
export default function Books() {
  const [book, setBook] = useState({
    name: "",
    author: "",
    price: "",
  });
  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (!book.name || !book.author || !book.price) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: book.name,
          author: book.author,
          price: book.price,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to register book");
      }
      const json = await response.json();
      console.log(json);

      alert("Registration successful");
      navigate("/books");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmission}>
        <div>
          <label htmlFor="name">Book name:</label>
          <input
            type="text"
            id="book_name"
            className="book_name"
            name="name"
            value={book.name}
            onChange={(e) => setBook({ ...book, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="book_author"
            className="book_author"
            name="author"
            value={book.author}
            onChange={(e) => setBook({ ...book, author: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="book_price"
            className="book_price"
            name="price"
            value={book.price}
            onChange={(e) => setBook({ ...book, price: e.target.value })}
          />
        </div>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}
