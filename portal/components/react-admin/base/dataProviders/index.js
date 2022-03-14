import hasuraDataProvider from './hasuraDataProvider';
// import hasuraDataProvider from '../../customHasura/hasuraDataprovider';
import jsonServerDataProvider from './jsonServerDataProvider';
import userDataProviderESamwad from './userDataProviderESamwad';


const config = require('./config');

export default hasuraDataProvider.then((hDP) => {
  const dataProviderResources = {
    userESamwad: userDataProviderESamwad,
    default: hDP,
    roles: jsonServerDataProvider(config.fusionAuth.authServerBasePath),
    resources: jsonServerDataProvider(config.fusionAuth.authServerBasePath),
    permissions: jsonServerDataProvider(config.fusionAuth.authServerBasePath),
    'permission-sets': jsonServerDataProvider(
      process.env.REACT_APP_AUTH_SERVER_URL
    ),
   
  };
  if (!dataProviderResources.default) {
    console.error('!! IMPORTANT !! Default config needed for data provider');
  }
  const methodDefinations = [
    'getList',
    'getOne',
    'getMany',
    'getManyReference',
    'update',
    'updateMany',
    'create',
    'delete',
    'deleteMany',
  ];
  const methods = {};
  methodDefinations.forEach((methodDefinition) => {
    methods[methodDefinition] = (resource, params) =>
      (dataProviderResources[resource] || dataProviderResources.default)[
        methodDefinition
      ](resource, params);
  });
  return methods;
});
