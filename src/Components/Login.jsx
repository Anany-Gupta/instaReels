import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
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

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    try {
      await login(email, password);
      props.history.push("/"); //navigate to /
    } catch (err) {
      console.log(err.message);
    }
  };

  let useStyles = makeStyles({
    centerDivs: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      width: "100vw",
    },
    carousal: { height: "30rem", backgroundColor: "lightgray" ,width:"20rem" },
    loginTemplate: { height: "33rem" ,width:"30rem" },
    fullWidth: {
      width: "100%",
    },
    centerElements: {
      display: "flex",
      flexDirection: "column",
    },
    mb: {
      marginBottom: "1rem",
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
      <Container style={{height: '100vh',display:'flex' ,alignItems:'center' }}>
        <Grid container spacing={2} style={{justifyContent:"space-around",alignItems:"center" }}>
          {/* Carousel */}
          <Grid item sm={5}>
            <Paper className={classes.carousal}>Carousel</Paper>
          </Grid>
          <Grid item className={classes.loginTemplate}>
            <Card variant="outlined" className={classes.mb}>
              <CardMedia
                image={logo}
                style={{ height: "5rem", backgroundSize: "contain" }}
              ></CardMedia>
              <CardContent className={classes.centerElements}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                  className = {classes.mb}
                ></TextField>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  size="small"
                  onChange={(e) => setPassword(e.target.value)}
                  className = {classes.mb}
                ></TextField>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  className={classes.fullWidth}
                >
                  Login
                </Button>
              </CardActions>
            </Card>
            <Card variant="outlined" className={classes.padding}>
              <Typography style={{ textAlign: "center" }}>
                Don't have an account?  <></>     
                  <Link style={{ textDecoration: "none" }} to="/signup">
                   SignUp
                  </Link>
               </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
     
    </div>
  );
};

export default Login;