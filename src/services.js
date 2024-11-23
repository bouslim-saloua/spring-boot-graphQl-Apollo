import { gql } from '@apollo/client';
const GET_ALL_COMPTES = gql`
  query GetAllComptes {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

const GET_COMPTE_BY_ID = gql`
  query GetCompteById($id: ID!) {
    compte(id: $id) {
      id
      solde
      dateCreation
      type
    }
  }
`;

const GET_COMPTE_BY_TYPE = gql`
  query GetCompteById($type: TYPE!) {
    compte(type: $type) {
      id
      solde
      dateCreation
      type
    }
  }
`;

const ADD_COMPTE = gql`
  mutation AddCompte($compte: CompteRequest!) {
    saveCompte(compte: $compte) {
      id
      solde
      type
    }
  }
`;

const DELETE_COMPTE = gql`
  mutation DeleteCompte($id: ID!) {
    deleteCompteById(id: $id)
  }
`;

const TOTAL_SOLDES = gql`
  query Total {
    totalSolde{
    average,
    sum,
    count
    }
  }
`;

const services = {
    GET_ALL_COMPTES,
    DELETE_COMPTE,
    ADD_COMPTE,
    GET_COMPTE_BY_ID,
    GET_COMPTE_BY_TYPE,
    TOTAL_SOLDES
}

export default services;