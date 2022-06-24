import { useState } from "react";
import { Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { ReactComponent as More } from "../icons/more.svg";
import { ReactComponent as FavouriteIcon } from "../icons/favourite.svg";
import { ReactComponent as ShareIcon } from "../icons/share.svg";
import { ReactComponent as ExtendIcon } from "../icons/extend.svg";
import { useStyles } from "../styles/PostCard";

const PostCard = ({ post, deletePost }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

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
      </Card>
    </>
  );
};

export default PostCard;
