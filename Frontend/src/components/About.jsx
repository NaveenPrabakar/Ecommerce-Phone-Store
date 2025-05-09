import React from "react";
import { Phones } from "../data/phone";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Footer from "./Footer";

import Nav from "../assets/nav.jpg";
import Milo from "../assets/milo.jpg";

const About = ({ setStep, setProf, prof }) => {
  return (
    <div>
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center text-dark mb-4">🧠 Meet the Team! 👋</h2>

          <Row xs={1} md={2} lg={3} className="g-4">
            <Col>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={Nav}
                  alt="Naveen"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>Naveen Prabakar</Card.Title>
                  <Card.Text className="text-muted mb-1">
                    <strong>Worked on: </strong> Login/Signup , Home View, Sell
                    view, Settings
                  </Card.Text>
                  
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={Milo}
                  alt="Milo"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>Milo Mucu</Card.Title>
                  <Card.Text className="text-muted mb-1">
                    <strong>Worked on: </strong> Purchasing, Shop-Screen, Admin
                    View, Cart view
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default About;
