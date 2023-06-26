import {React,useState,useRef} from 'react'
import axios from 'axios';
import "../style.scss";



const Register = ({setShowRegister}) => {

  const[success,setSuccess] = useState(false);
  const[failure,setFailure] = useState(false);
  const [error,setError] = useState("");
  const [email,setEmail] = useState("");
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const regex =/([a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g

  const CheckEmail =(e)=>{

   setEmail(e.target.value)
    if(regex.test(email) === true){
      setError("");

    }
    else{
      setError("please enter the valid email address");
      

     
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const newUser = {
        username:nameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value,
    }
    try {
      
     await axios.post("/users/register", newUser);
     setFailure(false);
      setSuccess(true);
     
    } catch (error) {
      console.log(error);
      setFailure(true);
      
    }

  }
  return (
     
    <div className="regCont">

<i className="fa-solid fa-x cancel" onClick={()=>setShowRegister(false)} ></i>
    <div className="logo">
    <i className="fa-solid fa-location-dot fa-1.5x icon">
<h3>Map-Pin</h3>
</i>
    </div>
    <div className="inputs">
        <form onSubmit={handleSubmit}>
            <input type="text" className="username" placeholder="Username" required="true" ref={nameRef}></input>
            <input type="text" className="username" placeholder="Email" required="true;" onChange={CheckEmail} ref={emailRef}></input>
            <p className='failure'>{error}</p>
            <input type="password" className="username" placeholder="password" required="true" ref={passwordRef}></input>
            <button type="submit" className="but">Register</button>
          
           
          
            {success &&
            
            <span className="success">success.You can login now
            !</span>
            
            }
            {failure &&
            <span className="failure">Error.Something went wrong!</span>
            }
        </form>

    </div>
  
    
    </div>
  )
}

export default Register
