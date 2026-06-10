import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";

import { useNavigate, Link } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await dispatch(registerUser(formData));

    if (!result.error) {
      navigate("/login");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "550px" }}>
      <Card className="shadow p-4">
        <h3 className="text-center mb-4">Register</h3>

        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>

            <Form.Control
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>

            <Form.Select
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value,
                })
              }
            >
              <option value="user">User</option>

              <option value="recruiter">Recruiter</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="w-100">
            Register
          </Button>
        </Form>

        <p className="mt-3 text-center">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </Card>
    </Container>
  );
}

export default Register;
