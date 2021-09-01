import React, { useContext, useEffect, useState } from "react";
import { firebaseDB } from "../config/firebase";
import { AuthContext } from "../AuthProvider";
import { makeStyles } from "@material-ui/core";
import VideoPost from "./VideoPost";
const Profile = () => {
  let [posts, setPosts] = useState([]);
  let [profile, setProfile] = useState({});
  let { currentUser } = useContext(AuthContext);
  useEffect(async () => {
    let doc = await firebaseDB.collection("users").doc(currentUser.uid).get();
    let user = doc.data();
    setProfile(user);
  }, []);

  useEffect(async () => {
    let unsub = firebaseDB
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        let allPosts = snapshot.docs.map((doc) => {
          let obj = doc.data();
          if ((obj.uid = currentUser.uid)) {
            return obj;
          }
        });
        setPosts(allPosts);
      });
    return () => {
      unsub();
    };
  }, []);
  let useStyles = makeStyles({
    profileBar: {
      fontFamily: 'Dancing Script, cursive',
      display: "flex",
      alignItems: "center",
      height: "20rem",

    },
    profileImg: {
        height: "300px",
      width: "300px",
      borderRadius: "50%",
      border: "1px solid #16a085",
    },
    postContainer: {
    background:'#ecf0f1',
      width: "100vw",
      display:'flex',
      flexWrap:'wrap'
    },
  });
  let classes = useStyles();
  return (
    <>
      <div className={classes.profileBar}>
        <div style={{padding:'0 10rem'}}>
          <img className={classes.profileImg} src={profile.profileImageUrl} />
        </div>
        <div className="profile-details">
          <h1>{profile.username}</h1>
          <h1>{profile.email}</h1>
        </div>
      </div>
      <div className={classes.postContainer}>
        {console.log(posts)}
        {posts.map((postObj) => {
          return (
            <VideoPost
              key={postObj.pid}
              postObj={postObj}
              pause={true}
            ></VideoPost>
          );
        })}
      </div>
    </>
  );
};

export default Profile;
