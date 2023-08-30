import { Box, Button, Container, FormLabel, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "wouter";
import { BootstrapInput } from "../theme";
import { sendLoginDataToBackend } from "../helpers/sendLogin";
import { useDispatch } from "react-redux";
import { getSessionAction } from "../redux/actions";



export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password ) {
      alert("Please fill all the fields correctly.");
      return;
    }

    // Send data.
    const token = await sendLoginDataToBackend(formData);

    setFormData({ email: "", password: "" });

    // Get session.
    if (token) {
      await dispatch(getSessionAction(token));
      // Redirect to home page without reloading the page.
      window.history.pushState(null, null, "/");
    }else {
      alert("Error, please try again");
    }

  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100vh",
      }}
      fontFamily={"Poppins"}
    >
      <Box
        sx={{
          width: "40%",
          height: "95%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          ml: { xl: 10 },
          px: { xl: 10 },
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#000000" }}
          fontFamily={"inherit"}
        >
          Here we go 👋
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#000000" }}
          fontFamily={"inherit"}
        >
          Today is a new day. It's your day. You shape it. Sign in to start
          managing your projects.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
          py={4}
        >
          <Box>
            <FormLabel sx={{ color: "#000000" }}>Email</FormLabel>
            <BootstrapInput
              placeholder="Example@gmail.com"
              fullWidth
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
            />
          </Box>
          <Box>
            <FormLabel sx={{ color: "#000000" }}>Password</FormLabel>
            <BootstrapInput
              placeholder="Password"
              fullWidth
              name="password"
              type="password"
              onChange={handleChange}
              value={formData.password}
            />
          </Box>
          <Button
            color="primaryButton"
            variant="contained"
            type="submit"
            sx={{ fontFamily: "Poppins", textTransform: "none" }}
          >
            Sign in
          </Button>
        </Box>
        <Typography sx={{ color: "#000000", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link
            href="/register"
            style={{ color: "blue", textDecoration: "none" }}
          >
            Register
          </Link>
        </Typography>
      </Box>
      <Box
        sx={{
          width: "40%",
          height: "95%",
        }}
      >
        <img
          src="/static/img/art.png"
          alt="art"
          width={"100%"}
          height={"100%"}
        />
      </Box>
    </Container>
  );
}
