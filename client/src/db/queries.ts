import { gql } from 'apollo-boost';

export const GET_EMPLOYEES = gql`
{
  employees {
    name
  }
}
`;