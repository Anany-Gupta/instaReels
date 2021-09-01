import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";

import { firebaseDB, firebaseStorage } from "../config/firebase";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import {
  TextField,
  Grid,
  Button,
  Paper,
  Card,
  CardContent,
  CardActions,
  Container,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
 
  const { signUp } = useContext(AuthContext);

  const handleFileSubmit = (event) => {
    let fileObject = event.target.files[0];
    setProfileImage(fileObject);
  };

  const handleSignUp = async () => {
    try {
      let response = await signUp(email, password);
      let uid = response.user.uid;

      const uploadPhotoObject = firebaseStorage
        .ref(`/profilePhotos/${uid}/image.jpg`)
        .put(profileImage);
      uploadPhotoObject.on(
        "state_changed",
        null,
        (error) => {
          console.log(error);
        },
        async () => {
          let profileImageUrl =
            await uploadPhotoObject.snapshot.ref.getDownloadURL();
          firebaseDB.collection("users").doc(uid).set({
            email: email,
            userId: uid,
            username: username,
            profileImageUrl: profileImageUrl,
            postsCreated: [],
          });
          props.history.push("/");
        }
      );
    } catch (err) {
      console.log(err.message);
      setEmail("");
      setPassword("");
    }
  };
  let useStyles = makeStyles({
    centerDivs: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      width: "100vw",
    },
    carousal: { height: "30rem", backgroundColor: "lightgray", width: "20rem" },
    signinTemplate: { height: "33rem", width: "30rem" },
    fullWidth: {
      width: "100%",
    },
    centerElements: {
      display: "flex",
      flexDirection: "column",
    },
    mb: {
      marginBottom: "2rem",
    },
    mt: {
      marginTop: "2rem",
    },
    padding: {
      paddingTop: "1rem",
      paddingBottom: "1rem",
    },
    alignCenter: {
      justifyContent: "center",
    },
  });
  let classes = useStyles();

  return (
    <div>
      <Container
        style={{ height: "100vh", display: "flex", alignItems: "center" }}
      >
        <Grid
          container
          spacing={5}
          style={{ justifyContent: "space-around", alignItems: "center" }}
        >
          {/* Carousel */}
          <Grid item sm={5}>
            <Paper className={classes.carousal}>Carousel</Paper>
          </Grid>
          <Grid item className={classes.signinTemplate}>
            <Card variant="outlined" className={classes.mb}>
              <CardMedia
                image={logo}
                style={{ height: "5rem", backgroundSize: "contain" }}
              ></CardMedia>
              <CardContent className={classes.centerElements}>
                <TextField
                  label="Username"
                  type="text"
                  variant="outlined"
                  value={username}
                  size="small"
                  onChange={(e) => setUsername(e.target.value)}
                  className={classes.mb}
                ></TextField>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                  className={classes.mb}
                ></TextField>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  size="small"
                  onChange={(e) => setPassword(e.target.value)}
                  className={classes.mb}
                ></TextField>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleFileSubmit(e);
                  }}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSignUp}
                  className={classes.fullWidth}
                >
                  Sign Up
                </Button>
              </CardActions>
            </Card>
            <Card variant="outlined" className={classes.padding}>
              <Typography style={{ textAlign: "center" }}>
                Have an account?<></>
                <Link to="/login">Login</Link>
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Signup;
