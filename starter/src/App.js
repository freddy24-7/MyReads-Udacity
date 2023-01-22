import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Search from "./pages/Search";

import * as booksApi from "./BooksAPI"

function App() {
  const [books, setBooks] = useState([]);

  //This function gets all book instances
  useEffect(() => {
        const getAll = async () => {
            const data = await booksApi.getAll();
            if (data) {
                setBooks(data);
            }
        };
        getAll();
    }, []);


    //This function awaits changes, then updates the books Array
    //"Update" from BooksAPI takes parameters book (id) and shelf
    const updateBookShelf = async (id, shelf) => {
        const data = await booksApi.get(id);
        if (data) {
            await booksApi.update(data, shelf);
            const updatedData = await booksApi.getAll();
            setBooks(updatedData);
        }
    };

  return (
      <div className="app">
        <Routes>
          <Route path="/" element={
            <HomePage
                books={books}
                updateBookShelf={updateBookShelf}
            />
          }
          />
          <Route
              path="/search" element={
                <Search
                    books={books}
                    updateBookShelf={updateBookShelf}
                />}
          />
          <Route path="*" element={
            <Navigate to="/"
            />}
          />
        </Routes>
      </div>
  );
}

export default App;
