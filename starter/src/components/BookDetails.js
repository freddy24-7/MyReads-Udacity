import React, { Fragment } from "react";
import PropTypes from 'prop-types'

//props "book" and "updateBookshelf" comes from Search-component as well as Bookshelf-component
const BookDetails = ({ book, updateBookShelf }) => {

    // function to handle search and update bookshelf
    const updateHandler = (event) => {
    updateBookShelf(event.target.id, event.target.value);
  };

  //Defining an array of objects to be used in the select-option
    const shelves = [
    {id: "1", shelfName: "currentlyReading", shelfDisplayName: "Currently Reading"},
    {id: "2", shelfName: "wantToRead", shelfDisplayName: "Want to Read"},
    {id: "3", shelfName: "read", shelfDisplayName: "Read"},
    {id: "4", shelfName: "none", shelfDisplayName: "None"},
  ];

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
                      {/*mapping through the shelves-array to display options*/}
                        {shelves.map((shelf) => (
                            <option key={shelf.id} value={shelf.shelfName}>
                                {shelf.shelfDisplayName}
                            </option>
                        ))}
                  </select>
              </div>
          </div>
          <div className="book-title">
            {book["title"]?.length > 0 ? book["title"] : "unknown"}
          </div>
          <div className="book-authors">
            {book["authors"]?.length > 0 ? book["authors"] : "unknown"}
          </div>
        </div>
      </li>
    </Fragment>
  );
};

BookDetails.propTypes = {
  book: PropTypes.object,
  updateBookShelf: PropTypes.func
}

export default BookDetails;
