// import {
//   CREATE,
//   DELETE,
//   DELETE_MANY,
//   GET_LIST,
//   GET_MANY,
//   GET_MANY_REFERENCE,
//   GET_ONE,
//   UPDATE,
//   UPDATE_MANY,
// } from 'react-admin';
import dataProvider from 'ra-data-json-server';

// const config = require('../../config');
export default (url) => dataProvider(url);

// export default {
//   getList: (resource, params) =>
//     dataProviderOldData(GET_LIST, resource, params),
//   getOne: (resource, params) => dataProviderOldData(GET_ONE, resource, params),
//   getMany: (resource, params) =>
//     dataProviderOldData(GET_MANY, resource, params),
//   getManyReference: (resource, params) =>
//     dataProviderOldData(GET_MANY_REFERENCE, resource, params),
//   update: (resource, params) => dataProviderOldData(UPDATE, resource, params),
//   create: (resource, params) => dataProviderOldData(CREATE, resource, params),
//   delete: (resource, params) => dataProviderOldData(DELETE, resource, params),
// };
