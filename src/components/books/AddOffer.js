import axiosInstance from "../../config/http-common";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';



function AddOffer() {

    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const { BookID } = useParams();

    function addOfferAPI(offerData) {

        return new Promise((resolve, reject) => {
            axiosInstance.post(`http://localhost:4000/book/addoffer/${BookID}`, offerData, {
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

    const onSubmit = (offer) => {
        const offerData = {
            Title: offer.Title,
            Discount: offer.Discount
        };

        addOfferAPI(offerData);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <h2>Add Offer</h2>
                    <hr />

                    <label htmlFor="title"><b>Offer Title</b></label>
                    <input {...register("Title")} type="text" placeholder="Enter Title" required />

                    <label htmlFor="discount"><b>Discount in %</b></label>
                    <input {...register("Discount")} type="text" placeholder="Enter Discount" required />


                    <div className="clearfix , loginDiv" >
                        <button type="button" className="cancelbtn">Cancel</button>
                        <button type="submit" className="signupbtn">Add Offer</button>
                    </div>
                </div>
            </form>
        </> 
    );
}

export default AddOffer;