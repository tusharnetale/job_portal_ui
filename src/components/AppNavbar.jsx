import { Navbar, Container, Nav, Button } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../redux/authSlice";

function AppNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Job Portal
        </Navbar.Brand>

        <Nav className="ms-auto">
          {!user && (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>

              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}

          {user && (
            <>
              <Nav.Link as={Link} to="/jobs">
                Jobs
              </Nav.Link>

              {user.role === "recruiter" && (
                <Nav.Link as={Link} to="/create-job">
                  Create Job
                </Nav.Link>
              )}

              {user.role === "user" && (
                <Nav.Link as={Link} to="/my-applications">
                  My Applications
                </Nav.Link>
              )}

              {user?.role === "recruiter" && (
                <Nav.Link as={Link} to="/my-jobs">
                  My Jobs
                </Nav.Link>
              )}

              <Button variant="danger" size="sm" onClick={logoutHandler}>
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
