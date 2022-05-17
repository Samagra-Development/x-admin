import React from "react";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.primary.main,
    padding: "0 0 1rem 0",
  },
}));

const BackButton = ({ history }) => {
  const classes = useStyles();
  return (
    <Button
      variant="overline"
      className={classes.button}
      startIcon={<ArrowBackIosIcon />}
      onClick={() => {
        history.goBack();
      }}
    >
      Back
    </Button>
  );
};

BackButton.propTypes = {
  history: PropTypes.any,
};

export default BackButton;
