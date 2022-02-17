import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import MyEvents from "./Components/MyEvents";
import ProtectedRoute from "./ProtectedRoute";
import store from "./store";
import { loadUser } from "./Actions/userAction";
import { useEffect } from "react";
import AddEvent from "./Components/AddEvent";
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  useEffect(() => {
    console.log("useEffect called: app.js");
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/signup" component={Signup} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/events/me" component={MyEvents} />
        <ProtectedRoute exact path="/events/add" component={AddEvent} />
      </Switch>
    </Router>
  );
}

export default App;
