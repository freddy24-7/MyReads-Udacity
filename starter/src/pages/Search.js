import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import {search} from "../BooksAPI";

const Search = ({ updateBookShelf }) => {
  const [bookSearch, setBookSearch] = useState("");
  const [booksFound, setBooksFound] = useState([]);

  const searchHandler = (e) => {
    setBookSearch(e.target.value);
  };

  //This function is triggered whenever someone searches for a book
  //An array is created with the books that fits the search
  useEffect(() => {
    const bookApiSearch = async () => {
      const dataObtainedFromAPI = await search(bookSearch);
      //Updating search array
        setBooksFound(dataObtainedFromAPI);
    };
    if (!bookSearch) {
      return;
    }
    bookApiSearch();
  }, [bookSearch]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            value={bookSearch}
            onChange={searchHandler}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {booksFound.length > 0 &&
            booksFound.map((book) => (
              <Book
                //map method requires key
                key={book.id}
                book={book}
                updateBookShelf={updateBookShelf}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
