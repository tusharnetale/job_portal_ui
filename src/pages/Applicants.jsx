import { Container, Card, Row, Col, Badge, Form } from "react-bootstrap";

import { FaUserTie } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import {
  getApplicants,
  updateApplicationStatus,
} from "../redux/applicationSlice";

function Applicants() {
  const { jobId } = useParams();
  const dispatch = useDispatch();

  const { applicants } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(getApplicants(jobId));
  }, [dispatch, jobId]);

  const getBadge = (status) => {
    switch (status) {
      case "Hired":
        return "success";

      case "Rejected":
        return "danger";

      case "Interview Scheduled":
        return "warning";

      default:
        return "info";
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Applicants ({applicants.length})</h2>

      <Row>
        {applicants.map((applicant) => (
          <Col md={6} lg={4} key={applicant._id} className="mb-4">
            <Card className="shadow border-0 h-100">
              <Card.Body>
                <div className="text-center mb-3">
                  <FaUserTie size={50} className="text-primary" />
                </div>

                <h5 className="text-center">{applicant.name}</h5>

                <p className="text-center text-muted">{applicant.email}</p>

                <div className="text-center mb-3">
                  <Badge bg={getBadge(applicant.status)}>
                    {applicant.status}
                  </Badge>
                </div>

                <p className="small text-muted text-center">
                  Applied On:
                  <br />
                  {new Date(applicant.appliedAt).toLocaleDateString()}
                </p>

                <Form.Group>
                  <Form.Label>Update Status</Form.Label>

                  <Form.Select
                    value={applicant.status}
                    onChange={(e) =>
                      dispatch(
                        updateApplicationStatus({
                          applicationId: applicant._id,
                          status: e.target.value,
                        }),
                      )
                    }
                  >
                    <option value="Applied">Applied</option>

                    <option value="Interview Scheduled">
                      Interview Scheduled
                    </option>

                    <option value="Hired">Hired</option>

                    <option value="Rejected">Rejected</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Applicants;
//  ye recruiters ke liye hoga jisme wo dekh sakte hai ki unke job post par kitne applicants ne apply kiya hai