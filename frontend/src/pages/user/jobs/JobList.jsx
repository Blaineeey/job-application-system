import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, CardActionArea, Grid } from "@mui/material";
import api from "../../../api/axios";

export default function UserJobList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/jobs").then((res) => setJobs(res.data));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Available Jobs</Typography>
      <Grid container spacing={2}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
            <Card>
              <CardActionArea onClick={() => navigate(`/jobs/${job.id}`)}>
                <CardContent>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.location} | {job.type}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    ₱{parseFloat(job.salary).toLocaleString()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
