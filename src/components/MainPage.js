import React, { useState,useEffect} from 'react';
import { NavLink } from "react-router-dom";
import './style.css';
function MainPage(props) {
    const [bookingfrom,setBookingFrom]=useState("");
    const [bookingto,setBookingTo]=useState("");
    const [hotelData,setHotelData]=useState([]);
    const [roomtype,setRoomType]=useState('');
    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const res = await fetch('/displayhoteldata');
                const data = await res.json();
                console.log("coming data", data);
                setHotelData(data.data);

            }
            catch (error) {
                console.log("API Error is", error);
            }

        }
        fetchHotelData();
    }, [hotelData,roomtype]);

    // const handleRadio=(type)=>{
    // let filterData=hotelData.filter((item)=>{return item.totalrooms === type });
    // setHotelData(filterData);
    // }

    return (
        <div className='container main-wrapper'>
            <div className="left">
                <div className="roomtype fw-bold text-start mb-3">
                    <label className="m-2">Room Type:</label>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" checked={roomtype === '1'} onChange={(e)=>setRoomType(e.target.value)}/>
                        <label class="form-check-label" for="inlineRadio1">1BHK</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" checked={roomtype === '2'} onChange={(e)=>setRoomType(e.target.value)} />
                        <label class="form-check-label" for="inlineRadio2">2BHK</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="3" checked={roomtype === '3'} onChange={(e)=>setRoomType(e.target.value)} />
                        <label class="form-check-label" for="inlineRadio3">3BHK</label>
                    </div>
                </div>

                <div className="daterange text-start mb-3">
                    <div className="sdate">
                    <label>From</label>
                    <input type="date" name='bookingfrom' value={bookingfrom} onChange={(e)=>setBookingFrom(e.target.value)} />
                    </div>
                    <div className='edate'>
                    <label>To</label>
                    <input type="date" name='bookingto' value={bookingto} onChange={(e)=>setBookingTo(e.target.value)} />
                    </div>
                </div>

                <div className="pagination mt-3 mb-2">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="!#">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="!#">1</a></li>
                            <li class="page-item"><a class="page-link" href="!#">2</a></li>
                            <li class="page-item"><a class="page-link" href="!#">3</a></li>
                            <li class="page-item"><a class="page-link" href="!#">Next</a></li>
                        </ul>
                    </nav>
                </div>

              {hotelData.map((item)=>{
                
              return(
               <div className="hotel-info" key={item._id}>
                <img src={item.hotelpicture} alt="loading" className='hotel-img' />
                <div>
                    <h3>{item.name}</h3>
                    <h5>{item.availablerooms} rooms Available</h5>
                </div>
                <NavLink to={`/hoteldetails/${item._id}/${bookingfrom}/${bookingto}`} >
                <button className="btn btn-primary fw-bold">Book Now</button>
                </NavLink>
                                    
               </div>
              );
             
 })}

            </div>
        </div>
    );
}

export default MainPage;
