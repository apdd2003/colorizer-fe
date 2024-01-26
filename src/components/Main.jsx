import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { TextField } from "@mui/material";
import axios from "axios";

const ButtonAppBar = ({ handleChoolseFile }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Colorize Image
          </Typography>
          <Button onClick={handleChoolseFile} color="inherit">
            Upload Image
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const Main = () => {
  const [uploadFile, setUploadFile] = useState(false);
  const [displayImage, setDisplayImage] = useState("");
  const [fileValue, setFileValue] = useState(null);
  const [generatedImg, setGeneratedImg] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleColorize = () => {
    axios.get('/api/color_output/'+fileValue.name, {  headers: {
      'Content-Type': 'application/json'
    }
    })
    .then(function (response) {

      setGeneratedImg(response.data.data)
    })
    .catch(function (error) {
      console.log("Line>>>> "+error.response.data.message);
      // setErrorMessage(error.response.data.message)
    });
  };
  const handleChoolseFile = () => {
    setUploadFile(!uploadFile);
  };

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    setFileValue(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform actions with the selected file (e.g., upload, process, etc.)
    if (fileValue) {
      console.log("Selected file:", fileValue);
      const data = new FormData();
      data.append('file', fileValue);
      data.append('filename', fileValue.name)
      // Display the selected image on the page
      const imageUrl = URL.createObjectURL(fileValue);
      // Now `imageUrl` can be used as the source for an <img> element
      axios.post('/api',data, {  headers: {
        'Content-Type': 'multipart/form-data'
      }
      })
      .then(function (response) {
        console.log("Line 77>>> ",response);
        setErrorMessage(null)
      })
      .catch(function (error) {
        console.log("Line>>>> 80 "+error.response.data.message);
        setErrorMessage(error.response.data.message)
      });

      // Example: Set imageUrl to the state or use it directly in the render
      setDisplayImage(imageUrl);
    } else {
      console.log("No file selected");
    }
  };

  console.log("Line 91", fileValue, displayImage);

  return (
    <React.Fragment>
      <ButtonAppBar handleChoolseFile={handleChoolseFile} />
      <Box
        style={{ width: "100vw", display: "flex", justifyContent: "center" }}
      >
        {uploadFile && (
          <Box sx={{ margin: "1rem", display: "flex", alignItems: "center" }}>
            <TextField
              sx={{ marginRight: ".5rem" }}
              type="file"
              id="outlined-basic"
              variant="outlined"
              onChange={handleChange}
            />
            {fileValue !== null && (
              <Button variant="contained" onClick={handleSubmit}>
                Submit 
              </Button>
            
            )
           
              }
             
              
          </Box>
        )}
      </Box>

      {displayImage && (
        <React.Fragment>
          <Box
            style={{
              width: "100%",
              display: "grid",
              justifyItems: "center",
              gridTemplateColumns: "auto auto",
              gridGap: "1rem",
            }}
          >
            <Box style={{ width: generatedImg ? "100%" : "50%" }}>
              <img style={{ width: "100%" }} src={displayImage} />
            </Box>
            <Box style={{ width: generatedImg ? "100%" : "50%" }}>
              {generatedImg &&<img style={{ width: "100%" }} src={`data:image/jpeg;base64,${generatedImg}`} />}
            </Box>
          </Box>
       
        </React.Fragment>
      )}
      {displayImage && !errorMessage && <Button variant="contained" onClick={handleColorize}>
          Colorize
              </Button>}<span> Image may get resized to conserve CPU processing</span>
        <div style={{fontWeight:900,fontSize:'2rem'}}>
        {errorMessage}
        </div>
    </React.Fragment>
  );
};

export default Main;
