import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../screens/register.css";
export default function Update() {
  const { bid } = useParams();
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
      const response = await fetch(
        `http://localhost:5000/api/updatebook/${bid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update book");
      }
      alert("Update successful");
      navigate("/books");
    } catch (error) {
      console.error(error);
      alert("Update failed. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/viewbook/${bid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch book data");
        }
        const data = await response.json();
        // Update the book state with fetched data
        setBook({
          name: data.name,
          author: data.author,
          price: data.price,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [bid]); // Fetch data whenever bid changes

  return (
    <div>
      <h2>Update Book: {bid}</h2>
      <form onSubmit={handleSubmission}>
        <div className="form-group">
          <label htmlFor="name">Book name:</label>
          <input
            type="text"
            id="book_name"
            className="book_name"
            name="name"
            value={book.name} // Bind value to book.name
            onChange={(e) => setBook({ ...book, name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="book_author"
            className="book_author"
            name="author"
            value={book.author} // Bind value to book.author
            onChange={(e) => setBook({ ...book, author: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="book_price"
            className="book_price"
            name="price"
            value={book.price} // Bind value to book.price
            onChange={(e) => setBook({ ...book, price: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Update Book" name="UpdateBook" />
        </div>
      </form>
    </div>
  );
}
