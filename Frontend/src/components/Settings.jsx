import React from "react";
import { Phones } from "../data/phone";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Footer from "./Footer";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const Settings = ({ setStep, setProf, prof }) => {
  const [change, setChange] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (form.password.length == 0) {
      setError("Fill in the password");
      return;
    }

    if (form.password !== prof.password) {
      setError("Incorrect password");
      return;
    }

    if (change === "name" && form.name.length > 0) {
      prof.Name = form.name;

      const result = await fetch(`http://localhost:8080/change/${prof.Email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prof),
      });

      if (result.status == 200) {
        setSuccess("Name changed successfully");
        setChange("");
      } else {
        setError("Something went wrong");
      }
    } else if (change === "email" && form.email.length > 0) {
      const email = prof.Email;
      prof.Email = form.email;

      const result = await fetch(`http://localhost:8080/change/${email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prof),
      });

      if (result.status == 200) {
        setSuccess("Email changed successfully");
        setChange("");
      } else {
        setError("Something went wrong");
      }
    } else if (change === "delete" && form.password.length > 0) {
      const result = await fetch(
        `http://localhost:8080/account/${prof.Email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.status == 200) {
        setStep("login");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div>
      <NavBar setStep={setStep} setProf={setProf} prof={prof} />

      <div className="bg-light py-5">
        <Container>
          <Card className="h-100 shadow-sm border-0">
            <h2 className="text-center text-dark mb-4">👤 Profile Settings</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="mb-5">
              <strong> 🧑‍💻 Username: </strong> {prof.Name}
              <Button
                variant="primary"
                type="submit"
                onClick={() => setChange("name")}
              >
                Edit
              </Button>
              {change === "name" && (
                <Form onSubmit={submit}>
                  <Form.Group className="mb-3">
                    <Form.Label>New username</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button type="submit" variant="success">
                    💾 Save
                  </Button>
                </Form>
              )}
            </div>

            <div className="mb-5">
              <strong> 📬 Email: </strong> {prof.Email}
              <Button
                variant="primary"
                type="submit"
                onClick={() => setChange("email")}
              >
                Edit
              </Button>
              {change === "email" && (
                <Form onSubmit={submit}>
                  <Form.Group className="mb-3">
                    <Form.Label>New Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Enter email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button type="submit" variant="success">
                    💾 Save
                  </Button>
                </Form>
              )}
            </div>

            <div className="mb-5">
              <Button
                variant="danger"
                type="submit"
                onClick={() => setChange("delete")}
              >
                🗑️ Delete Account
              </Button>
              {change === "delete" && (
                <Form onSubmit={submit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button type="submit" variant="success">
                    🗑️ Delete Account
                  </Button>
                </Form>
              )}
            </div>
            <div className= "mb-5">
              <Button
                variant="primary"
                type="submit"
                onClick={() => setStep("login")}
              >
                Logout
              </Button>
            </div>
          </Card>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
