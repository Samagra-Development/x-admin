import React from "react";
import { Toolbar, SaveButton } from "react-admin";
import PropTypes from "prop-types";

const EditNoDeleteToolbar = ({ pristine }) => (
  <Toolbar>
    <SaveButton disabled={pristine} />
  </Toolbar>
);

EditNoDeleteToolbar.propTypes = {
  pristine: PropTypes.bool,
};

export default EditNoDeleteToolbar;
