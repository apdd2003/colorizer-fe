import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Divider, TextField } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const value = {
    email: "",
    password: "",
  };
  const [auth, setAuth] = useState(value);
  const { email, password } = auth;
  useEffect(() => {
    console.log("Hello Twinkal Raj");
  }, []);

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setAuth({ ...auth, [name]: value });
  };

  const handleSubmit = () => {
    const data = {
      email: email,
      password: password,
    };
    if (email && password) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400, padding: ".5rem" }}>
        <Typography
          color="text.secondary"
          sx={{ fontWeight: "600", textAlign: "center" }}
          variant="h6"
          component="div"
        >
          Log in
        </Typography>
        <Divider style={{ margin: ".8rem 0" }} />
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridGap: "1rem",
          }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleChange("email")}
            size="small"
            type="email"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            onChange={handleChange("password")}
            size="small"
            type="password"
          />
          <Button onClick={handleSubmit} variant="contained">
            Login
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default Login;
