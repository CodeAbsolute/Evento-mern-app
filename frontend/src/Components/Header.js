import React, { useEffect, useState } from "react";
import "./Header.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "../Actions/userAction";
const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  let menu = document.querySelector("#menu-bars");
  let navbar = document.querySelector(".navbar");

  const onClickMenu = () => {
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");
  };

  const Logout = () => {
    console.log("logout");
    dispatch(logout());
  };

  return (
    <div className="header">
      <Link to="/">
        <h2 style={{ color: "#fff", fontSize: "1.6rem", fontWeight: "bold" }}>
          Evento
        </h2>
      </Link>

      <nav className="navbar">
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/events/me">My Events</Link>
            <Link to="/events/add">Create Event</Link>

            <Button
              onClick={Logout}
              variant="contained"
              color="primary"
              sx={{ margin: 1, padding: 1, marginLeft: 2 }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button
                variant="contained"
                color="primary"
                sx={{ margin: 1, padding: 1 }}
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="contained"
                color="success"
                sx={{ margin: 1, padding: 1 }}
              >
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </nav>
      <div id="menu-bars" onClick={onClickMenu}>
        Menu
      </div>
    </div>
  );
};

export default Header;
