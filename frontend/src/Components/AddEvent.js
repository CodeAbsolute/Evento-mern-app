import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import "./Signup.css";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createEvent } from "../Actions/eventAction";
import Header from "./Header";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Loader from "./Loader";
const theme = createTheme();

export default function AddEvent({ history }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector((state) => state.addevent);

  const [event, setEvent] = useState({
    name: "",
    price: 0,
    type: "",
    desc: "",
    date: new Date(),
    address: "",
  });

  const { name, price, type, desc, date, address } = event;

  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const myForm = new FormData();
    myForm.set("eventName", name);
    myForm.set("eventDescription", desc);
    myForm.set("eventPrice", price);
    myForm.set("eventType", type);
    myForm.set("eventDateandTime", date);
    myForm.set("eventAddress", address);
    myForm.set("eventBannerImage", bannerImage);

    console.log("myForm :>> ", myForm);
    dispatch(createEvent(myForm));
  };

  const addEventDataChange = (e) => {
    if (e.target.name === "bannerImage") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setBannerImagePreview(reader.result);
          setBannerImage(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setEvent({ ...event, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
      history.push("/");
    }
  }, [dispatch, error, alert, history, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <ThemeProvider theme={theme}>
            <Grid
              item
              xs={12}
              sm={8}
              md={4}
              sx={{ margin: "auto", marginTop: "10%" }}
              component={Paper}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <AddCircleIcon color="blue" />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Add Event
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Event Name"
                    margin="normal"
                    value={name}
                    onChange={addEventDataChange}
                    autoFocus
                  />

                  <TextField
                    required
                    fullWidth
                    id="desc"
                    label="Event Description"
                    name="desc"
                    margin="normal"
                    value={desc}
                    onChange={addEventDataChange}
                  />

                  {/* <TextField
                required
                fullWidth
                name="price"
                label="Price"
                type="number"
                id="price"
                margin="normal"
                value={price}
                onChange={addEventDataChange}
              /> */}

                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="type"
                    label="Event Type"
                    name="type"
                    margin="normal"
                    value={type}
                    onChange={addEventDataChange}
                  />

                  <TextField
                    id="datetime-local"
                    label="Date&Time picker"
                    type="datetime-local"
                    name="date"
                    fullWidth
                    required
                    sx={{ width: 250 }}
                    value={date}
                    onChange={addEventDataChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="address"
                    label="Venue"
                    name="address"
                    margin="normal"
                    value={address}
                    onChange={addEventDataChange}
                  />

                  <label htmlFor="bannerImage" style={{ display: "block" }}>
                    Event Banner Image
                  </label>
                  <div id="bannerImage">
                    {bannerImagePreview && (
                      <img
                        src={bannerImagePreview}
                        alt="Event Banner Preview"
                      />
                    )}
                    <input
                      type="file"
                      name="bannerImage"
                      accept="image/*"
                      onChange={addEventDataChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add Event
                  </Button>
                </Box>
              </Box>
            </Grid>
          </ThemeProvider>
        </>
      )}
    </>
  );
}
