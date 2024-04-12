import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/http-common';
import './books.css';
import { Link, useNavigate } from 'react-router-dom';


function Books() {

  const navigate = useNavigate();
  const [backendData, setBackendData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);



  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get(`http://localhost:4000/book/getbookbysearch/?searchbybooktitle=${searchQuery}`);
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const getBookData = () => {
    axiosInstance.get(`http://localhost:4000/book/getbooks/`)
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

  function onAddbook() {
    navigate('./addbook')
  }

  function detailBook(BookID) {
    navigate(`./bookdetails/${BookID}`);
  }


  return (
    <>
      <div className='addbtndiv'>
        <form className='searchform' onSubmit={(e) => handleSearch(e)}>
          <input type="search" placeholder='Search by ISBN, Title, Author, Genre' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} id="searchinput" className="form-control" />
          <button id='searchbtn' type='submit'>Search</button>
        </form>
        <button className="addbookbutton addbookbutton1" onClick={() => onAddbook()}> + Add Book</button>
      </div>

      <div to='./bookdetails' className="grid-container">
        {(searchResults.length > 0 ? searchResults : backendData).map((book, index) => (
          <div className='card zoom' key={index + 1} onClick={() => detailBook(book.BookID)}>
            <img src={book.CoverPhoto} alt="" className='cardimage' />
            <h6 className='cardtitle'>Title: {book.Title}</h6>
            <p className='carddetails'>Price:
              {book.Discount > 0 ?
                <>
                  <s>{book.Price} <span>&#8377;</span></s> &nbsp;
                  {book.Price - (book.Price * book.Discount) / 100} <span>&#8377;</span>
                </>
                :
                <>
                  {book.Price} <span>&#8377;</span>
                </>
              }
            </p>
            <p className='carddetails'>Quantity: {book.Quantity}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Books;




