import axiosInstance from "../../config/http-common";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookDetailsCSS from './BookDetails.module.css';
import { useNavigate } from 'react-router-dom';


function BookDetails() {

    const navigate = useNavigate();
    const [backendData, setBackendData] = useState([]);
    const { BookID } = useParams();


    const getBookData = () => {
        axiosInstance.get(`http://localhost:4000/book/getbook/${BookID}`)
            .then(response => {
                setBackendData(response.data);
            })
            .catch(error => {
                console.error('Error fetching book data:', error);
            });
    };

    useEffect(() => {
        getBookData();
    }, []);


    function deleteBook(ID) {
        // event.preventDefault();
        deleteAPI(ID);

        // event.stopPropagation();
    }

    function onEditbook(BookID) {
        navigate(`../books/editbook/${BookID}`);
    }

    function onAddOffer(BookID) {
        navigate(`../books/addoffer/${BookID}`);
    }

    function deleteOffer(BookID) {
        onDeleteOffer(BookID);
    }


    function deleteAPI(ID) {
        return new Promise(function (resolve, reject) {
            axiosInstance
                .delete(`http://localhost:4000/book/deletebook/${ID}`)
                .then(() => {
                    navigate('/layout/books');
                })
                .then((res) => {
                    getBookData();
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }



    function onDeleteOffer(BookID) {
        return new Promise(function (resolve, reject) {
            axiosInstance
                .delete(`http://localhost:4000/book/deleteoffer/${BookID}`)
                .then((res) => {
                    getBookData();
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

    return (
        <>
            <div className={BookDetailsCSS.maindiv}>
                {backendData.map((book, index) => (
                    <div div key={index} className={BookDetailsCSS.keydiv}>
                        <div>
                            <img className={BookDetailsCSS.img} src={book.CoverPhoto} alt="" />
                        </div>
                        <div  className={BookDetailsCSS.bookdetailsdiv}>
                            <h4 className={BookDetailsCSS.booktitle}>{book.Title}</h4>
                            <div className={BookDetailsCSS.authorgenrediv}>
                                <span>Author: <strong className={BookDetailsCSS.strongtag}>{book.Author}</strong></span>
                                <span>Genre: <strong className={BookDetailsCSS.strongtag}>{book.Genre}</strong></span>
                            </div>
                            {book.Discount <= 0 &&
                                <p className={BookDetailsCSS.bookprice}>&#8377;{book.Price} <span> &#8377;</span></p>
                            }
                            {book.Discount > 0 &&
                                <p className={BookDetailsCSS.bookprice}>
                                    <span>&#8377; {book.Price - (book.Price * book.Discount) / 100}</span>
                                    <s className={BookDetailsCSS.bookdiscount}>&#8377; {book.Price}</s>
                                    <span className={BookDetailsCSS.discountpercentage}>{book.Discount}% OFF</span>
                                    <span className={BookDetailsCSS.saveprice}>You Save &#8377; {(book.Price - (book.Price - (book.Price * book.Discount) / 100)).toFixed(2)}</span>
                                </p>
                            }
                            <p className={BookDetailsCSS.isbnfont}>ISBN: {book.ISBN}</p>
                            <p className={BookDetailsCSS.isbnfont}>Quantity: {book.Quantity}</p>
                            {book.OfferTitle !== 'No offers' &&
                                <p className={BookDetailsCSS.isbnfont}>Offers: {book.OfferTitle}</p>
                            }
                            <div className={BookDetailsCSS.btndiv}>
                                <button className={`${BookDetailsCSS.editbutton} ${BookDetailsCSS.editbutton1}`} onClick={() => onEditbook(book.BookID)}>Edit</button>
                                <button className={`${BookDetailsCSS.deletebutton} ${BookDetailsCSS.deletebutton1}`} onClick={() => deleteBook(book.BookID)}>Delete</button>
                            </div>
                            <div>
                                <button className={`${BookDetailsCSS.editbutton} ${BookDetailsCSS.editbutton1}`} onClick={() => onAddOffer(book.BookID)}>Add Offer</button>
                                <button className={`${BookDetailsCSS.deletebutton} ${BookDetailsCSS.deletebutton1}`} onClick={() => deleteOffer(book.BookID)}>Delete Offer</button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </>
    );
}

export default BookDetails;
