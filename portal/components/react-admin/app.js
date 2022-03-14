import { useState, useEffect } from "react";
import { AdminContext, AdminUI, Resource, combineDataProviders,Admin } from "react-admin";
import buildHasuraProvider, { buildFields } from "ra-data-hasura";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useSession } from "next-auth/client";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import customTheme from "./theme";
import customLayout from "./layout";
import customFields from "./customHasura/customFields";
import customVariables from "./customHasura/customVariables";
import { resourceConfig } from "./layout/config";
import simpleRestProvider from "ra-data-simple-rest";
import { createHashHistory } from 'history';
// import dP from './customHasura/DP';
import dP from './customHasura/dataProvider';
// import dP from './base/dataProviders';

import { EsamwadList } from "@/components/react-admin/base/resources/esamwad";
import {
  SchoolEdit,
  SchoolList,
} from "./base/resources/schools";

// import dataProvider2 from './customHasura/hasuraDataprovider';
// const dataProvidersimple = simpleRestProvider('https://reqres.in/api');

//   const dataProvider = combineDataProviders((resource) => {
//     switch (resource) {
//         case 'assessment':
//             return dataProvider2;
//         case 'school':
//             return dataProvider2;
//         // case 'users':
//         //     return dataProvidersimple;
//         default:
//             throw new Error(`Unknown resource: ${resource}`);
//     }
// });

const App = () => {
  const [dataProvider, setDataProvider] = useState(null);
  const [apolloClient, setApolloClient] = useState(null);
  const [session] = useSession();
  
  useEffect(() => {
    // dP.then((dataProvider) => {
    //   console.log(dataProvider)
    //   this.setState({ dataProvider });
    // });
    const hasuraHeaders = {};
    hasuraHeaders.Authorization = `Bearer ${session.jwt}`;
    if (session.role) hasuraHeaders["x-hasura-role"] = session.role;
    console.log(session.role);

    let tempClient = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_HASURA_URL,
      cache: new InMemoryCache(),
      headers: hasuraHeaders,
      // link: restLink
    });

    // setDataProvider(() => hasuraProvider);
    // async function buildDataProvider() {
    //   const hasuraProvider = await buildHasuraProvider(
    //     { client: tempClient },
    //     {
    //       buildFields: customFields,
    //     },
    //     customVariables
    //   );
    //  
      setApolloClient(tempClient);
    // }
    // buildDataProvider();
  }, [session]);
  // if (!dataProvider || !apolloClient) return null;



  // return (
    // <AdminContext dataProvider={dP}>
    //   <AsyncResources client={apolloClient} />
    // </AdminContext> 
  // );
// };
// function AsyncResources({ client }) {
  // console.log("-",client.cache?.data?.data?.ROOT_QUERY?.__schema.types);
  // let introspectionResultObjects =
  //   client.cache?.data?.data?.ROOT_QUERY?.__schema.types
  //     ?.filter((obj) => obj.kind === "OBJECT")
  //     ?.map((elem) => elem.name);
  // const resources = resourceConfig;
  // console.log("introspectionResultObjects:", resources);
  // let filteredResources = [];
  // if (introspectionResultObjects) {
  //   filteredResources = resources.filter((elem) =>{
  //     console.log(elem)
  //     // if (elem.children){
  //     //   let childEle = elem.children.filter((child)=>   introspectionResultObjects.includes(child.name))
  //     //   return childEle
  //     // }
  //     return introspectionResultObjects.includes(elem.name)
  //   }
    // );
    // console.log("res",filteredResources);
  // }
  // resources.forEach((elem) => {
  //   if (elem.children?.length) {
  //     filteredResources = [...filteredResources, ...elem.children];
  //   } else {
  //     filteredResources.push(elem);
  //   }
  // });
  // if (!resources) return null;
  // console.log(filteredResources);
  const history = createHashHistory();

  

  return (
    <MuiThemeProvider theme={createMuiTheme(customTheme)}>
      {/* <AdminUI disableTelemetry loginPage={false} layout={customLayout}>  
      {filteredResources.map((resource) => (
          <Resource
            key={resource.name}
            name={resource.name}
            list={resource.list}
            edit={resource.edit}
            create={resource.create}
            options={{ formUrl: resource.formUrl ? resource.formUrl : "" }}
          />
        ))} */}
       {/* <Resource
          name="users"
          list={EsamwadList}
         dataProvider={simpleRestProvider('https://reqres.in/api/')}
        />
      </AdminUI>  */}
      <Admin dataProvider={dP} layout={customLayout} history={history}>
      {/* {filteredResources.map((resource) => (
          <Resource
            key={resource.name}
            name={resource.name}
            list={resource.list}
            edit={resource.edit}
            create={resource.create}
            options={{ formUrl: resource.formUrl ? resource.formUrl : "" }}
          />
        ))}  */}
        {/* <Resource name="userESamwad" list={EsamwadList} /> */}
        <Resource name="school" list={SchoolList} />
        <Resource name="assessment" list={SchoolList} />

    </Admin>  
    
    </MuiThemeProvider>
  );
}

export default App;
