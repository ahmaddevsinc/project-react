import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
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