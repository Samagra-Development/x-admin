import { buildFields } from "ra-data-hasura";
import {EXTENDED_TEACHER_RECORD, EXTENDED_SCHOOL_RECORD, EXTENDED_ASSESSMENT_RECORD, EXTENDED_GRADE_ASSESSMENT_RECORD} from './records';
/**
 * Extracts just the fields from a GraphQL AST.
 * @param {GraphQL AST} queryAst
 */
const extractFieldsFromQuery = (queryAst) => {
  return queryAst.definitions[0].selectionSet.selections;
};

const customBuildFields = (type, fetchType) => {
  const resourceName = type.name;
  const defaultFields = buildFields(type, fetchType);

  if (resourceName === "teacher") {
    if (["GET_LIST","GET_ONE","UPDATE"].includes(fetchType)) {
      const relatedEntities = extractFieldsFromQuery(EXTENDED_TEACHER_RECORD);
      defaultFields.push(...relatedEntities);
    }
  } else if(resourceName === "school") {
    if (["GET_LIST","GET_ONE"].includes(fetchType)) {
      const relatedEntities = extractFieldsFromQuery(EXTENDED_SCHOOL_RECORD);
      defaultFields.push(...relatedEntities);
    }
  } else if(resourceName === "assessment") {
    if (["GET_LIST"].includes(fetchType)) {
      const relatedEntities = extractFieldsFromQuery(EXTENDED_ASSESSMENT_RECORD);
      defaultFields.push(...relatedEntities);
    }
  } else if(resourceName === "grade_assessment") {    
    if (["GET_LIST","GET_ONE", "DELETE", "DELETE_MANY"].includes(fetchType)) {
      const relatedEntities = extractFieldsFromQuery(EXTENDED_GRADE_ASSESSMENT_RECORD);
      defaultFields.push(...relatedEntities);
    }    
  }

  return defaultFields;
};

export default customBuildFields;
