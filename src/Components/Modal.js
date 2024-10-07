import React from "react";

const Modal = ({ show, item, onClose }) => {
    if (!show) return null;

    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;

    return (
        <div className="overlay">
            <div className="overlay-inner">
                <button className="close" onClick={onClose}><i className="fas fa-times"></i></button>
                <div className="inner-box">
                    <img src={thumbnail} alt="" />
                    <div className="info">
                        <h1>{item.title}</h1>
                        <h3>{item.authors?.join(", ")}</h3>
                        <h4>{item.publisher} <span>{item.publishedDate}</span></h4>
                        <a href={item.previewLink}><button>More</button></a>
                    </div>
                </div>
                <h4 className="description">{item.description}</h4>
            </div>
        </div>
    );
};

export default Modal;
