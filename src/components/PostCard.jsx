import { Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { ReactComponent as ExtendIcon } from "../icons/extend.svg";
import { ReactComponent as FavouriteIcon } from "../icons/favourite.svg";
import { ReactComponent as More } from "../icons/more.svg";
import { ReactComponent as ShareIcon } from "../icons/share.svg";
import { useStyles } from "../styles/PostCard";

const PostCard = ({ post, deletePost }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [viewComment, setViewComment] = useState([]);
  const [comment, setComment] = useState({
    text: "",
    id: 0,
    userId: 0,
  });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    // Ftech comments for postid
    // const getComments = JSON.parse(localStorage.getItem("comments"));
    // setViewComment(getComments);
    let commentdata = localStorage.getItem("comments");
    if (commentdata === null) {
      setViewComment([]);
    } else {
      setViewComment(JSON.stringify(commentdata));
    }
  };

  const handleInputChange = (e) => {
    console.log(comment);
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const addComment = (id, userId) => {
    // try {
    //   const values = { ...comment, userId, id };
    //   console.log(values, "------");
    //   setViewComment(values);
    //   localStorage.setItem("comments", JSON.stringify(values));
    // } catch (e) {
    //   console.log(e);
    // }

    const values = { ...comment, userId, id };
    console.log("values", values);

    localStorage.setItem("comments", JSON.stringify(values));
    const newdata = JSON.parse(localStorage.getItem("comments"));
    let copy = [...newdata, values];
    console.log(copy);
    localStorage.setItem("comments", JSON.stringify(copy));
    fetchComments();
  };

  const deleteComment = (id) => {
    console.log("delcomment", id);
    const deleteComment = viewComment.filter((comment) => comment.id !== id);
    setViewComment(deleteComment);
    console.log("del", deleteComment);
    localStorage.setItem("comments", JSON.stringify(deletePost));
  };

  const editComment = (id) => {
    const data = comment.map((x) => {
      if (x.id === id) {
        return {
          ...x,
          userID: comment.userID,
          text: "",
          id: comment.id,
        };
      }
      return x;
    });
    // setViewComment(data)
  };

  const handleExpandClick = (id) => {
    console.log(id, "----");
    setExpanded(!expanded);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton
              onClick={() => deletePost(post.id)}
              style={{ fontSize: "14px" }}
              aria-label="settings"
            >
              Delete Post
            </IconButton>
          }
          title={"name"}
          subheader={""}
        />
        <label style={{ padding: "0.7rem 1rem" }}>title:</label>
        <Typography
          style={{ padding: "0 1rem" }}
          variant="body1"
          color="textSecondary"
          component="p"
        >
          {post.title}
        </Typography>
        <CardContent>
          <label style={{ paddingBottom: "0.7rem 0" }}>Description:</label>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavouriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => handleExpandClick(post.id)}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExtendIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Comments:</Typography>

            <input
              name="text"
              placeholder="Write a comment"
              onChange={handleInputChange}
            />
            <Button onClick={() => addComment(post.id, post.userId)}>
              Post
            </Button>
          </CardContent>
          <CardContent>
            {/* {viewComment.length > 0 &&
              Viewcomment.map((comment) => {
                return (
                  <> */}
            <div>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    {/* <More /> */}
                    <button onClick={() => deleteComment(post.id)}>
                      delete comment
                    </button>
                    <button onClick={() => editComment(post.id)}>
                      edit comment
                    </button>
                  </IconButton>
                }
                title={"name"}
                // subheader={""}
              />
              <label>Comment:</label>
              <label> {viewComment.text}</label>
            </div>
            {/*                    
                  </>
                );
              })} */}
            {/* <Commemnts comments={comments} ></Commemnts>   */}
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default PostCard;
