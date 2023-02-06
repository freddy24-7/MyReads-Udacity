import "./App.css";
import {useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Search from "./pages/Search";

import * as booksApi from "./BooksAPI"

function App() {

    const [books, setBooks] = useState([]);

    //This function gets all book instances
    //by adding "books" to the dependency array, function is fired whenever the books array changes
    useEffect(() => {
        const getAll = async () => {
            const results = await booksApi.getAll();
            if (results) {
                setBooks(results);
            }
        };
        getAll();
    }, [books]);

    //This function awaits changes, then updates the books Array
    //"update" from BooksAPI takes parameters book (id) and shelf
    const updateBookShelf = async (id, shelf) => {
        const results = await booksApi.get(id);
        if (results) {
            await booksApi.update(results, shelf);
        }
        //checking in console.log that we got the book we were looking for
        console.log(results)
        //updating the shelf with the filter method
        setBooks([...books.filter((b) => b.id !== id), id]);
    };

    //The below code block is an alternative to the above code block
    //However, performance is better with the above code block
    //The reason is that the below code block makes an API call to get all books, after each update
    // const updateBookShelf = async (id, shelf) => {
    //     const results = await booksApi.get(id);
    //     if (results) {
    //         await booksApi.update(results, shelf);
    //         const fullyUpdatedShelf = await booksApi.getAll();
    //         setBooks(fullyUpdatedShelf);
    //     }
    // };

return (
            <div className="app">
                <Routes>
                    <Route exact path="/" element={<HomePage books={books} updateBookShelf={updateBookShelf}/>}/>
                    <Route path="/search" element={<Search books={books} updateBookShelf={updateBookShelf}/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </div>
    );
}

export default App;