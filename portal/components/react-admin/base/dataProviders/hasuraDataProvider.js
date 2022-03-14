/* eslint-disable no-useless-catch */
import {
  CREATE,
  DELETE,
  DELETE_MANY,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
  UPDATE_MANY,
  // HttpError,
} from 'react-admin';
import ApolloClient from 'apollo-boost';
// import {ApolloClient, InMemoryCache} from '@apollo/client';

import * as gqlTypes from 'graphql-ast-types-browser';
import buildDataProvider from './hasura-graphql-samagra';
import { buildQueryFactory } from './hasura-graphql-samagra/buildQuery';
import buildVariables from './hasura-graphql-samagra/buildVariables';
import {
  buildGqlQuery,
  buildFields,
  buildMetaArgs,
  buildArgs,
  buildApolloArgs,
} from './hasura-graphql-samagra/buildGqlQuery';
import getResponseParser from './hasura-graphql-samagra/getResponseParser';

// const config = require('../../config');

// dependency injection
console.log("Entered");
const headers = {
  'content-type': 'application/json',
  'x-hasura-admin-secret': 'samarthDBHasuraPW5678',
};

// const headers = {};
//     headers.Authorization = `Bearer `;
//     headers["x-hasura-role"] = 'Admin';

export const buildFieldsCustom = (type) => {
  const res = buildFields(type);
  if (type.name === 'school') {
    console.log(type.name)
    // here we add additional fields we want to query for apps.
    // we are using the graphql-ast-types functions which is ast representation for graphql
    res.push(
      gqlTypes.field(
        gqlTypes.name('location'),
        null,
        null,
        null,
        gqlTypes.selectionSet([
          gqlTypes.field(gqlTypes.name('district')),
          gqlTypes.field(gqlTypes.name('block')),
          gqlTypes.field(gqlTypes.name('cluster')),
          gqlTypes.field(gqlTypes.name('id')),
        ])
      ),
      gqlTypes.field(
        gqlTypes.name('school_grades'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('grade_id'))])
      )
    );
  } else if (type.name === 'grade_assessment') {
    res.push(
      gqlTypes.field(
        gqlTypes.name('assessment'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('type'))])
      ),
      gqlTypes.field(
        gqlTypes.name('school'),
        null,
        null,
        null,
        gqlTypes.selectionSet([
          gqlTypes.field(gqlTypes.name('udise')),
          gqlTypes.field(gqlTypes.name('name')),
        ])
      ),
      gqlTypes.field(
        gqlTypes.name('stream'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('tag'))])
      )
    );
  } else if (type.name === 'question_submission') {
    res.push(
      gqlTypes.field(
        gqlTypes.name('grade'),
        null,
        null,
        null,
        gqlTypes.selectionSet([
          gqlTypes.field(gqlTypes.name('number')),
          gqlTypes.field(gqlTypes.name('section')),
        ])
      ),
      gqlTypes.field(
        gqlTypes.name('assessment'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('type'))])
      ),
      gqlTypes.field(
        gqlTypes.name('school'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('udise'))])
      )
    );
  } else if (type.name === 'student') {
    res.push(
      gqlTypes.field(
        gqlTypes.name('school'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('udise'))])
      )
    );
  } 
  else if (type.name === 'assessment') {
    res.push(
      gqlTypes.field(
        gqlTypes.name('assessment_grades'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('grade_id'))])
      ),
      gqlTypes.field(
        gqlTypes.name('deadline'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('acad_year'))])
      )
    );
  } else if (type.name === 'lo') {
    res.push(
      gqlTypes.field(
        gqlTypes.name('lo_assessments'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('assessment_id'))])
      ),
      gqlTypes.field(
        gqlTypes.name('subject'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('name'))])
      )
    );
  } else if (type.name === 'stream') {
    res.push(
      gqlTypes.field(
        gqlTypes.name('stream_common_subjects'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('stream_id'))])
      )
    );
  } else if (type.name === 'question') {
    res.push(
      gqlTypes.field(
        gqlTypes.name('question_assessments'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('assessment_id'))])
      ),
      gqlTypes.field(
        gqlTypes.name('lo'),
        null,
        null,
        null,
        gqlTypes.selectionSet([
          gqlTypes.field(gqlTypes.name('grade_number')),
          gqlTypes.field(
            gqlTypes.name('subject'),
            null,
            null,
            null,
            gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('id'))])
          ),
        ])
      )
    );
  } else if (type.name === 'student_submission') {
    res.push(
      gqlTypes.field(
        gqlTypes.name('subject'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('name'))])
      ),
      gqlTypes.field(
        gqlTypes.name('student'),
        null,
        null,
        null,
        gqlTypes.selectionSet([
          gqlTypes.field(
            gqlTypes.name('school'),
            null,
            null,
            null,
            gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('name'))])
          ),
        ])
      )
    );
  } else if (type.name === 'lo_submission') {
    res.push(
      gqlTypes.field(
        gqlTypes.name('school'),
        null,
        null,
        null,
        gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('udise'))])
      ),
      gqlTypes.field(
        gqlTypes.name('grade'),
        null,
        null,
        null,
        gqlTypes.selectionSet([
          gqlTypes.field(
            gqlTypes.name('stream'),
            null,
            null,
            null,
            gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('tag'))])
          ),
        ])
      )
    );
  } else {
    console.log("entered log");
  }
  return res;
};
const buildGqlQueryCustom = (iR) =>
  buildGqlQuery(
    iR,
    buildFieldsCustom,
    buildMetaArgs,
    buildArgs,
    buildApolloArgs
  );
