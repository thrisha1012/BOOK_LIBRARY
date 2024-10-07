import React from "react";
import "./BookModal.css"; // Ensure you have appropriate styles

const BookModal = ({ isOpen, onClose, book }) => {
    if (!isOpen) return null;

    let thumbnail = book.formats["image/jpeg"];
    let title = book.title;
    let authors = book.authors.map(author => author.name).join(", ");
    let subjects = book.subjects?.join(", ") || "N/A";
    let languages = book.languages?.join(", ") || "Unknown";
    let description = book.description || "No description available.";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
                <div className="modal-inner">
                    {thumbnail && (
                        <img src={thumbnail} alt={title} className="book-thumbnail" />
                    )}
                    <div className="book-details">
                        <h2>{title}</h2>
                        <p className="authors">Author: {authors}</p>
                        <p className="subjects">Subjects: {subjects}</p>
                        <p className="languages">Languages: {languages}</p>
                        <div className="button-group">
                            {book.formats["text/html"] && (
                                <a
                                    href={book.formats["text/html"]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button"
                                >
                                    Read Online
                                </a>
                            )}
                            {book.formats["application/epub+zip"] && (
                                <a
                                    href={book.formats["application/epub+zip"]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button"
                                >
                                    Download ePub
                                </a>
                            )}
                            {book.formats["application/x-mobipocket-ebook"] && (
                                <a
                                    href={book.formats["application/x-mobipocket-ebook"]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button"
                                >
                                    Download Kindle
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <h4 className="description">{description}</h4>
            </div>
        </div>
    );
};

export default BookModal;
