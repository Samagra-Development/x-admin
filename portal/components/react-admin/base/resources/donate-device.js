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
import { Typography, makeStyles, useMediaQuery } from "@material-ui/core";
import EditNoDeleteToolbar from "../components/EditNoDeleteToolbar";
import BackButton from "../components/BackButton";
import blueGrey from "@material-ui/core/colors/blueGrey";
import config from "@/components/config";
import sendSMS from "@/utils/sendSMS";
import buildGupshup from "@/utils/buildGupshup";

const useStyles = makeStyles((theme) => ({
  searchBar: {
    "& > div": {
      fontSize: "1rem",
    },
  },
  smSearchBar: {
    "& > div": {
      fontSize: "1.2rem",
    },
  },
  smList: {
    margin: "1rem 4rem",
    "& > div": {
      paddingLeft: 0,
      backgroundColor: "unset",
      "&:first-child > div": {
        backgroundColor: "unset",
      },
      "&:last-child > div": {
        backgroundColor: "#FFF",
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      },
    },
  },
  list: {
    margin: "0rem 2rem",
  },
  filter: {
    paddingLeft: 0,
  },
  grid: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridRowGap: "1ch",
    gridColumnGap: "1ch",
    margin: "1rem 0",
    "& > td": theme.overrides.MuiTableCell.head,
    "& > span": {
      fontSize: "1.1rem",
    },
  },
  fullWidthGrid: {
    gridTemplateColumns: "1fr",
    margin: "0 auto",
  },
  heading: {
    fontSize: "1.4rem",
    lineHeight: "0.5rem",
    fontWeight: 700,
    fontVariant: "all-small-caps",
  },
  select: {
    width: "30vw",
    alignSelf: "center",
    "& > div > div": {
      fontSize: "1.1rem",
      transform: "translate(12px 21px)",
    },
  },
  filterSelect: {
    width: "15vw",
    alignSelf: "center",
    "& > label": {
      opacity: "0.7",
      fontSize: "1.1rem",
    },
    "& > div": {
      transform: "translate(0 5px)",
    },
    " .MuiInputLabel-shrink": {
      transform: "translate(12px, 7px) scale(0.75)",
    },
  },
  textInput: {
    "& > label": {
      fontSize: "1.1rem",
    },
  },
  selectInput: {
    minWidth: "unset",
    "& > label": {
      fontSize: "1.1rem",
    },
    "& > div > div": {
      maxHeight: "1.1rem",
    },
  },
  warning: {
    margin: "0",
    padding: "0",
    paddingBottom: "1rem",
    textAlign: "center",
    width: "100%",
    fontStyle: "oblique",
  },
  fullWidth: {
    width: "100%",
  },
  grey: {
    color: blueGrey[300],
  },
}));

const getChoice = (choices, id) => {
  return choices?.find((elem) => elem.id === id);
};

const DevicesFilter = (props) => {
  const classes = useStyles();
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Filter {...props} className={classes.filter}>
      <SearchInput
        placeholder="Tracking ID"
        source="device_tracking_key"
        className={isSmall ? classes.smSearchBar : classes.searchBar}
        alwaysOn
      />
      <SelectInput
        label="Delivery Type"
        source="delivery_mode"
        className={classes.filterSelect}
        choices={config.deliveryTypeChoices.filter((elem) => elem.filterable)}
      />
      <SelectInput
        label="Delivery Status"
        source="delivery_status"
        className={classes.filterSelect}
        choices={config.statusChoices}
      />
      <ReferenceInput
        reference="location"
        source="block"
        filterToQuery={(searchText) => ({ block: searchText })}
        filter={{ distinct_on: "block" }}
        sort={{ field: "block", order: "ASC" }}
      >
        <AutocompleteInput
          optionValue="block"
          optionText="block"
          className={classes.filterSelect}
        />
      </ReferenceInput>
    </Filter>
  );
};

/**
 * Donate Device Request List
 * @param {*} props
 */
