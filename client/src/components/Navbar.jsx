import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext)

  const renderList = () => {
    console.log("Navbar state:", state);

    if (state) {
      return [
        <li key="profile"><Link to="/profile">Profile</Link></li>,
        <li key="create"><Link to="/create">Create Post</Link></li>,
        <li key="logout">
          <button onClick={() => {
            localStorage.clear()
            dispatch({ type: "CLEAR" })
          }}>Logout</button>
        </li>
      ];
    } else {
      return [
        <li key="signup"><Link to="/signup">Signup</Link></li>,
        <li key="signin"><Link to="/signin">Signin</Link></li>
      ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;

