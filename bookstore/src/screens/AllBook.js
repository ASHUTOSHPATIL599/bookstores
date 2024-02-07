import React, { useEffect, useState } from "react";
import "../screens/allbook.css";
export default function AllBook() {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/viewbook", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book data");
        }
        const data = await response.json();
        setBookData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const deleteBook = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/deletebook/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete book");
      }
      // If deletion is successful, update the book data by fetching again
      fetchBookData();
    } catch (error) {
      console.error(error);
    }
  };
  const fetchBookData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/viewbook", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch book data");
      }
      const data = await response.json();
      setBookData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="all-books-container">
      <h1>All Books</h1>
      <table className="book-table">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Book Author</th>
            <th>Book Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookData.map((book, index) => (
            <tr key={index}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>
                <div className="action-buttons">
                  <a href={`updatebook/${book._id}`} className="edit-button">
                    Edit
                  </a>
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
