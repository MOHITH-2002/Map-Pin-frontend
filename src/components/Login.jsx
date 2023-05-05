import {React,useState,useRef} from 'react'
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

import "../style.scss";
// import { useNavigate } from 'react-router-dom';

const Login = ({setShowLogin,myStorage,SetCurrentUser}) => {
  // const navigate = useNavigate();
  
  const[failure,setFailure] = useState(false);
  const nameRef = useRef();
  
  const passwordRef = useRef();


  const handleSubmit = async (e)=>{
    e.preventDefault();
    const User = {
        username:nameRef.current.value,
        
        password:passwordRef.current.value,
    }
    try {
      
    const res = await axios.post("/users/login", User);
     setFailure(false);
     myStorage.setItem("User",res.data.username);
     SetCurrentUser(res.data.username);
     setShowLogin(false);
    //  navigate('/');

 
      
    } catch (error) {
     
      setFailure(true);
      
    }

  }
  return (
     
    <div className="LoginCont">
<CancelIcon className="cancel"  onClick={()=>setShowLogin(false)} />
    <div className="logo">
    <i class="fa-solid fa-location-dot fa-1.5x icon"  >
<h3>Map-Pin</h3>
</i>
    </div>
    <div className="inputs">
        <form onSubmit={handleSubmit}>
            <input type="text" className="username" placeholder="Username" ref={nameRef}></input>
         
            <input type="password" className="username" placeholder="password" ref={passwordRef}></input>
            <button type="submit" className="but">Login</button>         
        
        </form>

    
    
    </div>
    {failure && 
      <span className="failure">Username OR Password incorrect</span>
    }
    </div>
  )
}

export default Login
