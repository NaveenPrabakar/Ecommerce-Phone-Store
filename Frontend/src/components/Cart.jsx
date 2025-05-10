import React from "react";
import NavBar from "./NavBar";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Footer from "./Footer";
import { useEffect } from "react";
import { useState } from "react";

const Cart = ({ setStep, setProf, prof }) => {
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    console.log(prof);
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
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * (1 - cart[i].discountPercentage / 100);
  }

  const removeCartItem = async (item) => {
    console.log(prof);
    const result = await fetch(
      `http://localhost:8080/removeitem/${prof.Email}/${item.id}`,
      {
        method: "DELETE",
      }
    );

    if (result.status == 200) {
      console.log(result);
      const data = await result.json();
      console.log(data);
      setProf(data);
    } 
  };

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

  if (cart.length == 0) {
    return (
      <div>
        <NavBar setStep={setStep} setProf={setProf} prof={prof} />

        <div className="bg-light py-5">
          <Container>
            <h2 className="text-center text-dark mb-4">No Items In Cart</h2>
            <Button
              variant="outline-primary"
              className="w-100"
              onClick={() => {
                setStep("shop");
              }}
            >
              Return To Shop
            </Button>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center text-dark mb-4">Cart</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {cart.map((c) => (
              <Col key={c.id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{c.title}</Card.Title>
                    <Card.Text className="text-muted mb-1">
                      <strong>Price:</strong> ${c.price}
                    </Card.Text>
                    <Card.Text className="text-muted mb-1">
                      <strong>Sale:</strong> {c.discountPercentage}% Off
                    </Card.Text>
                    <div className="mt-auto">
                      <Button
                        variant="outline-primary"
                        className="w-100"
                        onClick={() => {
                          removeCartItem(c);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Card.Text className="text-muted mt-5">
            <strong>Total:</strong> ${total.toFixed(2)}
          </Card.Text>
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() => {
              setStep("login");
              removeAll();
            }}
          >
            Confirm Payment
          </Button>
        </Container>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