const buildQuery = buildQueryFactory(
  buildVariables,
  buildGqlQueryCustom,
  getResponseParser
);

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HASURA_URL,
  headers,
});
// let client = new ApolloClient({
//   uri: process.env.NEXT_PUBLIC_HASURA_URL,
//   cache: new InMemoryCache(),
//   headers: headers,
//   // link: restLink
// });

export default buildDataProvider({
  client,
  buildQuery,
}).then((dataProviderHasura) => ({
  getList: (resource, params) => dataProviderHasura(GET_LIST, resource, params),
  getOne: (resource, params) => dataProviderHasura(GET_ONE, resource, params),
  getMany: (resource, params) => dataProviderHasura(GET_MANY, resource, params),
  getManyReference: (resource, params) =>
    dataProviderHasura(GET_MANY_REFERENCE, resource, params),
  update: (resource, params) => dataProviderHasura(UPDATE, resource, params),
  updateMany: (resource, params) =>
    dataProviderHasura(UPDATE_MANY, resource, params),
  create: (resource, params) => dataProviderHasura(CREATE, resource, params),
  delete: (resource, params) => dataProviderHasura(DELETE, resource, params),
  deleteMany: (resource, params) => {
    // request header
    // const URL = 'http://test20.ngrok.samagra.io/api/v1/delete/?id';
    const URL = 'http://esamwad.samagra.io/api/v1/delete/?id';
    const authToken = JSON.parse(
      localStorage.getItem('Dashboard-App/local_sql/user')
    );
    const arr = [...params.ids];
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${authToken.token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    // if (resource === 'deadline') {
    //   return new Promise((resolve, reject) => {
    //     dataProviderHasura(DELETE_MANY, resource, params).catch((error) => {
    //       throw reject(
    //         new Error(error.graphQLErrors[0].extensions.internal.error.message)
    //       );
    //     });
    //   })
    //     .then(() => {
    //       console.log('Promise Resolved');
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       return new HttpError(error);
    //     });
    // }
    if (resource === 'lo') {
      return fetch(`${URL}=[${arr}]&type=LO`, requestOptions)
        .then((response) => response.text())
        .then(() => ({
          data: [arr],
        }))
        .catch((error) => {
          console.log('error: ', error);
          throw new Error(error);
        });
    }
    if (resource === 'question') {
      return fetch(`${URL}=[${arr}]&type=Question`, requestOptions)
        .then((response) => response.text())
        .then(() => ({
          data: [arr],
        }))
        .catch((error) => console.log('error', error));
    }
    if (resource === 'grade_assessment') {
      return fetch(`${URL}=[${arr}]&type=GradeAssessment`, requestOptions)
        .then((response) => response.text())
        .then(() => ({
          data: [arr],
        }))
        .catch((error) => console.log('error', error));
    }
    return dataProviderHasura(DELETE_MANY, resource, params);
  },
}));

// myHeaders.append('Accept', 'application/json');
// myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
// myHeaders.append('Access-Control-Allow-Credentials', 'true');
// myHeaders.append('GET', 'POST', 'OPTIONS');
