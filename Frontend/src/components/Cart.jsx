import React from "react";
import NavBar from "./NavBar";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Footer from "./Footer";

const Cart = ({ setStep, setProf, prof, cart, setCart }) => {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * (1 - cart[i].discountPercentage / 100);
  }

  const removeItem = (item) => {
    let newCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (i != cart.indexOf(item)) {
        newCart.push(cart[i]);
      }
    }
    setCart(newCart);
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
                          removeItem(c);
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
              setCart([]);
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
