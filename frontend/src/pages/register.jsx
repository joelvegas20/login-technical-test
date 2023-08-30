// Third Party Imports.
import { Box, Button, Container, FormLabel, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import Cookies from "universal-cookie";
import { Link } from "wouter";

// Local Imports.
import { sendRegisterDataToBackend } from "../helpers/sendRegister";
import { getSessionAction } from "../redux/actions";
import { BootstrapInput } from "../theme";

// RegisterPage Component.
export default function RegisterPage() {
  // Cookies instance.
  const cookies = new Cookies();
  // Dispatch.
  const dispatch = useDispatch();
  // Form data.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    profilePicture: null,
  });

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
    // Validate form data.
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.password.length < 8
    ) {
      alert("Please fill all the fields correctly.");
      return;
    }
    // Prepare data to send.
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("profilePicture", formData.profilePicture);

    // Send data.
    const token = await sendRegisterDataToBackend(formDataToSend);

    // Reset form data.
    setFormData({ email: "", password: "", profilePicture: null });

    // Automatically login after register
    if (token) {
      // Set cookie.
      cookies.set("token", token, { path: "/" });

      // Get session.
      await dispatch(getSessionAction(token));

      // Redirect to home page without reloading the page.
      window.history.pushState(null, null, "/");
    } else {
      // Show error message.
      alert("Error, please try again");
    }
  };

  // Hidden file input element.
  const hiddenFileInput = useRef(null);

  // Handle click on button to open file input.
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  // Handle file input change.
  const handleChangeFile = (event) => {
    const fileUploaded = event.target.files[0];
    if (!fileUploaded) {
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: fileUploaded,
    }));
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
          Welcome 👋  
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#000000" }}
          fontFamily={"inherit"}
        >
          We're glad you've decided to register with us. This registration will
          grant you access to all the features of our platform.
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
              name="email"
              value={formData.email}
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box>
            <FormLabel sx={{ color: "#000000" }}>Password</FormLabel>
            <BootstrapInput
              placeholder="At least 8 characters"
              name="password"
              value={formData.password}
              fullWidth
              onChange={handleChange}
            />
          </Box>
          <Box>
            <FormLabel sx={{ color: "#000000" }}>Profile Picture</FormLabel>

            <Button
              className="button-upload"
              color="primaryButton"
              variant="outlined"
              onClick={handleClick}
              fullWidth
              sx={{
                fontFamily: "Poppins",
                textTransform: "none",
                textAlign: "left",
              }}
            >
              Insert your profile picture...
            </Button>
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleChangeFile}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </Box>
          <Button
            color="primaryButton"
            variant="contained"
            type="submit"
            sx={{ fontFamily: "Poppins", textTransform: "none", mt: 4 }}
          >
            Register
          </Button>
        </Box>
        <Typography sx={{ color: "#000000", textAlign: "center" }}>
          Do you have an account?{" "}
          <Link href="/login" style={{ color: "blue", textDecoration: "none" }}>
            Sign in
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
