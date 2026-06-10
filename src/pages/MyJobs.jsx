import { Container, Row, Col, Card, Button } from "react-bootstrap";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaUsers,
  FaRupeeSign,
} from "react-icons/fa";

import { MdWork } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

import { Link } from "react-router-dom";

import { getMyJobs } from "../redux/jobSlice";

function MyJobs() {
  const dispatch = useDispatch();

  const { jobs, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h1 className="fw-bold">My Posted Jobs</h1>

        <p className="text-muted">Manage jobs and track applicants</p>
      </div>

      {jobs.length === 0 ? (
        <Card className="text-center p-5 border-0 shadow-sm">
          <h3>No Jobs Posted Yet</h3>

          <p className="text-muted">Create your first job posting.</p>
        </Card>
      ) : (
        <Row>
          {jobs.map((job) => (
            <Col lg={4} md={6} key={job._id} className="mb-4">
              <Card className="job-card h-100 border-0 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="job-type">
                      <MdWork /> Job
                    </span>

                    <span className="salary-tag">
                      <FaRupeeSign />
                      {job.salary}
                    </span>
                  </div>

                  <h4 className="fw-bold mb-3">{job.title}</h4>

                  <p className="text-muted">
                    {job.description?.slice(0, 80)}
                    ...
                  </p>

                  <div className="mb-2">
                    <FaBuilding className="me-2 text-primary" />
                    {job.company}
                  </div>

                  <div className="mb-3">
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    {job.location}
                  </div>

                  <div className="applicant-box mb-3">
                    <FaUsers className="me-2" />
                    Applicants: <strong>{job.applicantsCount}</strong>
                  </div>

                  <Link to={`/applicants/${job._id}`} className="d-grid">
                    <Button variant="dark" size="lg">
                      View Applicants
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default MyJobs;
//  ye recruiters ke liye hoga jisme wo dekh sakte hai ki unke job post par kitne applicants ne apply kiya hai