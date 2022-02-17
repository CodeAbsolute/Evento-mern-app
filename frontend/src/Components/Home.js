import React from "react";
import Events from "./Events";
import Header from "./Header";
import "./Home.css";
const Home = () => {
  console.log("home");

  return (
    <>
      <Header />
      <div className="home">
        <div
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "bolder",
            marginTop: "100px",
            marginBottom: "20px",
            maxWidth: "1200px",
            margin: "50px auto",
          }}
        >
          <h2 style={{ color: "blue" }}>EXPLORE EVENTS</h2>
        </div>
        <Events />
      </div>
    </>
  );
};

export default Home;
