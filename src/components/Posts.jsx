import { red } from "@material-ui/core/colors";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CreatePosts from "./CreatePost";
import PostCard from "./PostCard";
import PostsHeader from "./PostsHeader";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      // height:"100vh",
      //  background:" linear-gradient(11deg, black, transparent)"
    },
    root: {
      maxWidth: 345,
      marginBottom: "20px",
      background: "#f3f3f38f",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardCtn: {
      display: "flex",
      justifyContent: "center",
      padding: "50px 0",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);

export default function Posts() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [post, setPost] = useState([]);


  // const handleExpandClick = (id: string) => {
  //   console.log(id, "----");
  //   // if(id === post.id)
  //   setExpanded(!expanded);
  // };
  const getPost = async () => {
    // let lockdata = localStorage.getItem("posts");
    // let dat = JSON.Parse(lockdata);
    // console.log(typeof lockdata);
    // console.log("lock", lockdata);
    // if (typeof lockdata != "undefined") {
    //   setPost(dat);
    // } else {
    //   console.log("else");
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      console.log("response", res.data);
      localStorage.setItem("posts", JSON.stringify(res.data));
    // }

    const data = JSON.parse(localStorage.getItem("posts"));

    if (data) {
      setPost(data);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const AddPosts = (userInput) => {
    // localStorage.setItem("newpost", JSON.stringify(userInput));
    // const newdata = JSON.parse(localStorage.getItem('newpost'));
    // let copy = { ...post, userInput };
    let copy = [...post];
    copy.push(userInput);
    console.log("userinp", userInput);
    // copy = [...copy, newd];
    console.log("copy", copy);
    setPost(copy);
  };

  return (
    <>
      <PostsHeader />
      <div className={classes.container}>
        <CreatePosts AddPosts={AddPosts} />

        <div className={classes.cardCtn}>
          {post.length > 0 &&
            post.map((post) => (
              <PostCard post={post} />
            
            ))}
        </div>
      </div>
    </>
  );
}
