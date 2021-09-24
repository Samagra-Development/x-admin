import React from "react";
import {
  List,
  SimpleList,
  Datagrid,
  DateField,
  TextField,
  BooleanField,
  FunctionField,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  Filter,
  SearchInput,
  useRedirect,
  useNotify,
  FormDataConsumer,
  AutocompleteInput,
  ReferenceInput,
} from "react-admin";

import { useSession } from "next-auth/client";
import { Typography, useMediaQuery } from "@material-ui/core";
import EditNoDeleteToolbar from "../components/EditNoDeleteToolbar";
import BackButton from "../components/BackButton";
import config from "@/components/config";
import sendSMS from "@/utils/sendSMS";
import buildGupshup from "@/utils/buildGupshup";
import { useStyles } from "../styles"

/**
 * Donate Device Request List
 * @param {*} props
 */
export const SchoolList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const classes = useStyles();
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title="Schools list"
      className={isSmall ? classes.smList : classes.list}
      sort={{ field: "id", order: "DESC" }}
      exporter={false}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          linkType="edit"
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField label="UDISE" source="udise" />
          <TextField label="District" source="location.district" />
          <TextField label="Block" source="location.block" />
          <TextField label="Cluster" source="location.cluster" />
          {/* <TextField label="Name" source="name" />
          <TextField label="Type" source="type" /> */}
          <FunctionField
            label="Session"
            render={(record) => {
              const obj = config.schoolSession.find((elem) => elem.id === record.session);
              return obj?.name;
            }}
          />
        </Datagrid>
      )}
    </List>
  );
};

export const SchoolEdit = (props) => {
  const classes = useStyles();
  const notify = useNotify();
  const redirect = useRedirect();
  const [session] = useSession();

  const getTemplateFromDeliveryStatus = (status) => {
    const obj = config.statusChoices.find((elem) => elem.id === status);
    return [obj?.template, obj?.templateId, obj?.variables];
  };

  const onSuccess = async ({ data }) => {
    if (data) {
      notify(
        "ra.notification.updated",
        "info",
        { smart_count: 1 },
        props.mutationMode === "undoable"
      );
      const { delivery_status } = data;
      const [template, templateId, variables] =
        getTemplateFromDeliveryStatus(delivery_status);
      if (template && variables && session.role) {
        //get each variable (which could be a path, like "ab.cd"), and replace it with
        //the appropriate value from the data object
        let replacedVariables = variables.map((keys) =>
          //turn "ef" or "ab.cd" into ["ef"] and ["ab", "cd"] respectively
          //and then reduce that to a singular value
          keys.split(".").reduce((acc, key) => acc[key], data)
        );

        const message = buildGupshup(template, replacedVariables);
        const response = await sendSMS(message, templateId, data.phone_number);
        if (response?.success) notify(response.success, "info");
        else if (response?.error) notify(response.error, "warning");
        redirect("list", props.basePath, data.id, data);
      }
    }
  };

  const Title = ({ record }) => {
    return (
      <span>
        Edit school{" "}
        <span className={classes.grey}>#{record.udise}</span>
      </span>
    );
  };
  return (
    <div>
      <Edit
        onSuccess={onSuccess}
        mutationMode={"pessimistic"}
        title={<Title />}
        {...props}
      >
        <SimpleForm toolbar={<EditNoDeleteToolbar />}>
          <BackButton history={props.history} />
          <span className={classes.heading}>School Details</span>
          <div className={classes.grid}>
            <td>UDISE</td>
            <td>District</td>
            <td>Block</td>
            <TextField label="UDISE" locales="en-IN" source="udise" />
            <TextField label="District" source="location.district" />
            <TextField label="Block" source="location.block" />
            {/* <TextField label="Name" source="name" />
            <TextField label="Type" source="type" /> */}
          </div>
          <div className={classes.grid}>
            <td>Cluster</td>
            <td>Session</td>
            <td></td>
            <TextField label="Cluster" source="location.cluster" />
            <FunctionField
              label="Session"
              render={(record) => {
                const obj = config.schoolSession.find((elem) => elem.id === record.session);
                return obj?.name;
              }}
            />
          </div>
        </SimpleForm>
      </Edit>
    </div>
  );
};
