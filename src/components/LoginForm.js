import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import classes from "../styles/Login.module.css";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, seterror] = useState();
  const [loading, setloading] = useState();

  const { login } = useAuth();

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      seterror("");
      setloading(true);
      await login(email, password);
      history.push("/");
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror("Failed to login ! please try again");
    }
  }
  return (
    <Form
      method="post"
      myclassName={`${classes.login}`}
      onSubmit={handleSubmit}
    >
      <TextInput
        type="text"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        icon="alternate_email"
      />
      <TextInput
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        icon="lock"
      />
      <Button type="submit" disabled={loading}>
        <span>Submit now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Don't have an account? <Link to="/signup">Signup</Link> instead.
      </div>
    </Form>
  );
}
