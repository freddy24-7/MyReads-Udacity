import BookDetails from "./BookDetails";
import {Fragment} from "react";
import PropTypes from 'prop-types'


//Props are from HomePage.js
const BookShelf = ( {title, books, updateBookShelf } ) => {
  return (
  <Fragment>
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <BookDetails
              //map method needs key
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

BookShelf.propTypes = {
  book: PropTypes.object,
  title: PropTypes.string,
  updateBookShelf: PropTypes.func
}


export default BookShelf;
