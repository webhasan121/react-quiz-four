import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import classes from "../styles/Signup.module.css";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");
  const [error, seterror] = useState();
  const [loading, setloading] = useState();

  const { signup } = useAuth();

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return seterror("Password don't math !");
    }
    try {
      seterror("");
      setloading(true);
      await signup(email, password, username);
      history.push("/");
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror("Failed to create an account ! please try again");
    }
  }
  return (
    <Form
      method="post"
      myclassName={`${classes.signup}`}
      onSubmit={handleSubmit}
    >
      <TextInput
        type="text"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter name"
        icon="person"
      />
      <TextInput
        type="text"
        required
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <TextInput
        type="password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm password"
        icon="lock_clock"
      />
      <CheckBox
        value={agree}
        required
        onChange={(e) => setAgree(e.target.value)}
        text="I agree to the Terms & Conditions"
      />

      <Button type="submit" disabled={loading}>
        <span>Submit now</span>
      </Button>
      {error && <p className="error">{error}</p>}
      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}
