import React, { useState } from "react";
import BookModal from "./BookModal";

const Card = ({ book }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const openModal = (item) => {
        setSelectedBook(item);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedBook(null);
    };

    return (
        <div className="card-container">
            {book.map((item) => (
                <div className="card" key={item.id} onClick={() => openModal(item)}>
                    {item.formats["image/jpeg"] && (
                        <img
                            src={item.formats["image/jpeg"]}
                            alt={item.title}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    )}
                    <h3>{item.title}</h3>
                    <p>Author: {item.authors.map(author => author.name).join(", ")}</p>
                </div>
            ))}
            {selectedBook && (
                <BookModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    book={selectedBook}
                />
            )}
        </div>
    );
};

export default Card;
