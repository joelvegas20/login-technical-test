import { Box, Button, Container, FormLabel, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { BootstrapInput } from "../theme";
import { sendRegisterDataToBackend } from "../helpers/sendRegister";
import { getSessionAction } from "../redux/actions";

import { useDispatch } from "react-redux";

export default function RegisterPage() {
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
    // prepare data as FormData object, and send it to the backend.
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("profilePicture", formData.profilePicture);

    const token = await sendRegisterDataToBackend(formDataToSend);

    // Reset form data.
    setFormData({ email: "", password: "", profilePicture: null });

    // Automatically login after register
    if (token) {
      dispatch(getSessionAction(token));
      // Redirect to home page without reloading the page.
      window.history.pushState(null, null, "/");
    } else {
      alert("Error, please try again");
    }
  };

  // Hidden file input element
  const hiddenFileInput = useRef(null);

  // Programatically click the hidden file input element
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  // Call a function (passed as a prop from the parent component)
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
          sx={
            {
              // backgroundColor: "primary.main",
            }
          }
          display="flex"
          flexDirection="column"
          gap={2}
          py={4}
          // backgroundColor="primary.main"
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
              style={{ display: "none" }} // Make the file input element invisible
            />
          </Box>
          {/* No button mayus */}
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
          Don't have an account?{" "}
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
