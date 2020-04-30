import gql from 'graphql-tag';

export const ADD_EMPLOYEES = gql`
  mutation addEmployee($eName: String!) {
    addEmployee(eName: $eName) {
      id
      name
      timestamp
    }
  }
`;

export const DELETE_EMPLOYEES = gql`
  mutation deleteEmployee($id: String!) {
    deleteEmployee(id: $id)
  }
`;