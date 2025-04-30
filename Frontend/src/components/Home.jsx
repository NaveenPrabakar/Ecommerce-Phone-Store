import React from "react";
import { useState } from "react";
import { Phones } from "../data/phone";
import NavBar from "./NavBar"
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container } from "react-bootstrap";
import more from "../assets/image.png"
import Footer from "./Footer"

const Home = ({ setProf, prof }) => {
  const preview = []; //only display three phones on the phone screen

  for (let i = 0; i < 3; i++) { //only view the preview of the shop
    preview.push(Phones[0].products[i]);
  }

  return (
    <div>
      <NavBar />

      <div className= "bg-gray-200">
      <Container>
        <h1 className= "text-black">View our lates Phones!</h1>
        <Row xs={1} md={2} lg={3} className="g-4 d-flex flex-row align-items-stretch">
          {preview.map((p) => (
            <Col key = {p.id}>
              <div className = "hover:bg-black hover:text-white ">
              <Card>
                <Card.Img variant = "top" src={p.thumbnail}  style={{ height: "350px" }} alt={p.title}/>
                <Card.Body>
                  <Card.Title style={{ fontSize: "21px" }}> 
                    {p.title}
                  </Card.Title >
                  <Card.Text style={{ color: "#000000" }}>
                    <strong>Price: {p.price}</strong>
                  </Card.Text>
                  <Card.Text style={{ color: "#000000" }}>
                    <strong>Brand: {p.brand}</strong>
                  </Card.Text>
                  <button className = "btn-sm">
                    <img src={more} style= {{height: "100px", width: "100px"}} />
                  </button>
                </Card.Body>
              </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <hr style = {{margin: "20px"}}/>

      <Container className= "bg-gray-500">
        <h1>Our Message To Clients: </h1>
        <p style ={{fontSize: "30px"}}>
          Phones Glore is an E-commerce website that sells the latest models of phones. The unique feature being, people can sell their phones
          to the public for purchase. It offers economic freedom for purchasing phones. Phones Glore also has a top notch admin staff that will
          alert and remove potential scams.
        </p>
      </Container>
      </div>

      <Footer />
    </div>
  );
};

export default Home;