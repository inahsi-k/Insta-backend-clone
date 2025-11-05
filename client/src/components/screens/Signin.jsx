import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const postSignin = () => {
    console.log("Sending:", { email, password }); // Debugging line
    fetch('http://localhost:5000/api/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          M.toast({ html: data.error, classes: "red darken-3" })
        } else {
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          M.toast({ html: "Login successful!", classes: "green darken-1" })
          navigate('/')
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='myCard'>
      <div className="card">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='btn waves-effect waves-light'
          onClick={postSignin}
        >
          Login
        </button>
        <h5><Link to="/signup">Don’t have an account?</Link></h5>
      </div>
    </div>
  )
}

export default Signin
