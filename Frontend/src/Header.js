import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";
import { FaEdit } from "react-icons/fa";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('https://mernblog-api-delta.vercel.app/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('https://mernblog-api-delta.vercel.app/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">Blogger</Link>
      <nav>
        {username && (
          <>
            <Link to="/create" className="acc"><FaEdit/> Write</Link>
            <a className="acc" onClick={logout}>Log-out</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="acc">Login</Link>
            <Link to="/register" className="acc">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