export const DonateDeviceRequestList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const classes = useStyles();
  return (
    <List
      {...props}
      bulkActionButtons={false}
      title="Donors list"
      className={isSmall ? classes.smList : classes.list}
      sort={{ field: "id", order: "DESC" }}
      filters={<DevicesFilter />}
    >
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.district}
          tertiaryText={(record) => record.device_tracking_key}
          linkType="edit"
        />
      ) : (
        <Datagrid rowClick="edit">
          <DateField label="Date" locales="en-IN" source="created_at" />
          <TextField label="Name" source="name" />
          <TextField label="Phone Number" source="phone_number" />
          <TextField label="State/UT" source="state_ut" />
          <FunctionField
            label="District"
            render={(record) => {
              if (record) {
                return record.district !== "OTHER"
                  ? record.district
                  : record.other_district;
              }
            }}
          />
          <TextField label="Block" source="block" />
          <TextField label="Tracking ID" source="device_tracking_key" />
          <FunctionField
            label="Delivery Mode"
            render={(record) =>
              record.delivery_mode
                ? getChoice(config?.deliveryTypeChoices, record.delivery_mode)
                    ?.name
                : getChoice(
                    config?.deliveryTypeChoices,
                    record.delivery_mode_outside_HP
                  )?.name
            }
          />
          <FunctionField
            label="Delivery Staus"
            render={(record) =>
              getChoice(config?.statusChoices, record.delivery_status)?.name
            }
          />
        </Datagrid>
      )}
    </List>
  );
};

export const DonateDeviceRequestEdit = (props) => {
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
        Edit donor{" "}
        <span className={classes.grey}>#{record.device_tracking_key}</span>
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
          <span className={classes.heading}>Donor Details</span>
          <div className={classes.grid}>
            <td>Name</td>
            <td>Phone Number</td>
            <td>District</td>
            <TextField label="Name" source="name" disabled variant="outlined" />
            <TextField
              label="Phone Number"
              source="phone_number"
              disabled
              variant="outlined"
            />
            <FunctionField
              label="District"
              render={(record) => {
                if (record) {
                  return record.district
                    ? record.district
                    : record.other_district;
                }
              }}
              disabled
              variant="outlined"
            />
            <td>Address</td>
            <td>Pincode</td>
            <td>Delivery</td>
            <TextField
              label="Address"
              source="address"
              disabled
              variant="outlined"
            />
            <TextField
              label="Pincode"
              source="pincode"
              disabled
              variant="outlined"
            />
            <FunctionField
              label="Delivery"
              render={(record) => {
                if (record) {
                  return record.district
                    ? getChoice(
                        config.deliveryTypeChoices,
                        record.delivery_mode
                      )?.name
                    : getChoice(
                        config.deliveryTypeChoices,
                        record.delivery_mode_outside_HP
                      )?.name;
                }
              }}
              disabled
              variant="outlined"
            />
          </div>
          <span className={classes.heading}>Device Details</span>
          <div className={classes.grid}>
            <td>Company</td>
            <td>Model</td>
            <td>Screen Size</td>
            <TextField label="Device Company" source="device_company" />
            <FunctionField
              label="Device Model"
              render={(record) => {
                if (record) {
                  return record.device_model
                    ? record.device_model
                    : record.device_other_model;
                }
              }}
            />
            <TextField label="Device Size" source="device_size" />
            <td>Condition</td>
            <td>Age (Years)</td>
            <td>WhatsApp Function</td>

            <TextField label="Device Condition" source="device_condition" />
            <TextField label="Device Age" source="device_age" />
            <BooleanField source="wa_function" />
            <td>Call Function</td>
            <td>YouTube Function</td>
            <td>Charger Avbl</td>
            <BooleanField source="call_function" />
            <BooleanField source="yt_function" />
            <BooleanField source="charger_available" />
          </div>
          <span className={classes.heading}>Update Status</span>
          <div className={`${classes.grid} ${classes.fullWidthGrid}`}>
            <SelectInput
              source="delivery_status"
              choices={config.statusChoices}
              label="Delivery Status"
              disabled={!(session.role || session.applicationId === process.env.NEXT_PUBLIC_FUSIONAUTH_SCHOOL_APP_ID)}
            />
            <FormDataConsumer>
              {({ formData, ...rest }) =>
                formData?.delivery_status === "delivered-child" ? (
                  <>
                    <h2 className={classes.heading}>Recipient</h2>
                    <div className={!session.role ? classes.grid : null}>
                      <ReferenceInput
                        reference="school"
                        label="School"
                        source="recipient_school_id"
                        className={classes.fullWidth}
                        filterToQuery={(searchText) => ({
                          "name@_ilike": searchText,
                        })}
                      >
                        <AutocompleteInput
                          optionValue="id"
                          optionText="name"
                          disabled={!session.role}
                          {...rest}
                        />
                      </ReferenceInput>
                      {!session.role ? (
                        <>
                          <TextInput
                            label="Name"
                            className={classes.textInput}
                            source="recipient_name"
                          />
                          <SelectInput
                            label="Grade"
                            choices={config.gradeChoices}
                            className={classes.selectInput}
                            source="recipient_grade"
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )
              }
            </FormDataConsumer>
          </div>
          <p className={classes.warning}>
            Changing status will trigger an SMS notification to the donor upon
            saving.
          </p>
        </SimpleForm>
      </Edit>
    </div>
  );
};
