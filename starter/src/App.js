import "./App.css";
import {useState, useEffect, Fragment} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Search from "./pages/Search";

import * as booksApi from "./BooksAPI"

function App() {

  const [books, setBooks] = useState([]);

  //This function gets all book instances
  useEffect(() => {
        const getAll = async () => {
            const results = await booksApi.getAll();
            if (results) {
                setBooks(results);
            }
        };
        getAll();
    }, []);

    //This function awaits changes, then updates the books Array
    //"update" from BooksAPI takes parameters book (id) and shelf
    const updateBookShelf = async (id, shelf) => {
        const results = await booksApi.get(id);
        if (results) {
            await booksApi.update(results, shelf);
            const fullyUpdatedShelf = await booksApi.getAll();
            setBooks(fullyUpdatedShelf);
        }
    };

  return (
  <Fragment>
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
  </Fragment>
  );
}

export default App;
