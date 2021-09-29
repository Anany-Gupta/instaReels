import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import Carousal from './carousal'
import { firebaseDB, firebaseStorage } from "../config/firebase";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import { Visibility, VisibilityOff } from "@material-ui/icons";
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
  const [seePassword,setSeePassword] = useState(false);
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
          await firebaseDB.collection("users").doc(uid).set({
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
      setUsername("");
      setProfileImage(null);
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
    carousal: { height: "31rem", width: "20.9rem" },
    signinTemplate: { height: "34rem", width: "29 rem" },
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
      <Container style={{ height: "100vh", display: "flex", alignItems: "center" }}>
        <Grid
          container
          spacing={5}
          style={{ justifyContent: "space-around", alignItems: "center" }}
        >
         
          <Grid className={classes.carousal}>
            <Carousal/>
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
                <Card
                  variant="outlined"
                  size="small"
                  style={{
                   
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <TextField
                    style={{ width: "85%", height: "80%" }}
                    label="Password"
                    variant ="standard"
                    size="small"
                    type={seePassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={classes.mb}
                  ></TextField>
                  {seePassword ? (
                    <Visibility
                      onClick={() => {
                        setSeePassword(!seePassword);
                      }}
                    />
                  ) : (
                    <VisibilityOff
                      onClick={() => {
                        setSeePassword(!seePassword);
                      }}
                    />
                  )}
                </Card>
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
