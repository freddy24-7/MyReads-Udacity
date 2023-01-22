import React from "react";

//props "book" and "updateBookshelf" comes from Search-component as well as Bookshelf-component
const BookDetails = ({ book, updateBookShelf }) => {
  // function to handle search and update bookshelf
  const searchHandler = (e) => {
    updateBookShelf(e.target.id, e.target.value);
    book.shelf = e.target.value;
    return e;
  };

  return (
    <>
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
                onChange={searchHandler}
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
    </>
  );
};

export default BookDetails;
