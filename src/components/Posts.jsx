import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CreatePosts from "./CreatePost";
import PostCard from "./PostCard";
import PostsHeader from "./PostsHeader";
import { useStyles } from "../styles/Posts";

export default function Posts() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [post, setPost] = useState([]);

  // const [viewComment, setViewComment] = useState<comment[] | []>([]);
  // const [comment, setComment] = useState<comment>({
  //   name: "",
  //   text: "",
  //   userId: 0,
  //   postId: 0,
  // });

  // const handleInputChange = (e: any) => {
  //   console.log(comment);
  //   setComment({
  //     ...comment,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleExpandClick = (id: string) => {
  //   console.log(id, "----");
  //   // if(id === post.id)
  //   setExpanded(!expanded);
  // };
  const getPost = async () => {
    let lockdata = localStorage.getItem("posts");
    if (lockdata === null) {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      console.log("response", res.data);
      localStorage.setItem("posts", JSON.stringify(res.data));
      getPost();
    } else {
      setPost(JSON.parse(localStorage.getItem("posts")));
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const AddPosts = (userInput) => {
    const newdata = JSON.parse(localStorage.getItem("posts"));
    let copy = [...newdata, userInput];
    console.log(copy);
    localStorage.setItem("posts", JSON.stringify(copy));
    getPost();
  };

  const deletePost = (postid) => {
    console.log("postid", postid);
    // console.log("del", id);
    const deletePost = post.filter((task) => task.id !== postid);
    setPost(deletePost);
    console.log("del", deletePost);
    localStorage.setItem("posts", JSON.stringify(deletePost));
  };

  const editPost = (id) => {
    const myData = post.map((x) => {
      if (x.id === id) {
        return {
          ...x,
          title: "",
          body: "",
          id: post.id,
        };
      }
      return x;
    });
  };

  return (
    <>
      <PostsHeader />
      <div className={classes.container}>
        <CreatePosts post={post} AddPosts={AddPosts} />

        <div className={classes.cardCtn}>
          {post.length > 0 &&
            post.map((post) => (
              <PostCard post={post} deletePost={deletePost} />
              // <Card className={classes.root}>
              //   <CardHeader
              //     avatar={
              //       <Avatar aria-label="recipe" className={classes.avatar}>
              //         R
              //       </Avatar>
              //     }
              //     action={
              //       <IconButton aria-label="settings">
              //         <MoreVertIcon />
              //       </IconButton>
              //     }
              // title={post?.user?.name}
              // subheader={post.createdAt}
              //   />
              //   <CardMedia
              //     className={classes.media}
              //     image={imageBaseUrl + post.imageUrl}
              //     // title="Paella dish"
              //   />
              //   <CardContent>
              //     <Typography
              //       variant="body2"
              //       color="textSecondary"
              //       component="p"
              //     >
              //       {post.description}
              //     </Typography>
              //   </CardContent>
              //   <CardActions disableSpacing>
              //     <IconButton aria-label="add to favorites">
              //       <FavoriteIcon />
              //     </IconButton>
              //     <IconButton aria-label="share">
              //       <ShareIcon />
              //     </IconButton>
              //     <IconButton
              //       className={clsx(classes.expand, {
              //         [classes.expandOpen]: expanded,
              //       })}
              //       onClick={() => handleExpandClick(post.id)}
              //       aria-expanded={expanded}
              //       aria-label="show more"
              //     >
              //       <ExpandMoreIcon />
              //     </IconButton>
              //   </CardActions>
              //   <Collapse in={expanded} timeout="auto" unmountOnExit>
              //     <CardContent>
              //       <Typography paragraph>Comments:</Typography>

              //       <input
              //         name="text"
              //         placeholder="Write a comment"
              //         onChange={handleInputChange}
              //       />
              //       <Button
              //         onClick={() =>
              //           handleSubmit(post.id, post.userId, post.user?.name)
              //         }
              //       >
              //         Post
              //       </Button>
              //     </CardContent>
              //     <CardContent>
              //       {viewComment.length > 0 &&
              //         viewComment.map((comment) => {
              //           return (
              //             <>
              //               {/* {JSON.stringify(comment?.user_comments)} ---- */}
              //               <div
              //                 style={{
              //                   display: "flex",
              //                   flexDirection: "column",
              //                 }}
              //               >
              //                 <label>Name:</label>
              //                 <label> {comment?.user_comments?.name}</label>
              //               </div>
              //               <div
              //                 style={{
              //                   display: "flex",
              //                   flexDirection: "column",
              //                 }}
              //               >
              //                 <label>Comment:</label>
              //                 <label> {comment.text}</label>
              //               </div>
              //             </>
              //           );
              //         })}
              //       {/* <Commemnts postId={post.id} ></Commemnts>  */}
              //     </CardContent>
              //   </Collapse>
              // </Card>
            ))}
        </div>
      </div>
    </>
  );
}
