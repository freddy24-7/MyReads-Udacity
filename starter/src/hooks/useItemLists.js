import { useState, useEffect } from 'react';

function useItemLists(books) {
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [read, setRead] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);

    useEffect(() => {
        setCurrentlyReading(books.filter(book => book.shelf === "currentlyReading"));
        setRead(books.filter(book => book.shelf === "read"));
        setWantToRead(books.filter(book => book.shelf === "wantToRead"));
    }, [books]);

    return { currentlyReading, read, wantToRead };
}

export { useItemLists };