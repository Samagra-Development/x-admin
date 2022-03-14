import {
  CREATE,
  DELETE,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
} from 'react-admin';
import userDataProvider from './dataProvider.package';

const config = require('../../config');

export default (c) => {
  let dataProviderOldData = userDataProvider({
    ...config.fusionAuth,
    avoidToken: false,
  });
  if (c && c.fusionAuthURL) {
    dataProviderOldData = userDataProvider({
      ...c,
      avoidToken: c.avoidToken,
    });
  }
  return {
    getList: (resource, params) =>
      dataProviderOldData(GET_LIST, resource, params),
    getOne: (resource, params) =>
      dataProviderOldData(GET_ONE, resource, params),
    getMany: (resource, params) =>
      dataProviderOldData(GET_MANY, resource, params),
    getManyReference: (resource, params) =>
      dataProviderOldData(GET_MANY_REFERENCE, resource, params),
    update: (resource, params) => dataProviderOldData(UPDATE, resource, params),
    create: (resource, params) => dataProviderOldData(CREATE, resource, params),
    delete: (resource, params) => dataProviderOldData(DELETE, resource, params),
  };
};
