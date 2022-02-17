import React, { useEffect } from "react";
import Event from "./Event";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../Actions/eventAction";
import Loader from "./Loader";
const Events = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);
  // console.log("events: ", events);
  useEffect(() => {
    dispatch(getAllEvents());
    // console.log(`events useEffect: `, events);
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            flexWrap: "wrap",
            margin: "50px auto",
            maxWidth: "1500px",
          }}
        >
          {/* <span style={{ fontSize: "50px" }}>Our Events</span> */}
          {events &&
            events.map((event) => {
              // console.log("render", event);
              return <Event key={event._id} event={event} />;
            })}
        </div>
      )}
    </>
  );
};

export default Events;
