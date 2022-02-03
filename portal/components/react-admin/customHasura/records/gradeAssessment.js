import gql from "graphql-tag";

// Define the additional fields that we want.
export const EXTENDED_GRADE_ASSESSMENT_RECORD = gql`
  {
    id
    grade_number
    streams_id
    section
    created
    updated
    assessment {
      assessment_type {
        name
      }
    }
    school {
      udise
    }
  }
`;
