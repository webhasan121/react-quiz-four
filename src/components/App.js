import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Signup exact path="/signup" component={Signup}></Signup>
            <Login exact path="/login" component={Login}></Login>
            <Quiz exact path="/quiz" component={Quiz}></Quiz>
            <Result exact path="/result" component={Result}></Result>
          </Switch>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
