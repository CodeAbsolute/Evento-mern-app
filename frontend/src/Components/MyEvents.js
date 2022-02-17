import React, { useEffect } from "react";
import Event from "./Event";
import { useDispatch, useSelector } from "react-redux";
import { getMyEvents } from "../Actions/eventAction";
import Header from "./Header";
import Loader from "./Loader";
import Footer from "./Footer";
export default function MyEvents() {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.myevents);
  // console.log("events: ", events);
  useEffect(() => {
    dispatch(getMyEvents());
    // console.log(`events useEffect: `, events);
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div
            style={{
              textAlign: "center",
              fontSize: "25px",
              fontWeight: "bolder",
              marginTop: "100px",
              marginBottom: "20px",
              marginLeft: "50px ",
            }}
          >
            <h2 style={{ color: "blue" }}>MY EVENTS</h2>
          </div>
          <div
            style={{
              // marginTop: "100px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "normal",
              margin: "50px auto",
              maxWidth: "1500px",
            }}
          >
            {events &&
              events.map((event) => {
                console.log("render", event);
                return <Event key={event._id} event={event} />;
              })}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
