/**
 * Authentication configuration
 */
export interface Auth0Config {
  /** url of the auth0 tenant identity provider */
 domain: string;
 /** client id as registered on the auth0 side */
 clientId: string;
 /** audience as registered on the auth0 client */
 audience: string;
 /** web location where to return to after the login */
 redirectUri: string;
 /** authentication method used */
 connection: string;
}

/** Contains all the urls of the component that will be loaded in */
export interface Urls {
  /** claim overviewurl for index page */
  claimOverviewUrl : string;
  /** consult url for index page */
  consultUrl : string;
  /** extension url for index page */
  extensionUrl : string;
  /** declaration url for index page */
  declarationUrl : string;
  /** closure url for index page */
  closureUrl : string;
}


/** tokens that are injected into the application */
export interface AppConfig {
  /** encapsulation of the auth0 configuration parameters */
  auth0: Auth0Config;
  /** Collection of url */
  urls : Urls;
}
