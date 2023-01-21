import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import * as BooksApi from "../BooksAPI";

const Search = ({ updateBookShelf }) => {
  const [bookSearch, setBookSearch] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = (e) => {
    setBookSearch(e.target.value);
  };

  useEffect(() => {
    const bookApiSearch = async () => {
      const dataObtainedFromAPI = await BooksApi.search(bookSearch);
      //if error no change to array
      if (dataObtainedFromAPI.error) {
        setBooks([]);
        //no error: updating search array
      } else {
        setBooks(dataObtainedFromAPI);
      }
    };
    if (bookSearch) {
      bookApiSearch()

    }
    return () => {
      setBooks([]);
    };
  }, [bookSearch]);

  // books.forEach(() => {
  //   allBooks.map((book) => {
  //     if (book.id === book.id) {
  //       book.shelf = book.shelf;
  //     }
  //   });
  // });

  // for(let i=0;i<books.length; i++){
  //   books?.map((b)=> {
  //     if(searchString?.length>0){
  //       if(b.id === searchString[i].id){
  //         searchString[i].shelf=b.shelf
  //       }
  //     }
  //   })
  // }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            value={bookSearch}
            onChange={handleSearch}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.length > 0 &&
            books.map((book) => (
              <Book
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
