import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../AuthProvider";
import logo from "../logo.png";
import { Link } from "react-router-dom";

import { firebaseDB } from "../config/firebase";
import {
  CardMedia,
  Button,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { HomeRounded ,AccountCircle, ExitToApp } from "@material-ui/icons";


const Navbar = (props) => {
  const { signOut } = useContext(AuthContext);
  
  
  const handleLogout = async () => {
    try {
      await signOut();
      props.history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
  let useStyles = makeStyles({
    logo: {
      height: "4rem",
      backgroundSize: "contain",
      width: "20%",
    },
    Nav: {
      height: "5rem",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      
    },
    tools: {
      width: "20%",
      fontSize: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      
    },
  });
 
  let classes = useStyles();
  return (
    <div className={classes.Nav}>
      <CardMedia className={classes.logo} image={logo}></CardMedia>

      <div className={classes.tools}>
        <Link to="/">
          <IconButton>
            <HomeRounded></HomeRounded>
          </IconButton>
        </Link>
        <Link to="/profile">
          <IconButton>
         <AccountCircle/>
          </IconButton>
        </Link>

        <Button
          onClick={handleLogout}
          variant="contained"
          color="default"
          startIcon={<ExitToApp />}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
<h1>Header</h1>;
