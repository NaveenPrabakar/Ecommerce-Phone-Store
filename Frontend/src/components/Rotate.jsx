import React from "react";
import { Phones } from "../data/phone";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container, Carousel, Button } from "react-bootstrap";
import Footer from "./Footer";

const Rotate = ({ setStep, setProf, prof, setId, id }) => {
  console.log(id);

  const preview = Phones[0].products.find((phone) => phone.id === id);
  const images = preview.images; //array of images

  const reviews = preview.reviews; 

  const num_stars = (num) =>{

    let stars= "";

    for(let i = 0; i < num; i++){
        stars += "★";
    }

    return stars;
  }

  return (
    <div>
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />
      <div className="bg-light py-5"> 
        <Container>
          <Button
            className="top-0 end-0 m-3" onClick={() => {setStep("home");}}>
            ⬅️ Back
          </Button>
          <Card>
            <Card.Title>{preview.title}</Card.Title>

            <Card.Text>{preview.description}</Card.Text>

            <Row>
              <Col md={7}>
                <Carousel className="my-4 bg-dark p-3 rounded">
                  {images.map((img, i) => (
                    <Carousel.Item key={i}>
                      <img className="d-block w-100" src={img} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>

              <Col md= {5}> 
                 <h5 className="mb-3">
                    Reviews
                 </h5>
                 {reviews.map((r, j) => (
                    <Card key={j} className="mb-3">
                        <Card.Body>
                            <Card.Title className= "mb-2">
                                {r.reviewerName}
                            </Card.Title>

                            <Card.Subtitle className= "mb-2">
                                {num_stars(r.rating)}
                            </Card.Subtitle>

                            <Card.Text>
                                {r.comment}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                  ))}
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Rotate;
