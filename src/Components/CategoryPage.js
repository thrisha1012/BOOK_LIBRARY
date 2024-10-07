import React, { useState, useEffect } from "react";
import BookModal from "./BookModal";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";  

const CategoryPage = () => {
    const { category } = useParams();
    const [bookData, setBookData] = useState([]);
    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState(null);
    const [loading, setLoading] = useState(false);  

    useEffect(() => {
        fetchBooksByCategory(category);  // Fetch books when the category changes
    }, [category]);

    const fetchBooksByCategory = async (category) => {
        setLoading(true);  
        try {
            // Use the category name as part of the search query
            const res = await axios.get(`https://gutendex.com/books?search=${category}`);
            setBookData(res.data.results || []);
        } catch (err) {
            console.error("Error fetching books:", err);
        } finally {
            setLoading(false);  
        }
    };

    return (
        <>
            <h2>Books in {category} Category</h2>
            <div className="card-container">
                {loading ? (
                    <Spinner />  
                ) : bookData.length > 0 ? (
                    bookData.map((item) => {
                        const thumbnail = item.formats ? item.formats["image/jpeg"] : null;
                        if (thumbnail) {
                            return (
                                <React.Fragment key={item.id}>
                                    <div
                                        className="card"
                                        onClick={() => {
                                            setShow(true);
                                            setItem(item);
                                        }}
                                    >
                                        <img src={thumbnail} alt="Book Thumbnail" />
                                        <div className="bottom">
                                            <h3 className="title">{item.title}</h3>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        }
                        return null;
                    })
                ) : (
                    <p>No books found for this category.</p>
                )}
            </div>

            {bookItem && (
                <BookModal
                    isOpen={show}
                    book={bookItem}
                    onClose={() => setShow(false)}
                />
            )}
        </>
    );
};

export default CategoryPage;
