import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { Button } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { firebaseDB, firebaseStorage, timeStamp } from "../config/firebase";
import { uuid } from "uuidv4";
import VideoPost from "./VideoPost";
const Feeds = (props) => {
  const [videoFile, setVideoFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [uploadVideoError, setUploadVideoError] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleInputFile = (e) => {
    let file = e.target.files[0];
    setVideoFile(file);
  };
  const handleUploadFile = async () => {
    try {
      if (videoFile.size / 1000000 > 50) {
        setUploadVideoError("Selected File Exceeds 50MB cannot upload !");
        return;
      }

      // upload video in firebase storage
      let uid = currentUser.uid;
      const uploadVideoObject = firebaseStorage
        .ref(`/profilePhotos/${uid}/${Date.now()}.mp4`)
        .put(videoFile);
      uploadVideoObject.on("state_changed", progressFunction, errorFunction, resultFunction);
      function progressFunction(snapshot) {
        // bytes transferred
        // totoal bytes
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }
      // if indicates a error !!
      function errorFunction(error) {
        console.log(error);
      }
      // it indicates success of the upload !!
      async function resultFunction() {
        let videoUrl = await uploadVideoObject.snapshot.ref.getDownloadURL();
        
        let pid = uuid(); // unique id
        await firebaseDB.collection("posts").doc(pid).set({
          pid: pid,
          uid: uid,
          comments: [],
          likes: [],
          videoLink: videoUrl,
          createdAt: timeStamp(),
        });
        let doc = await firebaseDB.collection("users").doc(uid).get();
        let document = doc.data();
        document.postsCreated.push(pid);
        await firebaseDB.collection("users").doc(uid).set(document);
        setUploadVideoError("");
        setVideoFile(null);

      }
    } catch (err) {}
  };

  
  function cb(entries) {
    entries.forEach((entry) => {
      let child = entry.target.children[0];

      child.play().then(function () {
        if (entry.isIntersecting === false) {
          child.pause();
        }
      });
    });
  }
  
  useEffect(() => {
    // code which will run when the component loads
    let conditionObject = {
      root: null, //observe from whole page
      threshold: "0.8", //80%
    };
    let observerObject = new IntersectionObserver(cb, conditionObject);
    let elements = document.querySelectorAll(".video-container");

    elements.forEach((el) => {
      observerObject.observe(el); //Intersection Observer starts observing each video element
    });
  }, [posts]);

  useEffect(() => {
    //GET ALL THE POSTS

    //onSnapshot => listens for changes on the collection
    firebaseDB
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        let allPosts = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setPosts(allPosts);
      });
  }, []); //component did mount !!

  return (
    <div style={{position:"relative",background:'#ecf0f1'}}>
      
      <div style={{position:'fixed',top:'15vh',right:'1rem',display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',flexDirection:'column'}}>
          <input type="file" onChange={handleInputFile} />
          <label>
            <Button
              onClick={handleUploadFile}
              variant="contained"
              color="secondary"
              startIcon={<PhotoCamera></PhotoCamera>}
            >
              Upload
            </Button>
          </label>
        </div>
        <p>{uploadVideoError}</p>
      </div>
      <div className="feeds-video-list" style={{ margin: "auto" }}>
        {/* {console.log(posts)} */}
        {
        posts.map((postObj) => {
          return <VideoPost key={postObj.pid} postObj={postObj} pause={false}></VideoPost>;
        })}
      </div>
    </div>
  );
};

export default Feeds;