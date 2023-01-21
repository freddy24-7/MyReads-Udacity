import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Search from "./pages/Search";

import * as api from "./BooksAPI"

function App() {
  const [books, setBooks] = useState([]);

    useEffect(() => {
        const getAll = async () => {
            const data = await api.getAll();
            if (data) {
                setBooks(data);
            }
        };
        getAll();
    }, []);

    const updateBookShelf = async (id, shelf) => {
        const data = await api.get(id);
        if (data) {
            const update = await api.update(data, shelf);
            const updatedData = await api.getAll();
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
                    // allBooks={books}
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
