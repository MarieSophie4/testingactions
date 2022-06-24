export interface Auth0ClientProfile {
  /** eg. "Doe" */
  familyName: string;
  /** eg. "John" */
  givenName: string;
  /** cifId eg. ""000000000000001" */
  'https://axa.be/customerid': string;
  /** eg "demo@axa.be" */
  name: string;
  /** eg. "John Doe" */
  nickname: string;
  /** eg. "https://cdn.auth0.com/avatars/default.png" */
  picture: string;
  /** eg. "samlp|WAM-Legacy|demo@axa.be" */
  sub: string;
  /** eg. "2022-02-03T18:00:56.009Z" */
  updatedAt: string;
}
