const region = 'ap-southeast-2';
const identityPoolId = 'ap-southeast-2:946c90ce-794b-45d2-b84a-daa126c17939';
const userPoolId = 'ap-southeast-2_VuJmvtEfB';
const userPoolWebClientId = '6a08escb764vt5ebhqrl176mru';
const graphqlEndpoint = 'https://67taogaa2bckvlesjcv3cp2slm.appsync-api.ap-southeast-2.amazonaws.com/graphql';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://invited.events';

const oauth = {
  domain: 'invited.auth.ap-southeast-2.amazoncognito.com',
  redirectSignIn: `${baseUrl}/googleSignIn`,
  redirectSignOut: `${baseUrl}`,
  responseType: 'code',
};

export default {
  Auth: {
    oauth,
    identityPoolId,
    region,
    userPoolId,
    userPoolWebClientId,
  },
  aws_appsync_graphqlEndpoint: graphqlEndpoint,
  aws_appsync_region: region,
  aws_cognito_region: region,
  aws_project_region: region,
  aws_sign_in_enabled: 'enable',
  aws_user_pools: 'enable',
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
};
