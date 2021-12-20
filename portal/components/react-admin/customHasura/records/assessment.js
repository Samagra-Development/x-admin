import gql from "graphql-tag";

// Define the additional fields that we want.
export const EXTENDED_ASSESSMENT_RECORD = gql`
  {
    id
    assessment_type{
      name
    }
    deadline{
      district
      date
    }
    submissionTypeBySubmissionTypeV2Id{
      aggregation
      category
    }
    evaluation_params
    is_enabled  
  }
`;