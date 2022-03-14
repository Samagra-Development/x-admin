import dataProvider2 from './hasuraDataprovider';
// import userDataProviderESamwad from '../base/dataProviders/userDataProviderESamwad'

const httpClient = (url, options = {}) => {
        if (!options.headers) {
            options.headers = new Headers({ Accept: 'application/json' });
        }
        options.headers.set('Content-Range', 'posts 0-24/319');
        return fetchUtils.fetchJson(url, options);
    }

import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    GET_MANY,
    GET_MANY_REFERENCE,
  } from 'react-admin';
  
  const dataProviders = [ 
    // {
    //   dataProvider:userDataProviderESamwad,
    //   resources: ['userESamwad'],
    // },
    {
      dataProvider: dataProvider2,
      resources: ['school','assessment'],
    },
  ];
  
  export default (type, resource, params) => {
    const dataProviderMapping = dataProviders.find((dp) =>{
        console.log(resource)
      return dp.resources.includes(resource)
    });
    
  console.log(dataProviderMapping)
    const mappingType = {
      [GET_LIST]: 'getList',
      [GET_ONE]: 'getOne',
      [GET_MANY]: 'getMany',
      [GET_MANY_REFERENCE]: 'getManyReference',
      [CREATE]: 'create',
      [UPDATE]: 'update',
      [UPDATE_MANY]: 'updateMany',
      [DELETE]: 'delete',
    };
  
    return dataProviderMapping.dataProvider[mappingType[type]](resource, params);
  };

