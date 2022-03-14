import buildHasuraProvider from "ra-data-hasura";
import customFields from "./customFields";
import customVariables from "./customVariables";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useSession } from "next-auth/client";
// import buildDataProvider from "../base/dataProviders/hasura-graphql-samagra";

//
// console.log(session.role);

// let tempClient = new ApolloClient({
//   uri: process.env.NEXT_PUBLIC_HASURA_URL,
//   cache: new InMemoryCache(),
//   headers: hasuraHeaders,
//   // link: restLink
// });
async function buildDataProvider() {
  const [session] = useSession();
  const hasuraHeaders = {};
  hasuraHeaders.Authorization = `Bearer ${session.jwt}`;
  if (session.role) hasuraHeaders["x-hasura-role"] = session.role;
// let tempClient = new ApolloClient({
//     uri: process.env.NEXT_PUBLIC_HASURA_URL,
//     cache: new InMemoryCache(),
//     // headers: hasuraHeaders,
//     // link: restLink
//   });
let tempClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HASURA_URL,
  cache: new InMemoryCache(),
});
const hasuraProvider = await buildHasuraProvider(
  { client: tempClient },
  {
    buildFields: customFields,
  },
  customVariables
);
console.log(hasuraProvider)
return hasuraProvider
}
export default buildDataProvider;

// export default buildDataProvider({
//   client,
//   buildQuery,
// }).then((dataProviderHasura) => ({
//   getList: (resource, params) => dataProviderHasura(GET_LIST, resource, params),
//   getOne: (resource, params) => dataProviderHasura(GET_ONE, resource, params),
//   getMany: (resource, params) => dataProviderHasura(GET_MANY, resource, params),
//   getManyReference: (resource, params) =>
//     dataProviderHasura(GET_MANY_REFERENCE, resource, params),
//   update: (resource, params) => dataProviderHasura(UPDATE, resource, params),
//   updateMany: (resource, params) =>
//     dataProviderHasura(UPDATE_MANY, resource, params),
//   create: (resource, params) => dataProviderHasura(CREATE, resource, params),
//   delete: (resource, params) => dataProviderHasura(DELETE, resource, params),

// }));
