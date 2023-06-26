import {React,useEffect,useState }from 'react';

import {Map,Marker,Popup} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import "../style.scss";
import axios from 'axios';
import {format} from "timeago.js"; /// possible import format only
import Register from "./Register.jsx"
import Login from "./Login.jsx"

import { Link } from 'react-router-dom';

function Home() {
  const myStorage = window.localStorage;
const [pins,setPins]=useState([]);
const [currentUser,SetCurrentUser] = useState(myStorage.getItem("User"))

const [curPin,SetCurPin] = useState(null);

const [NewPlace,SetNewPlace]=useState(null)


const [titlePlace,SetTitlePlace] = useState(null)
const [Review,SetReview]=useState(null)
const [Rating,SetRating]=useState(1)

const [ShowRegister,setShowRegister] = useState(false)
const [ShowLogin,setShowLogin] = useState(false)

const [initialViewState,SetInitialViewState] = useState(
  {
    latitude: 15.5,
    longitude:75,
    zoom: 5
  }
)




const handleMarkerClick = function(id,long,lat){
  SetCurPin(id);
  SetInitialViewState({
    zoom: 5,
    latitude:lat,
    longitude: long
  })
}

///get pins from backend
useEffect(() => {
  const pins = async() => {
  try {
     const allPins = await axios.get("/pins");
      setPins(allPins.data);
    
  } catch (error) {
    console.log(error);
  }
}
pins();

}, []);


const handleSubmit = async (e)=>{
  // e.preventDefault(); /// it will prevent refreshing the page
  const newPin = {
    
    username:currentUser,
    title:titlePlace,
    disc:Review,
    rating:Rating,
    lat:NewPlace.lat,
    long:NewPlace.lng

  };
   try {
    const res = await axios.post("/pins",newPin);
    setPins([...pins ,res.data]);
    SetNewPlace(null);

   } catch (error) {
    console.log(error);
   }

};




const handleAddClick = ar =>{
 
  
  SetNewPlace ({
    lat:ar.lngLat.lat,
    lng:ar.lngLat.lng
  });

}
 const handleLogout =()=>{
  myStorage.removeItem("User");
  SetCurrentUser(null);
 }


  return (
    <div>
    <div className="navbar">
    <div className="iconFig">
    <i className="fa-solid fa-location-dot fa-2x icon">

    <h3>Map-Pin</h3>
    </i>
    </div>

    <div className="container">
    {currentUser ? 
    ( <button className="btn logout" onClick={handleLogout} >Logout</button>)
    :( <div className="buttons">
      <button  className="btn login" onClick={()=>(setShowLogin(true),setShowRegister(false))}>Login</button>
     
      <button  className="btn register" onClick={()=>(setShowRegister(true),setShowLogin(false))}>Register</button>
      </div>)}
     
     
      </div>
      </div>
      {ShowRegister &&<Register setShowRegister={setShowRegister}/>}
      {ShowLogin &&
      <Login setShowLogin={setShowLogin} 
       myStorage={myStorage} 
       SetCurrentUser={SetCurrentUser}
      />}

    <Map
     initialViewState={{
      
    ...initialViewState
     }}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAP}
      onDblClick={handleAddClick}>
   
    {pins.map((pin)=>( 
    <>
      <Marker longitude={pin.long} latitude={pin.lat} 

      color={pin.username === currentUser ? "red" : "#0081B4"  }
      onClick={()=>handleMarkerClick(pin._id , pin.lat , pin.long)}
      >
      
       </Marker>   

       { pin._id === curPin  && (

      <Popup  longitude={pin.long} latitude={pin.lat} 
        closeButton={true}//this are must othe wise pop window will not exucute
        closeOnClick={false}//this are must othe wise pop window will not exucute
        onClose={() => SetCurPin(null)}

        anchor="left">
        <div className='card'>
        <label>Place</label>
        <h3 className='place'>{pin.title}</h3>
        <label>Review </label>
        <p>{pin.disc}</p>
        <label>Rating</label>
        <div className='stars'>
        {Array(pin.rating).fill(
          <i className="fa-solid fa-star star"></i>)}
       
        
        </div>
        <label>Information</label>
        <span className='username'>created by <b>{pin.username}</b></span>
        <span className='date'> {format(pin.createdAt)}</span>
         {/* in db createdAt is present when we use timestamps at mongoose.model*/}


        </div>
      </Popup>
      
     ) }
     
</>
      ))}
      <>
      {
       NewPlace && 
        <>
        <Marker longitude={NewPlace.lng} latitude={NewPlace.lat} color= {"red"}>

         </Marker>  
    

      <Popup 
       longitude={NewPlace.lng} 
       latitude={NewPlace.lat} 
        closeButton={true}
        closeOnClick={false}
        onClose={() => SetNewPlace(null)}
        anchor="left">
      <div className='inputPop'>
        <form onSubmit={handleSubmit}>
          <label>Place</label>
          <input type="text" placeholder="Enter the place"
           onChange={(e) => SetTitlePlace(e.target.value)}/>
          <label>Review</label>
          <textarea placeholder="Say us something about the place" type="text"
                 onChange={(e) => SetReview(e.target.value)}
          />
          <label>Rating</label>
          <select      onChange={(e) => SetRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="submit"  className="btn">Add Pin</button>
        </form>
      </div>
     
        </Popup>

      </>
      
      }
      </>
    </Map>
   
    </div>
  );

}

export default Home;
