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
  ChipField,
} from "react-admin";

import { useSession } from "next-auth/client";
import { Typography, useMediaQuery, Chip} from "@material-ui/core";
import EditNoDeleteToolbar from "../components/EditNoDeleteToolbar";
import BackButton from "../components/BackButton";
import config from "@/components/config";
import sendSMS from "@/utils/sendSMS";
import buildGupshup from "@/utils/buildGupshup";
import { useStyles } from "../styles"

const getChoice = (choices, id) => {
  return choices?.find((elem) => elem.id === id);
};

const DevicesFilter = (props) => {
  const classes = useStyles();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Filter {...props} className={classes.filter}>
      <SelectInput
        label="Mode of employement"
        source="employment"
        className={classes.filterSelect}
        choices={config.modeOfEmployment}
      />
      <SelectInput
        label="Account Status"
        source="account_status"
        className={classes.filterSelect}
        choices={config.statusChoices}
      />
      <SelectInput
        label="Job Cadre"
        source="cadre"
        className={classes.filterSelect}
        choices={config.jobCadre}
      />
    </Filter>
  );
};

/**
 * Donate Device Request List
 * @param {*} props
 */
export const TeacherList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const classes = useStyles();

  const ColoredChipField = props => {
    let data = config.statusChoices.find((elem) => elem.id === props.record[props.source]);
    return (<Chip style={{backgroundColor:data?.color,color:'#FFF'}} label={data?.name} />);
  };

  return (
    <List
      {...props}
      bulkActionButtons={false}
      title="Employees list"
      className={isSmall ? classes.smList : classes.list}
      filters={<DevicesFilter  />}
      exporter={false}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.user?.username}
          secondaryText={(record) => record.user?.first_name}
          tertiaryText={(record) => record.account_status}
          linkType="edit"
        />
      ) : (
        <Datagrid rowClick="edit">
          <TextField label="Username" source="user.username" sortable={false} />
          <TextField label="Employee Name" source="user.first_name" sortable={false} />
          <TextField label="Contact Number" source="user.mobile_phone" sortable={false} />
          <TextField label="Mode of employement" source="employment" />
          <TextField label="Designation" source="designation" />
          <ColoredChipField label="Account Status" source="account_status" />
        </Datagrid>
      )}
    </List>
  );
};

export const TeacherEdit = (props) => {
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
      const { account_status } = data;
      const [template, templateId] =
        getTemplateFromDeliveryStatus(account_status);
      if (template && session.role) {
        //get each variable (which could be a path, like "ab.cd"), and replace it with
        //the appropriate value from the data object
        const response = await sendSMS(template, templateId, data.user.mobile_phone);
        if (response?.success) notify(response.success, "info");
        else if (response?.error) notify(response.error, "warning");
        redirect("list", props.basePath, data.id, data);
      }
    }
  };

  const Title = ({ record }) => {
    return (
      <span>
        Edit Employee{" "}
        <span className={classes.grey}> {record.user?.username}</span>
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
          <span className={classes.heading}>Employee Details</span>
          <div className={classes.grid}>
            <td>Username</td>
            <td>Employee Name</td>
            <td>Contact Number</td>
            <TextField label="Username" source="user.username" />
            <TextField label="Employee Name" source="user.first_name" />
            <TextField label="Contact Number" source="user.mobile_phone" />
          </div>
          <div className={classes.grid}>
            <td>Mode of employement</td>
            <td>Designation</td>
            <td>Job Cadre</td>
            <TextField label="Mode of employement" source="employment" />
            <TextField label="Designation" source="designation" />
            <TextField label="Job Cadre" source="cadre" />
          </div>

          <span className={classes.heading}>Update Status</span>
          <div className={`${classes.grid}`}>
            {/* <SelectInput
              source="delivery_status"
              label="Grades Taught"
            />
            <SelectInput
              source="delivery_status"
              label="Subjects Taught"
            /> */}
            <SelectInput
              source="account_status"
              label="Account Status"
              choices={config.statusChoices}
            />
          </div>
          <p className={classes.warning}>
            Changing status will trigger an SMS notification to the teacher upon
            saving.
          </p>
        </SimpleForm>
      </Edit>
    </div>
  );
};
