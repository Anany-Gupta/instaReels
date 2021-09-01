import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../AuthProvider";
import logo from "../logo.png";
import { Link } from "react-router-dom";

import { firebaseDB } from "../config/firebase";
import { CardMedia, Button, IconButton, makeStyles } from "@material-ui/core";
import { HomeRounded, ExitToApp } from "@material-ui/icons";

const Navbar = (props) => {
  let [profilePic, setProfilePic] = useState(null);
  const { signOut, currentUser } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      let doc = await firebaseDB.collection("users").doc(currentUser.uid).get();
      let user = doc.data();
      setProfilePic(user.profileImageUrl);
    })();
  }, [currentUser]);
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
          <img
            style={{
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              margin: "5px",
            }}
            src={profilePic}
            alt=""
          />
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
