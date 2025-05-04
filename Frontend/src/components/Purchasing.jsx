import React from "react";
import NavBar from "./NavBar";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Footer from "./Footer";

const Purchasing = ({ setStep, setProf, prof, setCart, cart, addItem }) => {
  const addToCart = (item) => {
    cart.push(item);
    setCart(cart);
  };

  return (
    <div>
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />
      <div>
        <Container>
          <Card className="h-100 shadow-sm border-0">
            <div className="d-flex">
              <Card.Img
                variant="top"
                src={addItem.images[1]}
                alt={addItem.title}
                className="w-50"
                style={{ height: "1000px", width: "300px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{addItem.title}</Card.Title>
                <Card.Text className="text-muted mb-1">
                  <strong>Price:</strong> ${addItem.price}
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  <strong>Sale:</strong> {addItem.discountPercentage}% Off
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  <strong>Brand:</strong> {addItem.brand}
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  <strong>Stock:</strong> {addItem.stock}
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  <strong>Warranty:</strong> {addItem.warrantyInformation}
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  <strong>Shipping:</strong> {addItem.shippingInformation}
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  <strong>Availability:</strong> {addItem.availabilityStatus}
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  <strong>Returns:</strong> {addItem.returnPolicy}
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  <strong>Reviews:</strong>
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  <strong>{addItem.reviews[0].reviewerName}:</strong>{" "}
                  {addItem.reviews[0].rating} Stars
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  {addItem.reviews[0].comment}
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  <strong>{addItem.reviews[1].reviewerName}:</strong>{" "}
                  {addItem.reviews[1].rating} Stars
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  {addItem.reviews[1].comment}
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  <strong>{addItem.reviews[2].reviewerName}:</strong>{" "}
                  {addItem.reviews[2].rating} Stars
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  {addItem.reviews[2].comment}
                </Card.Text>
                <Card.Text className="text-muted mb-1">
                  <strong>Description:</strong> {addItem.description}
                </Card.Text>
                <div className="mt-20">
                  <Button
                    variant="outline-primary"
                    className="w-100"
                    onClick={() => {
                      addToCart(addItem);
                      console.log(cart);
                      setStep("shop");
                    }}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    variant="outline-primary"
                    className="w-100"
                    onClick={() => {
                      setStep("shop");
                    }}
                  >
                    Back To Shop
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

export default Purchasing;
