import {
  CREATE,
  DELETE,
  // DELETE_MANY,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
  // UPDATE_MANY,
} from 'react-admin';
import lb4Provider from './lb4BaseDataProvider';

// const config = require('../../config');

const dataProviderOldData = lb4Provider('http://139.59.93.172:3000');
export default {
  getList: (resource, params) => {
    console.log(params);
    return dataProviderOldData(GET_LIST, resource, params);
  },
  getOne: (resource, params) => dataProviderOldData(GET_ONE, resource, params),
  getMany: (resource, params) =>
    dataProviderOldData(GET_MANY, resource, params),
  getManyReference: (resource, params) =>
    dataProviderOldData(GET_MANY_REFERENCE, resource, params),
  update: (resource, params) => dataProviderOldData(UPDATE, resource, params),
  create: (resource, params) => dataProviderOldData(CREATE, resource, params),
  delete: (resource, params) => dataProviderOldData(DELETE, resource, params),
};
