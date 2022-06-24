/* eslint-disable  */
import { AxaAppConfig } from '@axa/ng-toolkit';
import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

/**The configuration injectable class. */
@Injectable()
export class AppConfigLoader<T> implements AxaAppConfig<T> {

  /** a 'local' http client that bypasses the http interceptor */
  private readonly http: HttpClient;

  /**Contains the environment from config.base.config. */
  base = null;

  /**Contains the generic configuration. */
  settings: T;

  /**
   *Creates an instance of AxaAppConfig.
   */
  constructor(_http: HttpBackend, private location: Location) {
    this.http = new HttpClient(_http);

  }

  /**Loads the configuration. */
  async load() {
    try {

      const baseFile = this.location.prepareExternalUrl(`assets/config/config.base.json`);
      this.base = await this.http.get(baseFile).toPromise();

      const env = this.base.environment.toLowerCase();
      const envFile = this.location.prepareExternalUrl(`assets/config/config.${env}.json`);
      this.settings = await this.http.get(envFile).toPromise() as T;

    } catch (e) {
      console.error('Configuration file could not be loaded', e);
    }
  }
}

/**Factory function to load the configuration. */
export function initializeConfigLoader<T>(appConfig: AppConfigLoader<T>) {
  return () => appConfig.load();
}
