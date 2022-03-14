import React, { useState, useEffect } from "react";
import {
  List,
  SimpleList,
  Datagrid,
  TextField,
  SelectInput,
  Filter,
  FunctionField,
  BooleanField,
  ListContextProvider,
  useList,
} from "react-admin";
import { useSession } from "next-auth/client";
import { useMediaQuery } from "@material-ui/core";
import config from "@/components/config";
import axios from "axios";
// import { useStyles } from "../styles";
import { useDataProvider } from "react-admin";

export const EsamwadList = (props) => {
  console.log(props);
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  // const classes = useStyles();
  const [session] = useSession();
  const [role, setRole] = useState(null);
  const [list, setList] = useState([]);
  const [ids, setIds] = useState([]);
  // const ids = []
  // const dataProvider = useDataProvider();
  useEffect(async () => {
    if (session) {
      setRole(session.role);
    }
    const options = {
      headers: {
        Authorization: "YFpyHxhW0-NoKRwQrXgCU5QIAQq8nBNhE--i5_n3pTU",
        token: session.jwt,
      },
    };
    console.log("Enterd Eswad");
  }, []);

  return (
    
    <>
      {role === "Admin" ? (
        <List
          {...props}
          bulkActionButtons={false}
          title="Esamwad list"
          // className={isSmall ? classes.smList : classes.list}
          exporter={false}
        >
          <Datagrid>
          <TextField source='firstName' />
          <TextField source='username' />
          </Datagrid>
        </List>
      ) : (
        <h2 className="text-center">Login with Admin Credentials</h2>
      )}
    </>
  );
};
