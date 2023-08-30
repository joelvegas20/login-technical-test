// Third Party Imports.
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import {
  Button,
  Container,
  AppBar,
  Avatar,
  Typography,
  Toolbar,
  Box,
  List,
  IconButton,
} from "@mui/material";

// Local Imports.
import { LinkedinIcon, GithubIcon, GmailIcon } from "../components/icons";
import { getSessionAction } from "../redux/actions";

// HomePage Component.
export default function HomePage() {
  // Get data from redux store.
  const { email, profilePicture } = useSelector((state) => state.userData);

  // Cookies instance.
  const cookies = new Cookies();

  // Dispatch.
  const dispatch = useDispatch();

  // Logout Button Handler.
  const logout = () => {
    // Remove cookie.
    cookies.remove("token");
    // Redirect to login page and reload the page.
    window.history.pushState(null, null, "/login");
    window.location.reload();
  };

  // Get session on page load.
  useEffect(() => {
    // Get data from backend with the token.
    const token = cookies.get("token");

    if (token) {
      // Get session.
      dispatch(getSessionAction(token));
    } else {
      // Redirect to login page and reload the page.
      window.history.pushState(null, null, "/login");
      window.location.reload();
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", boxShadow: "none", my: 2 }}
      >
        <Toolbar>
          <Avatar
            alt="Remy Sharp"
            src={profilePicture}
            sx={{ width: 56, height: 56, backgroundColor: "#162D3A", mr: 2 }}
          />
          <Typography
            variant="h6"
            component="div"
            color="primary"
            sx={{ flexGrow: 1, wrap: "wrap" }}
          >
            Welcome {email}
          </Typography>
          <Button
            color="primaryButton"
            variant="contained"
            href="/login"
            onClick={logout}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Logout
          </Button>

          <IconButton
            color="primaryButton"
            variant="contained"
            href="/login"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ color: "#000000" }}>
          Hi I’m Joel Vegas.
        </Typography>
        <Box height={"60vh"} width={"100%"}>
          <img
            src="/static/img/art.png"
            alt="line"
            position="absolute"
            width="100%"
            height="100%"
            content="center"
            style={{ objectFit: "cover", borderRadius: "12px" }}
          />
        </Box>
        <Typography
          variant="h2"
          sx={{
            color: "#ffffff",
            zIndex: 1,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Ssr. Full Stack Developer.
        </Typography>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <Box width={"50%"} display={"flex"} alignItems={"center"}>
            <Typography sx={{ color: "#000000" }}>
              © 2023 ALL RIGHTS RESERVED
            </Typography>
          </Box>
          <List
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: ".5rem",
            }}
          >
            <IconButton
              sx={{ width: "3rem", height: "3rem" }}
              href="https://www.linkedin.com/in/joelvegas"
              target="_blank"
            >
              <LinkedinIcon />
            </IconButton>
            <IconButton
              sx={{ width: "3rem", height: "3rem" }}
              href="https://github.com/joelvegas20"
              target="_blank"
            >
              <GithubIcon />
            </IconButton>
            <IconButton
              sx={{ width: "3rem", height: "3rem" }}
              href="mailto:joelvegas2023@gmail.com"
              target="_blank"
            >
              <GmailIcon />
            </IconButton>
          </List>
        </Box>
      </Container>
    </Container>
  );
}
