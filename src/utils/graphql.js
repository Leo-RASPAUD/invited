import { API, graphqlOperation } from 'aws-amplify';

const mutation = async ({ mutation, params, name }) => {
  const {
    data: { [name]: result },
  } = await API.graphql(graphqlOperation(mutation, params));
  return result;
};

export default {
  mutation,
};
