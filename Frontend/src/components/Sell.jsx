import React from "react";
import { Phones } from "../data/phone";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Footer from "./Footer";
import Form from "react-bootstrap/Form";
import {useState } from "react";


const Sell = ({ setStep, setProf, prof }) => {

    const [form, setform] = useState({
        title: "",
        description: "",
        price: "",
        brand: "",
        email: prof.email
      });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setform({ ...form, [name]: value });

    };

    const submit = async (e) =>{

        e.preventDefault();

        if(form.title.length == 0){
            setError("Please Fill out the title");
            return;
        }
        else if(form.description.length == 0){
            setError("Please fill out the description.");
            return;
        }
        else if(form.price.length == 0){
            setError("Please fill out the price.");
            return;
        }
        else if(form.price.length == 0){
            setError("Please fill out the price");
            return;
        }

        const result = await fetch("http://localhost:8080/sell",{// send the form data to backend
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });
      
    }

    
      
  return (
    <div>
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      <div className="bg-light py-5">
        <h2 className="text-center text-dark mb-4">
          Sell your old phones! We'll take them!
        </h2>
        <Form onSubmit={submit}>
        {error && <div className="alert alert-danger">{error}</div>}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control 
                type="text" 
                name= "title"
                placeholder="Enter title" 
                value={form.title}
                onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
               as="textarea"
               rows={3}
               name="description"
               value={form.description}
               onChange={handleChange}
               placeholder="Describe your phone"
            />
          </Form.Group>

          <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="Brand"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
              />
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
