import React from "react";
import { Phones } from "../data/phone";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Footer from "./Footer";
import Form from "react-bootstrap/Form";

const Sell = ({ setStep, setProf, prof }) => {
  return (
    <div>
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      <div className="bg-light py-5">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Sell;
