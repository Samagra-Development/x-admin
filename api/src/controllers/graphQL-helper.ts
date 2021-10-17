import axios from 'axios';
import sendLog from '../utils/adminLogger';
import {graphQLQuery} from './graphQL-query';

export class graphQLHelper {
  async fetchGraphQL(
    operationsDoc: string,
    operationName: string,
    variables: any,
  ): Promise<any> {
    try {
      const result = await axios({
        url: process.env.HASURA_URL,
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
        },
        method: 'POST',
        data: {
          query: operationsDoc,
          variables: variables,
          operationName: operationName,
        },
      });
      return result.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async executeInsert(obj: graphQLQuery) {
    const sanitisedObject: Partial<graphQLQuery> = {...obj};
    delete sanitisedObject.operationName;
    delete sanitisedObject.operationsDoc;
    delete sanitisedObject.variableName;
    delete sanitisedObject.databaseOperationName;

    return this.fetchGraphQL(obj.operationsDoc, obj.operationName, {
      [obj.variableName]: sanitisedObject,
    });
  }

  async startExecuteInsert(obj: graphQLQuery) {
    const {errors, data} = await this.executeInsert(obj);
    console.log(obj);
    if (errors) {
      console.error(errors);
      sendLog(
        `*⚠️ Saksham Samiksha Monitoring *: ${obj.operationName}* failed with the following error: \`\`\`${errors?.[0]?.message}\`\`\``,
        process.env.SLACK_ADMIN_LOGS_CHANNEL_ID,
      );
      return {errors: errors, data: null};
    } else {
      console.log(data);
      sendLog(
        `*✅ Saksham Samiksha Monitoring *: ${obj.operationName}* successfully done for:  \`\`\`${JSON.stringify(
          data[obj.databaseOperationName],
        )}\`\`\``,
        process.env.SLACK_ADMIN_LOGS_CHANNEL_ID,
      );
      return {errors: null, data: data};
    }
  }
}
