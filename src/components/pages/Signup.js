import React from "react";
import { Link } from "react-router-dom";
import signupImage from "../../assets/images/signup.svg";
import classes from "../../styles/Signup.module.css";
import Button from "../Button";
import CheckBox from "../CheckBox";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";

export default function Signup() {
  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration image={signupImage} alt="Signup"></Illustration>
        <Form method="post" myclassName={`${classes.signup}`}>
          <TextInput type="text" placeholder="Enter name" icon="person" />
          <TextInput
            type="text"
            placeholder="Enter email"
            icon="alternate_email"
          />
          <TextInput type="password" placeholder="Enter password" icon="lock" />
          <TextInput
            type="password"
            placeholder="Confirm password"
            icon="lock_clock"
          />
          <CheckBox text="I agree to the Terms & Conditions" />
          <Button>
            <span>Submit now</span>
          </Button>
          <div className="info">
            Already have an account? <Link to="/login">Login</Link> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
