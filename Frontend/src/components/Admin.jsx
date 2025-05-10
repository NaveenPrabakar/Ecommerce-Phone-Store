import React from "react";
import { Phones } from "../data/phone";
import NavBar from "./NavBar";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Footer from "./Footer";

const Admin = ({ setStep, setProf, prof, setItem }) => {

  const addItem = (item) => {
    setItem(item);
  };

  
  return (
    <div>
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center text-dark mb-4">
            Phone Shop
          </h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {Phones[0].products.map((p) => (
              <Col key={p.id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={p.images[1]}
                    alt={p.title}
                    style={{ height: "80%", objectFit: "cover"}}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>📱{p.title}</Card.Title>
                    <Card.Text className="text-muted mb-1">
                      <strong> 🏷️ Price:</strong> ${p.price}
                    </Card.Text>
                    <Card.Text className="text-muted mb-1">
                      <strong>📣 Sale:</strong> {p.discountPercentage}% Off
                    </Card.Text>
                    <Card.Text className="text-muted">
                      <strong>🏢 Brand:</strong> {p.brand}
                    </Card.Text>
                    <div className="mt-auto">
                      <Button variant="outline-primary" className="w-100" onClick ={() => {setStep("purchasing"); addItem(p)}}>
                        Details
                      </Button>
                      <div className="mt-3">
                      <Button variant="outline-primary" className="w-100 btn-hover-red" onClick ={() => {setStep("purchasing"); addItem(p)}}>
                        Remove
                      </Button>
                      <Button variant="outline-primary" className="w-100 btn-hover-red" onClick ={() => {setStep("purchasing"); addItem(p)}}>
                        Verify
                      </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>


      <Footer />
    </div>
  );
};

export default Admin;

