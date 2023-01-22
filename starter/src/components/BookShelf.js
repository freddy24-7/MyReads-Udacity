import BookDetails from "./BookDetails";
import {Fragment} from "react";

const BookShelf = ( {title, books, updateBookShelf } ) => {
  return (
  <Fragment>
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <BookDetails
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

export default BookShelf;
