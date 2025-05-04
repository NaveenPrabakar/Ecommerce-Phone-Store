import React from "react";
import { Phones } from "../data/phone";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Footer from "./Footer";

const Home = ({ setStep, setProf, prof }) => {
  const preview = []; //only display three phones on the phone screen

  for (let i = 0; i < 6; i++) {
    //only view the preview of the shop
    preview.push(Phones[0].products[i]);
  }

  return (
    <div>
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center text-dark mb-4">
            Explore Our Latest Phones!
          </h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {preview.map((p) => (
              <Col key={p.id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={p.thumbnail}
                    alt={p.title}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{p.title}</Card.Title>
                    <Card.Text className="text-muted mb-1">
                      <strong>Price:</strong> ${p.price}
                    </Card.Text>
                    <Card.Text className="text-muted">
                      <strong>Brand:</strong> {p.brand}
                    </Card.Text>
                    <div className="mt-auto">
                      <Button variant="outline-primary" className="w-100" onClick ={() => {setStep("purchasing")}}>
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div className="bg-light py-5">
        <Container className="text-center py-4 bg-white">
          <h2 className="mb-3">Our Message To Clients</h2>
          <p className="lead">
            Phones Glore is an e-commerce platform offering the latest phone
            models. Unique to our platform, users can resell their phones
            directly to buyers, enabling economic flexibility. Our expert admin
            team actively monitors and removes potential scams for a secure
            experience.
          </p>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
