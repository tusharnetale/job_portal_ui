import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";

import { FaMapMarkerAlt } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getJobs } from "../redux/jobSlice";
import { applyJob, getMyApplications } from "../redux/applicationSlice";

import { toast } from "react-toastify";

function Jobs() {
  const dispatch = useDispatch();

  const { jobs, loading } = useSelector((state) => state.jobs);

  const { applications } = useSelector((state) => state.applications);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getJobs());

    if (user?.role === "user") {
      dispatch(getMyApplications());
    }
  }, [dispatch, user]);

  const appliedJobs = applications.map((app) => app.jobId?._id);

  const applyHandler = async (jobId) => {
    const result = await dispatch(applyJob(jobId));

    if (!result.error) {
      toast.success("Application submitted successfully 🎉");

      dispatch(getMyApplications());
    } else {
      toast.warning(result.payload || "Already Applied");
    }
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Available Jobs</h1>

        <p className="text-muted">Find your dream job and apply instantly</p>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {jobs.map((job) => (
            <Col lg={4} md={6} className="mb-4" key={job._id}>
              <Card className="h-100 shadow-sm border-0 job-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Badge bg="primary">
                      <MdWork /> Job
                    </Badge>

                    <Badge bg="success">
                      salary
                      <FaIndianRupeeSign />
                      {job.salary}
                    </Badge>
                  </div>

                  <Card.Title className="fw-bold">{job.title}</Card.Title>

                  <Card.Subtitle className="mb-3 text-muted">
                    company: {job.company}
                  </Card.Subtitle>

                  <p> Description: {job.description}</p>

                  <div className="mb-3">
                    <FaMapMarkerAlt className="text-danger me-2" />
                    {job.location}
                  </div>

                  {user?.role === "user" && (
                    <Button
                      className="w-100 btn btn-outline-dark"
                      size="lg"
                      variant={
                        appliedJobs.includes(job._id) ? "outline-success" : "outline-primary"
                      }
                      disabled={appliedJobs.includes(job._id)}
                      onClick={() => applyHandler(job._id)}
                    >
                      {appliedJobs.includes(job._id)
                        ? "✓ Already Applied"
                        : "🚀 Apply Now"}
                    </Button>
                  )}

                  {user?.role === "recruiter" && (
                    <div className="mt-3">
                      <Badge bg="dark">
                        Applicants : {job.applicantsCount}
                      </Badge>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Jobs;
//  ye users ke liye hoga jisme wo dekh sakte hai ki unke job post par kitne applicants ne apply kiya hai