const region = 'ap-southeast-2';
const identityPoolId = 'ap-southeast-2:946c90ce-794b-45d2-b84a-daa126c17939';
const userPoolId = 'ap-southeast-2_VuJmvtEfB';
const userPoolWebClientId = '6a08escb764vt5ebhqrl176mru';
const graphqlEndpoint = 'https://67taogaa2bckvlesjcv3cp2slm.appsync-api.ap-southeast-2.amazonaws.com/graphql';

export default {
  Auth: {
    identityPoolId,
    region,
    userPoolId,
    userPoolWebClientId,
  },
  aws_appsync_graphqlEndpoint: graphqlEndpoint,
  aws_appsync_region: region,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
};
