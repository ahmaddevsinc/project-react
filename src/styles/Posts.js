import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
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
}));
