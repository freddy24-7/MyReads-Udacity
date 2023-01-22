import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";

//Homepage gets props from App.js
const HomePage = ({ updateBookShelf, books } ) => {
  //Placing books on the right shelf with the filter-method
  const currentlyReadingBooks = books.filter((book) => book.shelf === "currentlyReading");
  const readBooks = books.filter((book) => book.shelf === "read");
  const wantToReadBooks = books.filter((book) => book.shelf === "wantToRead");

  return (
  <Fragment>
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {/*Three different bookshelves:*/}
        <div>
          <BookShelf
            title="Currently Reading"
            books={currentlyReadingBooks}
            updateBookShelf={updateBookShelf}
          />
        </div>
        <div>
          <BookShelf
            title="Want To Read"
            books={wantToReadBooks}
            updateBookShelf={updateBookShelf}
          />
        </div>
        <div>
          <BookShelf
            title="Read"
            books={readBooks}
            updateBookShelf={updateBookShelf}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  </Fragment>
  );
};

export default HomePage;
