import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../AuthProvider";
import logo from "../logo.png";

import { firebaseDB, firebaseStorage, timeStamp } from "../config/firebase";
import { CardMedia, Button, IconButton, makeStyles } from "@material-ui/core";
import {
  HomeRounded,
  AccountCircle,
  ExitToApp,
  PhotoCamera,
} from "@material-ui/icons";
import CommentIcon from "@material-ui/icons/Comment";

const Navbar = (props) => {
  const { signOut,currentUser  } = useContext(AuthContext);
 

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
      position:'sticky',
    },
    tools: {
      width: "20%",
      fontSize: "1rem",
    },
  });
  let classes = useStyles();
  return (
    <div className={classes.Nav}>
      <CardMedia className={classes.logo} image={logo}></CardMedia>
      
      <div className={classes.tools}>
        <IconButton>
          <HomeRounded />
        </IconButton>
        <IconButton>
          <AccountCircle />
        </IconButton>

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
