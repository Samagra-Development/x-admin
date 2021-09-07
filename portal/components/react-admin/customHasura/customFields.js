import { buildFields } from "ra-data-hasura";
import gql from "graphql-tag";
/**
 * Extracts just the fields from a GraphQL AST.
 * @param {GraphQL AST} queryAst
 */
const extractFieldsFromQuery = (queryAst) => {
  return queryAst.definitions[0].selectionSet.selections;
};

// Define the additional fields that we want.
const EXTENDED_RECRUITER_RECORD = gql`
  {
    district_name {
      name
    }
  }
`;

const EXTENDED_Vacancy_RECORD = gql`
  {
    sector_preference {
      sector_preference_name
    }
    employer_detail {
      company_name
      GSTN
      CRN
      pincode
    }
    expected_salary {
      salary_range
    }
    gender {
      gender_name
    }
    driver_license {
      driver_license_choice
    }
    englishSpeakingRequiredByFreshersOpenChoice {
      english_speaking_required_choices
    }
    englishSpeakingRequiredByIsComputerKnowledgeRequiredChoices {
      english_speaking_required_choices
    }
    min_work_experience_requirement {
      work_experience_choices
    }
    highest_level_qualification {
      highest_level_qualification_name
    }
    age_criteria_choice {
      age_range_values
    }
  }
`;
const EXTENDED_CANDIDATE_VACANCY_INTREST = gql`
  {
    vacancy_detail {
      employer_detail {
        company_name
      }
      sector_preference {
        sector_preference_name
      }
    }
    candidate_profile {
      name
    }
  }
`;
const EXTENDED_CANDIDATE_RECORD = gql`
  {
    qualification_detail {
      qualification_name
    }
    gender {
      gender_name
    }
    district_name {
      name
    }
    highest_level_qualification {
      highest_level_qualification_name
    }
    expected_salary {
      salary_range
    }
    current_employment {
      id
    }
    monthly_salary_details {
      salary_range
    }
    driver_license {
      driver_license_choice
    }
    district_travel {
      district_travel_choice
    }
    pan_card {
      pan_card_choice
    }

    computer_operator {
      computer_operator_choice
    }
    current_employment {
      current_employment_status
    }
    ever_employment {
      employment_status
    }
    work_experience_details {
      work_experience_choices
    }
    sector_preference_3 {
      sector_preference_name
    }
    sector_preference_1 {
      sector_preference_name
    }
    sector_preference_2 {
      sector_preference_name
    }
    english_knowledge_choice {
      english_choice
    }
  }
`;

const customBuildFields = (type, fetchType) => {
  const resourceName = type.name;
  const defaultFields = buildFields(type, fetchType);
  if (resourceName === "candidate_profile") {
    if (fetchType === "GET_LIST" || fetchType === "GET_ONE") {
      const relatedEntities = extractFieldsFromQuery(EXTENDED_CANDIDATE_RECORD);
      defaultFields.push(...relatedEntities);
    }
  } else if (resourceName === "employer_details") {
    if (fetchType === "GET_LIST" || fetchType === "GET_ONE") {
      const relatedEntities = extractFieldsFromQuery(EXTENDED_RECRUITER_RECORD);
      defaultFields.push(...relatedEntities);
    }
  } else if (resourceName === "vacancy_details") {
    if (fetchType === "GET_LIST" || fetchType === "GET_ONE") {
      const relatedEntities = extractFieldsFromQuery(EXTENDED_Vacancy_RECORD);
      defaultFields.push(...relatedEntities);
    }
  } else if (resourceName === "candidate_vacancy_interest") {
    if (fetchType === "GET_LIST" || fetchType === "GET_ONE") {
      const relatedEntities = extractFieldsFromQuery(
        EXTENDED_CANDIDATE_VACANCY_INTREST
      );
      defaultFields.push(...relatedEntities);
    }
  }
  return defaultFields;
};

export default customBuildFields;
