import gql from "graphql-tag";

// Define the additional fields that we want.
export const EXTENDED_SCHOOL_RECORD = gql`
  {
    location {
        district
        cluster
        block
    }
  }
`;