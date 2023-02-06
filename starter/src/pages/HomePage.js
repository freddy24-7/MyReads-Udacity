import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";
import PropTypes from "prop-types";
import {useItemLists} from "../hooks/useItemLists";

//Homepage gets props from App.js
const HomePage = ({ updateBookShelf, books } ) => {
  //Placing books on the right shelf with the filter-method, and using the custom hook useItemLists
  const { currentlyReading, read, wantToRead } = useItemLists(books);

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
            books={currentlyReading}
            updateBookShelf={updateBookShelf}
          />
        </div>
        <div>
          <BookShelf
            title="Want To Read"
            books={wantToRead}
            updateBookShelf={updateBookShelf}
          />
        </div>
        <div>
          <BookShelf
            title="Read"
            books={read}
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

HomePage.propTypes = {
  updateBookShelf: PropTypes.func,
  title: PropTypes.string,
  books: PropTypes.array
}

export default HomePage;
