import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createJob } from "../redux/jobSlice";

import { toast } from "react-toastify";

function CreateJob() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.company ||
      !formData.location ||
      !formData.salary
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const result = await dispatch(createJob(formData));

    if (!result.error) {
      toast.success("Job created successfully 🎉");

      setFormData({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
      });
    } else {
      toast.error("Failed to create job");
    }
  };

  return (
    <Container
      className="py-5"
      style={{
        maxWidth: "850px",
      }}
    >
      <Card className="shadow-lg border-0 create-job-card">
        <Card.Body className="p-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Create New Job</h2>

            <p className="text-muted">
              Post a new job and start receiving applications
            </p>
          </div>

          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaBriefcase className="me-2" />
                    Job Title
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Frontend Developer"
                    value={formData.title}
                    onChange={changeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaBuilding className="me-2" />
                    Company
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="company"
                    placeholder="Google"
                    value={formData.company}
                    onChange={changeHandler}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Job Description</Form.Label>

              <Form.Control
                as="textarea"
                rows={5}
                name="description"
                placeholder="Enter job description..."
                value={formData.description}
                onChange={changeHandler}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaMapMarkerAlt className="me-2" />
                    Location
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="location"
                    placeholder="Mumbai"
                    value={formData.location}
                    onChange={changeHandler}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaMoneyBillWave className="me-2" />
                    Salary
                  </Form.Label>

                  <Form.Control
                    type="number"
                    name="salary"
                    placeholder="50000"
                    value={formData.salary}
                    onChange={changeHandler}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid mt-4">
              <Button type="submit" size="lg">
                Create Job
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateJob;
