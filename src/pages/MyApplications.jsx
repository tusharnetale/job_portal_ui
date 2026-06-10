import { Container, Row, Col, Card } from "react-bootstrap";

import { FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

import { MdWork } from "react-icons/md";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getMyApplications } from "../redux/applicationSlice";

function MyApplications() {
  const dispatch = useDispatch();

  const { applications } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Hired":
        return "status-hired";

      case "Rejected":
        return "status-rejected";

      case "Interview Scheduled":
        return "status-interview";

      default:
        return "status-applied";
    }
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h1 className="fw-bold">My Applications</h1>

        <p className="text-muted">Track your application progress</p>
      </div>

      <Row>
        {applications.map((app) => (
          <Col lg={4} md={6} key={app._id} className="mb-4">
            <Card className="application-card border-0 shadow-sm h-100">
              <Card.Body>
                <div className={`status-box ${getStatusClass(app.status)}`}>
                 Status: {app.status}
                </div>

                <h4 className="mt-3 fw-bold">{app.jobId?.title}</h4>

                <div className="mt-3">
                  <p>
                    <FaBuilding className="me-2" />
                    {app.jobId?.company}
                  </p>

                  <p>
                    <FaMapMarkerAlt className="me-2" />
                    {app.jobId?.location}
                  </p>

                  <p>
                    <MdWork className="me-2" />
                    Applied On: {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>

                {app.status === "Hired" && (
                  <div className="message hired-msg">
                    🎉 Congratulations! You have been selected.
                  </div>
                )}

                {app.status === "Interview Scheduled" && (
                  <div className="message interview-msg">
                    📅 Interview has been scheduled.
                  </div>
                )}

                {app.status === "Rejected" && (
                  <div className="message rejected-msg">
                    Unfortunately, your application was not selected.
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MyApplications;

//  ye users ke liye hoga jisme wo dekh sakte hai ki unhone kin kin jobs ke liye apply kiya hai aur unka status kya hai (applied, interview scheduled, hired, rejected) 