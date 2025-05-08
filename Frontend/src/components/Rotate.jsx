import React from "react";
import { Phones } from "../data/phone";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container, Carousel,  Button } from "react-bootstrap";
import Footer from "./Footer";

const Rotate = ({ setStep, setProf, prof, setId, id }) => {

    console.log(id);

    const preview = Phones[0].products.find((phone) => phone.id === id);
    const images = preview.images; //array of images

    return(
        <div>
            <NavBar setStep={setStep} setProf={setProf} prof={prof} />
            <div className="bg-light py-5">
                <Container>
                    <Button className= "top-0 end-0 m-3" onClick ={() => {setStep("home")}}>
                        Back
                    </Button>
                    <Card>
                        <Card.Title>
                            {preview.title}
                        </Card.Title>

                        <Card.Text>
                            {preview.description}
                        </Card.Text>

                        <Carousel className= "my-4">
                            {images.map( (img, i) => (
                                <Carousel.Item key={i}>
                                    <img className= "d-block w-100" src={img} />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Card>
                </Container>
            </div>
            <Footer/>
        </div>
    )

}


export default Rotate;