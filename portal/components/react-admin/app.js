import React, { useState, useEffect } from "react";
import { AdminContext, AdminUI, Resource, useDataProvider } from "react-admin";
import buildHasuraProvider, { buildFields } from "ra-data-hasura";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useSession } from "next-auth/client";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import customTheme from "./theme";
import customLayout from "./layout/";
import customFields from "./customHasura/customFields";
import customVariables from "./customHasura/customVariables";
import { resourceConfig } from "./layout/config";
import PropTypes from "prop-types";

const App = () => {
  const [dataProvider, setDataProvider] = useState(null);
  const [apolloClient, setApolloClient] = useState(null);
  const [session] = useSession();

  useEffect(() => {
    // console.log("ENtered app.js",process.env.NEXT_PUBLIC_HASURA_URL)
    const hasuraHeaders = {};
    hasuraHeaders.Authorization = `Bearer ${session.jwt}`;
    if (session.role) hasuraHeaders["x-hasura-role"] = session.role;

    let tempClient = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_HASURA_URL,
      cache: new InMemoryCache(),
      headers: hasuraHeaders,
    });
    // console.log("temp Client:", tempClient)
    async function buildDataProvider() {
      const hasuraProvider = await buildHasuraProvider(
        { client: tempClient },
        {
          buildFields: customFields,
        },
        customVariables
      );
      setDataProvider(() => hasuraProvider);
      setApolloClient(tempClient);
    }
    buildDataProvider();
  }, [session]);

  if (!dataProvider || !apolloClient) return null;
  return (
    <AdminContext dataProvider={dataProvider}>
      <AsyncResources client={apolloClient} />
    </AdminContext>
  );
};
function AsyncResources({ client }) {
  console.log("Async");
  let introspectionResultObjects =
    client.cache?.data?.data?.ROOT_QUERY?.__schema.types
      ?.filter((obj) => obj.kind === "OBJECT")
      ?.map((elem) => elem.name);
  const resources = resourceConfig;
  let filteredResources = resources;
  if (introspectionResultObjects) {
    filteredResources = resources.filter((elem) =>
      introspectionResultObjects.includes(elem.name)
    );
    console.log("introspectionResultObjects", filteredResources);
  }
  if (!resources) return null;
  return (
    <MuiThemeProvider theme={createMuiTheme(customTheme)}>
      <AdminUI disableTelemetry loginPage={false} layout={customLayout}>
        {filteredResources.map((resource) => (
          <Resource
            key={resource.name}
            name={resource.name}
            list={resource.list}
            edit={resource.edit}
            create={resource.create}
            show={resource.show}
          />
        ))}
      </AdminUI>
    </MuiThemeProvider>
  );
}

AsyncResources.propTypes = {
  client: PropTypes.object,
};

export default App;
