import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Event(props) {
  const {
    eventBannerImage,
    eventName,
    eventDescription,
    eventAddress,
    eventDateandTime,
  } = props.event;

  const d = new Date(eventDateandTime ? eventDateandTime : "Coming soon...");
  console.log("inside event: ", d.toLocaleTimeString(), d.toLocaleDateString());
  return (
    <Card
      style={{
        width: "350px",
        marginTop: "50px",
        marginRight: "15px",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={eventBannerImage[0].url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {eventName}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          <p>
            <b style={{ display: "flex", flexDirection: "flex-start" }}>
              Description:{" "}
            </b>
            {eventDescription}{" "}
          </p>
          <p>
            <b style={{ display: "flex", flexDirection: "flex-start" }}>
              Location:{" "}
            </b>{" "}
            {eventAddress}{" "}
          </p>
          <p>
            <b style={{ display: "flex", flexDirection: "flex-start" }}>
              Date & Time:
            </b>
            {d.toLocaleDateString() + ", " + d.toLocaleTimeString("IST")}
          </p>
        </Typography>
      </CardContent>
    </Card>
  );
}
