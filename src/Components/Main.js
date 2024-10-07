import React, { useEffect,useState } from 'react';
import Card from "./Card";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDebounce } from "./useDebounce";  // Import the debounce hook
import './Style.css';

const Main = () => {
    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);
    const debouncedSearch = useDebounce(search, 300);  // Add debounce for 300ms delay
    const categories = ["Fiction", "Mystery", "Fantasy", "Science", "Biography", "Adventure", "Thriller", "Horror", "History", "Poetry"];

    useEffect(() => {
        if (debouncedSearch) {
            fetchBooks(debouncedSearch);
        }
    }, [debouncedSearch]);

    const fetchBooks = (query) => {
        axios.get(`https://gutendex.com/books/?search=${query}`)
            .then(res => setData(res.data.results))
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className="header">
                <div className="row1">
                    <h1>A room without books is like<br />a body without a soul.</h1>
                </div>
                <div className='row2'>
                    <h2>Find your Book</h2>
                    <div className='search'>
                        <input
                            type="text"
                            id="searchBook"
                            name="searchBook"
                            placeholder="Enter your book name"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button onClick={() => fetchBooks(search)}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <img src="./images/bg2.png" alt="Book illustration" />
                </div>
            </div>
            <div className="recommendations">
                <h3>Categories</h3>
                <div className="categories">
                    {categories.map((category, index) => (
                        <Link to={`/category/${category}`} key={index}>
                            <button className="category-button">
                                {category}
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='card-container'>
                {bookData.length > 0 && <Card book={bookData} />}
            </div>
        </>
    );
};

export default Main;
