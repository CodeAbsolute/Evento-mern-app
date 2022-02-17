import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import "./Signup.css";
import { register } from "../Actions/userAction";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearErrors } from "../Actions/userAction";
import Loader from "../Components/Loader";
const theme = createTheme();

export default function SignUp({ history, location }) {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const { name, email, password, phone } = user;

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const myForm = new FormData();
    console.log("user", user);
    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("password", user.password);
    myForm.set("phone", user.phone);
    myForm.set("avatar", avatar);
    console.log("avatar", avatar);
    console.log("myForm :>> ", myForm);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push("/");
    }
  }, [dispatch, error, alert, history, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={8}
              sx={{
                backgroundImage: "url(/images/signup.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={4}
              component={Paper}
              elevation={6}
              square
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
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    margin="normal"
                    value={name}
                    onChange={registerDataChange}
                    autoFocus
                  />

                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    margin="normal"
                    // autoComplete="email"
                    value={email}
                    onChange={registerDataChange}
                  />

                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    margin="normal"
                    autoComplete="new-password"
                    value={password}
                    onChange={registerDataChange}
                  />

                  <TextField
                    required
                    fullWidth
                    type="number"
                    id="phone"
                    label="Phone"
                    name="phone"
                    margin="normal"
                    value={phone}
                    onChange={registerDataChange}
                  />

                  <div id="registerImage">
                    {avatarPreview && (
                      <img src={avatarPreview} alt="Avatar Preview" />
                    )}
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={registerDataChange}
                    />
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                </Box>
                <Grid container justifyContent="flex-end">
                  Already have an account?
                  <RouterLink to="/login"> Sign in</RouterLink>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
}
