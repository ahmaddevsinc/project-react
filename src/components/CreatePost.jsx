import { Avatar, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const useStyles = makeStyles((theme) => ({
  createPost: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "30px",
  },
  inputPost: {
    border: "1px solid grey",
    borderRadius: "50px",
    padding: "0 50px",
    marginLeft: "20px",
    outline: "none",
    cursor: "pointer",
  },
  writeDescription: {
    borderRadius: "20px",
    padding: "0 10px",
    outline: "none",
    width: "485px",
    border: "1px solid darkgrey",
    height: "50px",
  },
  imageBtn: {
    background: "black",
    color: "white",
    "&:hover": {
      color: "black",
    },
  },
}));

const styles = (theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    createPost: {
      display: "",
    },
  });

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <button
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          {/* <CloseIcon /> */}
          close icon
        </button>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CreatePosts = ({AddPosts}) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const ids = uuid(); // Creating unique id
  let uni = ids.slice(0, 8); // Slicing unique id

  const [postInfo, setPostInfo] = useState({
    title: "",
    body: "",
    userId: 0,
    id: Number.parseInt(uni),
  });


  const handleInputChange = (e) => {
    console.log(postInfo);
    setPostInfo({
      ...postInfo,
      [e.target.name]: e.target.value,
    });
  };


  const HandelCreatePost = async (e) => {
    e.preventDefault();
    console.log("post", postInfo);
    AddPosts(postInfo)
    // array.push(postInfo)
    // const res = await axios.post(`https://jsonplaceholder.typicode.com/posts`, postInfo);
    // setPost(postInfo);
    // if(res){
    //     setPost(res.data)
    // }
    // console.log("res", res);
    handleClose();
  };

  return (
    <div>
      <Box className={classes.createPost}>
        <Avatar />
        <input
          placeholder="Whats on your mind"
          onClick={handleClickOpen}
          className={classes.inputPost}
        />
      </Box>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create a Post
        </DialogTitle>
        <form onSubmit={HandelCreatePost} action="#">
          <DialogContent dividers>
            <Typography gutterBottom>Title</Typography>
            <input
              placeholder="What's on your mind?"
              className={classes.writeDescription}
              name="title"
              value={postInfo.title}
              onChange={handleInputChange}
            />
            <Typography gutterBottom>Description</Typography>
            <input
              placeholder="What's on your mind?"
              name="body"
              className={classes.writeDescription}
              value={postInfo.body}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" autoFocus color="primary">
              Add a Post
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreatePosts;
