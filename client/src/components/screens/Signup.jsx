import {React,useState} from 'react'
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import M from 'materialize-css'

const Signup = () => {
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const PostData =()=>{
        fetch("http://localhost:5000/api/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }
            else {
                M.toast({html:data.message, classes:" green darken-1"})
                navigate('/signin');
            }
        })
    }

  return (
    <div className='myCard'>
        <div className="card">
            <h2>Instagram</h2>
            <input type="text"  placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text"  placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text"  placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='btn waves-effect waves-light' onClick={()=>PostData()}>Login</button>
            <h5><Link to="/signin">Already have an account ?</Link></h5>
        </div>
    </div>
  )
}

export default Signup