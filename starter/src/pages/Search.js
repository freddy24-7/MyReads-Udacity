import React, {Fragment} from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookDetails from "../components/BookDetails";
import {search} from "../BooksAPI";

//Props from App.js
const Search = ({ updateBookShelf }) => {
  const [bookSearch, setBookSearch] = useState("");
  const [booksFound, setBooksFound] = useState([]);

  const searchHandler = (event) => {
    setBookSearch(event.target.value);
  };

  //This function is triggered whenever someone searches for a book (given the dependency array)
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
  <Fragment>
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
              <BookDetails
                //map method requires key
                key={book.id}
                book={book}
                updateBookShelf={updateBookShelf}
              />
            ))}
        </ol>
      </div>
    </div>
  </Fragment>
  );
};

export default Search;
