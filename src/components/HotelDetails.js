import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';

function HotelDetails(props) {
    const { _id } = useParams();
    const { bookingfrom } = useParams();
    const { bookingto } = useParams();
    const [singleData, setSingleData] = useState({});
    const [booking, setBooking] = useState({
        pname: '', mobile: '', email: ''
    });
    const [roomcode, setRoomCode] = useState("");
    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const res = await fetch(`/showdata/${_id}`);
                const data = await res.json();
                console.log("coming data", data);
                setSingleData(data.data);

            }
            catch (error) {
                console.log("API Error is", error);
            }

        }
        fetchHotelData();
    }, [_id]);

    const handleInputs = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;
        setBooking({ ...booking, [name]: value });

    }
    const postData = async (e) => {
        e.preventDefault();
        const { pname, mobile, email } = booking;
        const res = await fetch(`/booking/${roomcode}/${bookingfrom}/${bookingto}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pname, mobile, email
            })
        });
        const status = await res.status;
        if (status === 201) {
            window.alert("Room booked successfully");

        }
        else {
            window.alert("Error");
        }
    }

    return (
        <div className='container mt-5'>
            <div key={singleData._id} className="d-flex align-items-center gap-5 ">
                <div className='d-flex flex-column'>
                    <h3>{singleData.name}</h3>
                    <h5>{singleData.address}</h5>
                </div>
            <img src="https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768" alt="loading" width="`100px" height="200px" className='hotel-pic' />



            </div>

            <h1>Select Room to Book</h1>

            <div>
                {singleData?.rooms?.map((room) => {
                    return (
                        <button key={room._id} className="room-btn" type="button" onClick={() => setRoomCode(room)}>{room}</button>
                    );
                })}

            </div>

            {/* form */}
            <form method="post">
                <div className='d-flex mb-3 justify-content-around'>
                    <label> Name</label>
                    <input type="text" name='pname' placeholder="Enter Name" value={booking.pname} onChange={handleInputs} />
                </div>
                <div className='d-flex mb-3 justify-content-around'>
                    <label>Mobile</label>
                    <input type="mobile" name="mobile" placeholder="Enter Mobile" value={booking.mobile} onChange={handleInputs} />
                </div>
                <div className='d-flex justify-content-around mb-3'>
                    <label>Email ID</label>
                    <input type="text" name="email" placeholder="Enter Email ID" value={booking.email} onChange={handleInputs} />
                </div>
                <div className='d-flex justify-content-end mt-5'>
                    <button type="submit" value="submit" name="submit" className="btn btn-primary" onClick={postData}>Book Now</button>
                </div>
            </form>

        </div>
    );
}

export default HotelDetails;