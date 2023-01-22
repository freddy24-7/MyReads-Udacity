import React, {Fragment} from "react";

//props "book" and "updateBookshelf" comes from Search-component as well as Bookshelf-component
const BookDetails = ({ book, updateBookShelf }) => {
  // function to handle search and update bookshelf
  const updateHandler = (event) => {
    //updateBookshelf takes two parameters, bookId and shelf (refer App.js and BooksApi)
    updateBookShelf(event.target.id, event.target.value);
  };

  return (
    <Fragment>
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${(book["imageLinks"] ? book["imageLinks"]["thumbnail"] : undefined)})`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select
                onChange={updateHandler}
                id={book.id}
                value={book.shelf ? book.shelf : "none"}
              >
                <option disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book["authors"]?.length > 0 ? book["authors"] : "unknown"}
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default BookDetails;
