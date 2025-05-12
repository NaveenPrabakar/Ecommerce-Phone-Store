import React from "react";
import NavBar from "./NavBar";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Footer from "./Footer";
import { useEffect } from "react";
import { useState } from "react";
import Generic from "../assets/generic.jpg";

const Shop = ({ setStep, setProf, prof, setItem }) => {
  const addItem = (item) => {
    setItem(item);
  };

  const [permanent, setPermanent] = useState([]);
  const [added, setAdded] = useState([]);

  const getProducts = async () => {
    const result = await fetch(`http://localhost:8080/products`, {
      method: "GET",
    });

    if (result.status == 200) {
      console.log(result);
      let temp = await result.json();
      setPermanent(temp.slice(0, 16));
      setAdded(temp.slice(16));
      console.log("HERE");
    }
  };

  useEffect(() => {
    getProducts();
  }, [prof]);

  return (
    <div>
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center text-dark mb-4">Phone Shop</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {permanent.map((p) => (
              <Col key={p.id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={p.images[1]}
                    alt={p.title}
                    style={{ height: "80%", objectFit: "cover" }}
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
                      <Button
                        variant="outline-primary"
                        className="w-100"
                        onClick={() => {
                          setStep("purchasing");
                          addItem(p);
                        }}
                      >
                        Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            {added.map((p) => (
              <Col key={p.id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={Generic}
                    alt={p.title}
                    style={{ height: "65%", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>📱{p.title}</Card.Title>
                    <Card.Text className="text-muted mb-1">
                      <strong> 🏷️ Price:</strong> ${p.price}
                    </Card.Text>
                    <Card.Text className="text-muted">
                      <strong>🏢 Brand:</strong> {p.brand}
                    </Card.Text>
                    <div className="mt-auto">
                      <Button
                        variant="outline-primary"
                        className="w-100"
                        onClick={() => {
                          setStep("purchasing");
                          addItem(p);
                        }}
                      >
                        Details
                      </Button>
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

export default Shop;
