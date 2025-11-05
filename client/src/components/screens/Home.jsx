import React from "react";
import carImage from "../../Images/Car.jpg"; // adjust if needed
import { useState } from "react";
import { useEffect } from "react";



const Home = () => {
  const [data,setData] = useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/allpost',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      }
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      setData(result.posts)
    })
  },[])
  return (
    <div className="home">
      {
        data.map(item=>{
          return(
          <div className="card home-card" key={item._id}>
            <div className="card-header">
              <img
                className="profile-pic"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="profile"
              />
              <h6 className="username">{item.postedBy?.name || "Unknown User"}</h6>
            </div>

            <div className="card-image">
              <img  src={item.photo}  alt="Car" />
            </div>

            <h6>{item.title}</h6>
            <p>{item.body}</p>
            <div className="card-content">
              <div className="icons">
                <i className="material-icons">favorite_border</i>
                <i className="material-icons">mode_comment</i>
                <i className="material-icons">send</i>
              </div>
              <h6>Liked by <b>you</b> and <b>23 others</b></h6>
              <p><b>nishu_kumari</b> Enjoying the ride 🚗💨</p>
              <input type="text" placeholder="Add a comment..." />
            </div>
      </div>
          )
        })
      }
      
    </div>
  );
};

export default Home;

