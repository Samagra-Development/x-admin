import React from "react";
import { Toolbar, SaveButton } from "react-admin";

const EditNoDeleteToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton disabled={props.pristine} />
  </Toolbar>
);

export default EditNoDeleteToolbar;
