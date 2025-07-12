import React from "react";
import { Phones } from "../data/phone";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Footer from "./Footer";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useEffect } from "react";
import Trash from "../assets/trash.jpg";

const Edit = ({ setStep, setProf, prof, id }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setform] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    email: prof.Email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  function get_sold() {
    fetch(`${import.meta.env.VITE_API_URL}sold/${prof.Email}`)
      .then((response) => response.json())
      .then((data) => {
        const item = data.find((p) => p.id === id);
        setform({ ...item, email: prof.Email }); //copy the items to the form
      });
  }

  useEffect(() => {
    get_sold();
  }, []);


  const submit = async (e) =>{

    e.preventDefault();

    if (form.title.length == 0) {
        setError("Please Fill out the title");
        return;
      } else if (form.description.length == 0) {
        setError("Please fill out the description.");
        return;
      } else if (form.price.length == 0) {
        setError("Please fill out the price.");
        return;
      } else if (form.price.length == 0) {
        setError("Please fill out the price");
        return;
      }

      const result = await fetch(`${import.meta.env.VITE_API_URL}fix/${id}`, {
        // send the form data to backend
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (result.status == 200) {
        setStep("sell");
      } else if (result.status == 500) {
        setError("Something went wrong!");
      }
  }

  return (
    <div>
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      <div className="bg-light py-5">
      <Container className="py-5">
        <Button
          className="top-0 end-0 m-3"
          onClick={() => {
            setStep("sell");
          }}
        >
          Back
        </Button>
        <Card className="shadow-sm">
          <Card.Body>
            <h3 className="text-center text-dark mb-4">Editing your phone</h3>
            <Form onSubmit={submit}>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
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
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      </div>
      <Footer/>
    </div>
  );
};

export default Edit;
