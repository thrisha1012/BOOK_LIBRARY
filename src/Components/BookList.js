// src/BookList.js
import React, { useEffect, useState } from "react";
import Card from "./Card"; 

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("https://gutendex.com/books/");
                const data = await response.json();
                setBooks(data.results); 
                setLoading(false); 
            } catch (error) {
                console.error("Error fetching books:", error);
                setLoading(false); // Ensure loading is false even on error
            }
        };

        fetchBooks();
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <div className="book-list">
            {loading ? (
                <p>Loading books...</p> // Loading message
            ) : (
                <Card book={books} /> // Pass the books to the Card component
            )}
        </div>
    );
};

export default BookList;
