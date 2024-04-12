import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/http-common';
import {  useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

function EditBook() {

  const [backendData, setBackendData] = useState([]);
  const [file, setFile] = useState("");
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const { BookID } = useParams();

  let fileResult = "";

  function convertToBase64(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setFile(reader.result);
      fileResult = reader.result;
      console.log("fileResult");
    };

    reader.onerror = (error) => {
      console.log("Error:", error);
    };
  }

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
  }, [BookID]);


  const onSubmit = (book) => {
    const bookData = {
      Title: book.Title,
      Author: book.Author,
      Genre: book.Genre,
      Price : book.Price,
      ISBN: book.ISBN,
      Quantity: book.Quantity,
      CoverPhoto: file
    };
    return updatebookAPI(bookData).then((r) => {
      console.log("2");
      setTimeout(() => {
        navigate(`/layout/books/bookdetails/${BookID}`)
      }, 100);
    }).catch((e) => {
      console.log(e);
    });
  };


  function updatebookAPI(bookData) {
    return new Promise(function (resolve, reject) {
      
        return axiosInstance
          .put(
            `http://localhost:4000/book/updatebook/${BookID}`,
            bookData
          )
          .then((res) => {
            console.log("1");
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          })
      
    });
  }

  function onCancel(){
    navigate(`/layout/books/bookdetails/${BookID}`);
  }



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
          <h2>Edit Book</h2>
          <hr />

          <label htmlFor="title"><b>Title</b></label>
          <input {...register("Title")} type="text" placeholder="Enter Title" required defaultValue={backendData.length > 0 ? backendData[0].Title : ''} />

          <label htmlFor="author"><b>Author</b></label>
          <input {...register("Author")} type="text" placeholder="Enter Author" required defaultValue={backendData.length > 0 ? backendData[0].Author : ''} />

          <label htmlFor="genre"><b>Genre</b></label>
          <input {...register("Genre")} type="text" placeholder="Enter Genre" required defaultValue={backendData.length > 0 ? backendData[0].Genre : ''} />

          <label htmlFor="price"><b>Price</b></label>
          <input {...register("Price")} type="text" placeholder="Enter Price" required defaultValue={backendData.length > 0 ? backendData[0].Price : ''} />

          <label htmlFor="isbn"><b>ISBN</b></label>
          <input {...register("ISBN")} type="text" placeholder="Enter ISBN" required defaultValue={backendData.length > 0 ? backendData[0].ISBN : ''} />

          <label htmlFor="quantity"><b>Quantity</b></label>
          <input {...register("Quantity")} type="text" placeholder="Enter Quantity" required defaultValue={backendData.length > 0 ? backendData[0].Quantity : ''} />

          <label htmlFor="coverphoto"><b>Select Cover Photo</b></label>
          <input type="file" className="form-control" id="customFile" onChange={convertToBase64}/>
          {file === "" || file === null ? ("") : (<img width={400} height={100} src={file} />)}
          <br />

          <div className="clearfix , loginDiv" >
            <button type="button" className="cancelbtn" onClick={onCancel} >Cancel</button>
            <button type="submit" className="signupbtn">Edit Book</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditBook;
