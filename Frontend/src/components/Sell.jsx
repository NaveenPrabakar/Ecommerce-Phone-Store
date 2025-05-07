import React from "react";
import { Phones } from "../data/phone";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Footer from "./Footer";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useEffect } from "react";
import Trash from "../assets/trash.jpg"

const Sell = ({ setStep, setProf, prof }) => {
  const [form, setform] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    email: prof.Email,
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [soldItems, setSoldItems] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  function get_sold() {
    fetch(`http://127.0.0.1:8080/sold/${prof.Email}`)
      .then((response) => response.json())
      .then((data) => {
        setSoldItems(data);
      });
    console.log(soldItems);
  }

  const handleDelete = async(id) =>{
    const result = await fetch(`http://localhost:8080/done/${id}/${prof.Email}`, {
      // send the form data to backend
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if(result.status === 200){
      const data = await result.json();
      setProf(data);
      get_sold();
      setSuccess("Item was delete!");
    }else{
      setError("Item deletion was interrupted");
    }
  }

  useEffect(() => {
    get_sold();
  }, []);

  useEffect(() => {
  }, [soldItems]);

  const submit = async (e) => {
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

    const result = await fetch("http://localhost:8080/sell", {
      // send the form data to backend
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (result.status == 200) {
      setError("");
      console.log(result);
      setSuccess("You have succesfully released your phone for purchase");

      const data = await result.json();
      console.log(data);
      setProf(data);
      get_sold();
    } else if (result.status == 500) {
      setError("Something went wrong!");
    }
  };

  return (
    <div>
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      <div className="bg-light py-5">

      <Container className="py-5">
        <Row xs={1} md={2} lg={3} className="g-4">
        {soldItems.length > 0 &&
          soldItems.map((p) => (
            <Card key={p.id}>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{p.title}</Card.Title>
                <Card.Text className="text-muted mb-1">
                  <strong>Price:</strong> ${p.price}
                </Card.Text>
                <Card.Text>
                  <strong>Description: </strong>{p.description}
                </Card.Text>

                <Button variant="danger" className="mt-2" onClick={() => handleDelete(p.id)} style = {{width: "30px", height: "30px"}}>
                  <img src={Trash} alt = "Delete"></img>
                </Button>
              </Card.Body>
            </Card>
          ))}
          </Row>
        </Container>

        <Container className="py-5">
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center text-dark mb-4">
                Sell your old phones! We'll take them!
              </h3>
              <Form onSubmit={submit}>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && (
                  <div className="alert alert-success">{success}</div>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
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
            </Card.Body>
          </Card>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default Sell;
