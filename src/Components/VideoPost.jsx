import React, { useContext, useEffect, useState } from "react";
import { firebaseDB } from "../config/firebase";

import { AuthContext } from "../AuthProvider";
import './VideoPost.css';
import {
  Card,
  Button,
  makeStyles,
  Typography,
  TextField,
  Container,
} from "@material-ui/core";
import { Favorite, FavoriteBorder,VolumeUp,VolumeOff } from "@material-ui/icons";
import CommentIcon from '@material-ui/icons/Comment';

const VideoPost = (props) => {
  let [hide,setHide]=useState(true);
  let [user, setUser] = useState(null);
  let [comment, setComment] = useState("");
  let [commentList, setCommentList] = useState([]);
  let [likesCount, setLikesCount] = useState(null);
  let [isLiked, setIsLiked] = useState(false);
  let { currentUser } = useContext(AuthContext);
  let [mute,setMute]=useState(false);
  // { comment , profilePhotoUrl }

  const useStyles = makeStyles({
    videoContainerSize: {
      height: "50vw%",
    },
    post:{
        width:'45vw',
        padding:'1rem',
    },
    avatar: {
      height: '30px',
      width: '30px',
      border: '1px solid black',
      borderRadius: '50%',
      marginRight: '5px',
    }
  });
  let classes = useStyles();

  const addCommentToCommentList = async (e) => {
    let profilePic;
    if (currentUser.uid == user.userId) {
      profilePic = user.profileImageUrl;
    } else {
      let doc = await firebaseDB.collection("users").doc(currentUser.uid).get();
      let user = doc.data();
      profilePic = user.profileImageUrl;
    }
    let newCommentList = [
      ...commentList,
      {
        profilePic: profilePic,
        comment: comment,
      },
    ];

    // add comments in firebase
    let postObject = props.postObj;
    postObject.comments.push({ uid: currentUser.uid, comment: comment });
    // it will set a new post object with updated comments in firebase DB
    await firebaseDB.collection("posts").doc(postObject.pid).set(postObject);
    setCommentList(newCommentList);
    setComment("");
  };

  const toggleLikeIcon = async () => {
    if (isLiked) {
      let postDoc = props.postObj;
      let filteredLikes = postDoc.likes.filter((uid) => {
        if (uid == currentUser.uid) {
          return false;
        } else {
          return true;
        }
      });
      postDoc.likes = filteredLikes;
      await firebaseDB.collection("posts").doc(postDoc.pid).set(postDoc);
      setIsLiked(false);
      likesCount == 1 ? setLikesCount(null) : setLikesCount(likesCount - 1);
    } else {
      let postDoc = props.postObj;
      postDoc.likes.push(currentUser.uid);
      await firebaseDB.collection("posts").doc(postDoc.pid).set(postDoc);
      setIsLiked(true);
      likesCount == null ? setLikesCount(1) : setLikesCount(likesCount + 1);
    }
  };

  useEffect(async () => {
    console.log(props);
    let uid = props.postObj.uid;
    let doc = await firebaseDB.collection("users").doc(uid).get();
    let user = doc.data();
    let commentList = props.postObj.comments;
    let likes = props.postObj.likes;

    let updatedCommentList = [];

    for (let i = 0; i < commentList.length; i++) {
      let commentObj = commentList[i];
      let doc = await firebaseDB.collection("users").doc(commentObj.uid).get();
      let commentUserPic = doc.data().profileImageUrl;
      let commentUserName = doc.data().username;
      updatedCommentList.push({
        profilePic: commentUserPic,
        username:commentUserName,
        comment: commentObj.comment,
      });
    }

    if (likes.includes(currentUser.uid)) {
      setIsLiked(true);
      setLikesCount(likes.length);
    } else {
      if (likes.length) {
        setLikesCount(likes.length);
      }
    }

    console.log(updatedCommentList);
    setUser(user);
    setCommentList(updatedCommentList);
  }, []); //comp did Mount

  return (
    <Container className={classes.post}>
      <Card className="video-card" style={{height:'80vh',width:'30vw',margin:'auto'}}>
        <img className={classes.avatar}
         src={ user?user.profileImageUrl :""} />
        <Typography variant="span"><strong>{user?user.username:"" }</strong></Typography>
        <div className="video-container">
          <Video style={{height: '100%', width: '100%',objectFit:'contain'}}
            className={classes.videoContainerSize}
            src={props.postObj.videoLink}
            mute={mute}
          />
        </div>
        <div className="tools">
          {isLiked ? (
            <Favorite
              onClick={() => toggleLikeIcon()}
              style={{ color: "red" }}
            />
          ) : (
            <FavoriteBorder onClick={() => toggleLikeIcon()}></FavoriteBorder>
          )}
            <CommentIcon onClick={()=>{
                setHide(!hide);
            }}/>
            {mute? <VolumeOff onClick={()=>{setMute(false)}}/>:<VolumeUp onClick={()=>{setMute(true)}}/>}
        </div>

        {likesCount && (
          <div style={{marginBottom:'5px'}}>
            <Typography variant="p">Liked by {likesCount} others </Typography>
          </div>
        )}
        <div className={hide? "comments-div hide":" comments-div "}>
          <Typography variant="p">Comments</Typography>
          <TextField  
            variant="outlined"
            label="Add a comment"
            size="small"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={addCommentToCommentList}
          >
            Post
          </Button>
         <div className="comment-list" >

          {commentList.map((commentObj) => {
              return (
                <div className="comment">
                    <img className={classes.avatar}
                    src={commentObj.profilePic}/>
                    <strong>{commentObj.username}</strong><br/>
                    <Typography variant="p">{commentObj.comment} </Typography>
              </div>
            );
        })}
        </div>
        </div>
      </Card>
    </Container>
  );
};

let Video=(props) =>{
  let [pause,setPause] = useState(false);

  return (
    <video
        autoPlay
        loop
      style={{
        height: "100%",
        width: "100%",
      }}
      mute={props.mute}
      onClick={(e)=>{
        if(pause) e.target.play();
        else e.target.pause();
        setPause(!pause);
      }}
    >
      <source src={props.src} type="video/mp4"></source>
    </video>
  );
}

export default VideoPost;
