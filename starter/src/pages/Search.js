import React, {Fragment, useCallback} from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookDetails from "../components/BookDetails";
import {search} from "../BooksAPI";
import PropTypes from "prop-types";
import { useDebounce, useThrottle } from "../hooks/useDebounce";
import { useItemLists } from "../hooks/useItemLists";
import BookNotFound from "../components/BookNotFound";

//Props from App.js
const Search = ( {updateBookShelf, books } ) => {

    const [bookSearch, setBookSearch] = useState("");
    const [booksFound, setBooksFound] = useState([]);
    //getting debounce and throttle from custom hooks
    const debouncedSearchTerm = useDebounce(bookSearch, 500);
    const throttledSearchTerm = useThrottle(debouncedSearchTerm, 1000);

    //getting bookshelves from hooks
    const { currentlyReading, read, wantToRead } = useItemLists(books);

    const searchHandler = (event) => {
    setBookSearch(event.target.value);
  };

    useEffect(() => {
        //checking if there is a value in the input field
        if (throttledSearchTerm) {
            console.log(throttledSearchTerm);

            // Make API call here with the throttledSearchTerm value
            const bookApiSearch = async () => {
                const dataObtainedFromAPI = await search(throttledSearchTerm)

                if (dataObtainedFromAPI.length === 0) {
                    return;
                } else if (dataObtainedFromAPI.error) {
                    return;
                } else if (dataObtainedFromAPI.length > 0) {

                    //Updating search array
                    console.log(dataObtainedFromAPI);
                    setBooksFound(dataObtainedFromAPI);
                    console.log(currentlyReading);
                    console.log(read);
                    console.log(wantToRead);
                    //updating the search array with the books from the bookshelves, so that the correct shelf is displayed
                    setBooksFound(prevBooks =>
                        prevBooks.map(book => {
                            //combining all the books from the bookshelves into one array
                            const allUpdatedBooks = [...currentlyReading, ...read, ...wantToRead];
                            //finding the book in the search array that is also in the bookshelves array
                            let updatedBook = allUpdatedBooks.find(b => b.id === book.id);
                            //if the book is found, the book in the search array is updated with the book from the bookshelves array
                            return updatedBook ? updatedBook : book;
                        })
                    );
                };
            };
            bookApiSearch();
        }
        //cleaning up the search array - when input is empty, the search array is emptied
        return () => setBooksFound([]);
    }, [throttledSearchTerm]);

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
                    {/*using ternary operator to check if there are any books in the search array*/}
                    {/*if there are books, they are mapped and displayed*/}
                    {/*if there are no books, the BookNotFound component is displayed*/}
                  {booksFound.length > 0 ?
                    booksFound.map((book) => (
                      <BookDetails
                        //map method requires key
                        key={book.id}
                        book={book}
                        updateBookShelf={updateBookShelf}
                      />
                    )) : <BookNotFound />}
                </ol>
              </div>
            </div>
        </Fragment>
    );
};

Search.propTypes = {
  book: PropTypes.object,
  updateBookShelf: PropTypes.func,
}

export default Search;
