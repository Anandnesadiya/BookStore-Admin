import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../config/http-common';
import "./AddBook.css"
const AddBook = () => {

    const { register, handleSubmit } = useForm();
    const [file, setFile] = useState("");
    const [backendData, setBackendData] = useState([]);

    const navigate = useNavigate();

    let fileResult = "";

    function convertToBase64(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setFile(reader.result)
            fileResult = reader.result;
            console.log("fileResult");
        }

        reader.onerror = error => {
            console.log("Error:", error);
        }
    };

    const onSubmit = (book) => {
        const bookData = {
            Title: book.Title,
            Author: book.Author,
            Genre: book.Genre,
            Price: book.Price,
            ISBN: book.ISBN,
            Quantity: book.Quantity,
            CoverPhoto: file
        };

        addBookAPI(bookData)

        getBookData();
        console.log(bookData);
    };


    function addBookAPI(bookData) {
        return new Promise((resolve, reject) => {
            axiosInstance.post("http://localhost:4000/book/addbook/", bookData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((res) => {
                    navigate("/layout/books");
                    if (res.status !== 200) {
                        reject(new Error('Failed to add book'));
                    }
                    resolve(res.data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    }

    function onCancel() {
        return navigate('/layout/books');
    }

    const getBookData = () => {
        axiosInstance.get("http://localhost:4000/book/getbooks/")
            .then(response => {
                setBackendData(response.data);
            })
            .catch(error => {
                console.error('Error fetching book data:', error);
            });
    };
    useEffect(() => {
        // getBookData();
    }, []);


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
                <h2>Add Book</h2>
                <hr />

                <label htmlFor="title"><b>Title</b></label>
                <input {...register("Title")} type="text" placeholder="Enter Title" required />

                <label htmlFor="author"><b>Author</b></label>
                <input {...register("Author")} type="text" placeholder="Enter Author" required />

                <label htmlFor="genre"><b>Genre</b></label>
                <input {...register("Genre")} type="text" placeholder="Enter Genre" required />

                <label htmlFor="price"><b>Price</b></label>
                <input {...register("Price")} type="text" placeholder="Enter Price" required />

                <label htmlFor="isbn"><b>ISBN</b></label>
                <input {...register("ISBN")} type="text" placeholder="Enter ISBN" required />

                <label htmlFor="quantity"><b>Quantity</b></label>
                <input {...register("Quantity")} type="text" placeholder="Enter Quantity" required />

                <label htmlFor="coverphoto"><b>Select Cover Photo</b></label>
                <input onChange={convertToBase64} type="file" className="form-control" id="customFile" />
                {file === "" || file === null ? "" : <img width={400} height={100} src={file} />}
                <br />

                <div className="clearfix , loginDiv" >
                    <button type="button" className="cancelbtn" onClick={onCancel}>Cancel</button>
                    <button type="submit" className="signupbtn">Add Book</button>
                </div>
            </div>
        </form>
    )
}

export default AddBook
