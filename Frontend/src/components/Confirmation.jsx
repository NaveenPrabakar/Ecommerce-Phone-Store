import React from "react";
import NavBar from "./NavBar";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Footer from "./Footer";
import { useEffect } from "react";
import { useState } from "react";
import Generic from "../assets/generic.jpg";

const Confirmation = ({ setStep, setProf, prof }) => {
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    const result = await fetch(`http://localhost:8080/getcart/${prof.Email}`, {
      method: "GET",
    });

    if (result.status == 200) {
      console.log(result);
      setCart(await result.json());
    }
  };

  useEffect(() => {
    getCart();
  }, [prof]);

  let total = 0;
  for (let item of cart) {
    let discount = item.discountPercentage || 0;
    total += item.price * (1 - discount / 100);
  }

  const removeAll = async (item) => {
    console.log(prof);
    const result = await fetch(
      `http://localhost:8080/removeall/${prof.Email}`,
      {
        method: "DELETE",
      }
    );

    if (result.status == 200) {
      console.log(result);
    }
  };

  return (
    <div>
      <div>
        <Container>
          <Card className="h-100 shadow-sm border-0">
            <div className="d-flex">
              <Card.Img
                variant="top"
                src={Generic}
                alt={"Phones"}
                className="w-50"
                style={{
                  height: "700px",
                  width: "300px",
                  objectFit: "cover",
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-2">Purchase Successful!</Card.Title>
                <Card.Title className="mt-5 fs-4">Purchased Items:</Card.Title>
                {cart.map((c) => (
                  <Col key={c.id}>
                    <Card className="shadow-sm border-0 mt-1">
                      <Card.Body className="d-flex flex-column">
                        <Card.Text>
                          <strong>{c.title}</strong>: $
                          {(
                            c.price *
                            (1 - (c.discountPercentage || 0) / 100)
                          ).toFixed(2)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
                <Card.Text className="mt-4 fs-5"><strong>Total</strong>: ${total.toFixed(2)}</Card.Text>
                <div className="mt-10">
                  <Button
                    variant="outline-primary"
                    className="w-100"
                    onClick={() => {
                      removeAll();
                      setStep("shop");
                    }}
                  >
                    Return to Shop
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="w-100"
                    onClick={() => {
                      removeAll();
                      setStep("login");
                    }}
                  >
                    Log Out
                  </Button>
                </div>
              </Card.Body>
            </div>
          </Card>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Confirmation;
