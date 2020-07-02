export const environment = {
  production: true,
  API: 'https://restaurante-dev-api.herokuapp.com',
  API_LOGIN: 'https://dev-590029.okta.com/oauth2/default',
  tokenWhitelistedDomains: [ new RegExp('https://dev-590029.okta.com') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]  
};
