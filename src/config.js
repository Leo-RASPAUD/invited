const region = 'ap-southeast-2';
const identityPoolId = 'ap-southeast-2:946c90ce-794b-45d2-b84a-daa126c17939';
const userPoolId = 'ap-southeast-2_VuJmvtEfB';
const userPoolWebClientId = '6a08escb764vt5ebhqrl176mru';
const graphqlEndpoint = 'https://67taogaa2bckvlesjcv3cp2slm.appsync-api.ap-southeast-2.amazonaws.com/graphql';

const baseUrl = process.env === 'development' ? 'localhost:3000' : 'invited.events';

const oauth = {
  domain: 'invited.auth.ap-southeast-2.amazoncognito.com',
  // scope: ['openid', 'email', 'profile'],
  redirectSignIn: `http://${baseUrl}/googleSignIn`,
  redirectSignOut: `http://${baseUrl}`,
  responseType: 'code',
};

export default {
  Auth: {
    oauth,
    identityPoolId,
    region,
    userPoolId,
    userPoolWebClientId,
    signInEnabled: true,
    userPools: true,
  },
  aws_appsync_graphqlEndpoint: graphqlEndpoint,
  aws_appsync_region: region,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
};
