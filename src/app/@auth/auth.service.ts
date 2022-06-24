import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { AxaAppConfig } from '@axa/ng-toolkit';
import { BehaviorSubject, from } from 'rxjs';
import { concatMap, shareReplay, filter, mergeMap, map } from 'rxjs/operators';
import { AppConfig } from './@model/app-config';
import { Auth0ClientProfile } from './@model/user-profile.model';

/**
 * Different exception messages
 */
const auth0Exceptions = {
  loginRequired: 'login_required',
  invalidStateMessage : 'Invalid state',
  noQSParamsMessage: 'There are no query params available for parsing.'
}

/**
 *  An authentication service using config parameters to get the correct login values
 */
@Injectable()
export class AuthService {

  /** local storage & emission of the received auth0 client */
  private readonly auth0ClientSource$ = new BehaviorSubject<Auth0Client>(null);
  /** exposed client that blocks emission when the client is not authenticated */
  private readonly auth0Client$ = this.auth0ClientSource$.pipe(
    // wait untill client available
    filter(c => !!c),
    // block if not authenticated
    mergeMap(c => from(c.isAuthenticated()).pipe(filter(auth => !!auth), map(() => c))),
    // expose the authenticated client
    shareReplay(1));

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  /** user information available from the client's token */
  readonly userProfile$ = this.auth0Client$.pipe(concatMap(c => from(c.getUser<Auth0ClientProfile>())), shareReplay(1));
  /** auth0 access token that is send to the api */
  readonly accesToken$ = this.auth0Client$.pipe(concatMap(c => from(c.getTokenSilently())), shareReplay(1));
  /**An observable giving a boolean that is true when authenticated */
  readonly isAuthenticated$ = this.auth0Client$.pipe(concatMap(c => from(c.isAuthenticated() )), shareReplay(1));

  constructor(private config: AxaAppConfig<AppConfig>) {
    this.init();
  }

  /** setup the auth0Client and make it available through the service
   * @caution the method should be called once & in the constructor of the service
   */
   private init() : void {
    // create the client
    const { domain, clientId: client_id, audience, redirectUri: redirect_uri, connection } = this.config.settings.auth0;
    createAuth0Client({ domain, client_id, audience, redirect_uri, connection})
      .then(c => this.checkSession(c))
      .then(c => this.auth0ClientSource$.next(c))
      .catch((err: unknown) => console.error('auth failed: ', err));
  }

  /**
   * validates if the session is active & executes logic to create one (callback/login) in case it's not
   * @param client
   * @returns TODO
   */
  private checkSession(client: Auth0Client): Promise<Auth0Client>{
    return client.getTokenSilently()
      .then((c) => {
        return c;
      })
      .catch((rejection : unknown) => {
        // TODO needs to be tested
        if(rejection["error"] === auth0Exceptions.loginRequired){
          // try to activate the session based upon received login parameters
          return client.handleRedirectCallback();
        }
        return rejection;
      })
      .catch((rejection : unknown) => {
        // activate the login mechanism
        if([auth0Exceptions.noQSParamsMessage, auth0Exceptions.invalidStateMessage].includes(String(rejection["message"]))){
          const { redirectUri: redirect_uri, connection } = this.config.settings.auth0;
          return client.loginWithRedirect({redirect_uri, connection});
        }
        return rejection;
      })
      // return the client on valid processing
      .then(() => client);
  }


  /**
   * Force login
   * @param redirectPath
   */
  login(redirectPath = '/') : void {
    const { redirectUri: redirect_uri } = this.config.settings.auth0;
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      void client.loginWithRedirect({
        redirect_uri,
        appState: { target: redirectPath }
      });
    });
  }

  /**
   * Force logout
   */
  logout() : void {
    const { clientId: client_id } = this.config.settings.auth0;
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      void client.logout({
        client_id,
        returnTo: `${window.location.origin}`,
        federated: false
      });
    });
  }

}
