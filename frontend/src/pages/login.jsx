// Third Party Imports.
import { Box, Button, Container, FormLabel, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { useState } from "react";
import { Link } from "wouter";

// Local Imports.
import { sendLoginDataToBackend } from "../helpers/sendLogin";
import { getSessionAction } from "../redux/actions";
import { BootstrapInput } from "../theme";

// LoginPage Component.
export default function LoginPage() {
  // Cookies instance.
  const cookies = new Cookies();

  // Form data.
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Dispatch.
  const dispatch = useDispatch();

  // Handle form data changes.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the form is valid.
    if (!formData.email || !formData.password) {
      alert("Please fill all the fields correctly.");
      return;
    }
    // Send data.
    const token = await sendLoginDataToBackend(formData);
    // Reset form data.
    setFormData({ email: "", password: "" });
    // Check if the token is valid.
    if (token) {
      // Get session.
      await dispatch(getSessionAction(token));
      // Set cookie.
      cookies.set("token", token, { path: "/" });
      // Redirect to home page without reloading the page.
      window.history.pushState(null, null, "/");
    } else {
      // Show error message.
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
