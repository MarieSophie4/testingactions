import { Injectable } from '@angular/core';

/**
 * Service that will configure the cookies
 */
@Injectable()
export class CookieService {

  /**
   * Check if a certain cookie exist with the name of the cookie
   * @param name Cookie name
   * @returns boolean - whether cookie with specified name exists
   */
  check(name: string): boolean {
    name = encodeURIComponent(name);

    const regExp: RegExp = this.getCookieRegExp(name);
    const exists: boolean = regExp.test(document.cookie);

    return exists;
  }

  /**
   * Get a cookie based on a cookie name
   * @param name Cookie name
   * @returns property value
   */
  get(name: string): string {

    if (this.check(name)) {
      name = encodeURIComponent(name);
      const regExp: RegExp = this.getCookieRegExp(name);
      const result: RegExpExecArray = regExp.exec(document.cookie);
      return this.safeDecodeURIComponent(result[1]);
    }
    return '';
  }

  /**
   * Returns all the cookies in record format
   * @returns all the cookies in json
   */
  getAll(): Record<string,string> {
    const cookies: Record<string, string>  = {};

    if (document.cookie && document.cookie !== '') {
      document.cookie.split(';').forEach((currentCookie) => {
        const [cookieName, cookieValue] = currentCookie.split('=');
        cookies[this.safeDecodeURIComponent(cookieName.replace(/^ /, ''))] = this.safeDecodeURIComponent(cookieValue);
      });
    }
    return cookies;
  }

  /**
   * Sets a cookie with given settings
   * @param name     Cookie name
   * @param value    Cookie value
   * @param expires  Number of days until the cookies expires or an actual `Date`
   * @param path     Cookie path
   * @param domain   Cookie domain
   * @param secure   Secure flag
   * @param sameSite OWASP samesite token `Lax`, `None`, or `Strict`. Defaults to `Lax`
   */
  set({ name, value, expires, path, domain, secure, sameSite = 'Lax' }:
    {
      name: string;
      value: string;
      expires?: number | Date;
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: 'Lax' | 'None' | 'Strict';
    }): void {

    let cookieString = `${encodeURIComponent(name)  }=${  encodeURIComponent(value)  };`;

    if (expires) {
      if (typeof expires === 'number') {
        const dateExpires: Date = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);

        cookieString += `expires=${  dateExpires.toUTCString()  };`;
      } else {
        cookieString += `expires=${  expires.toUTCString()  };`;
      }
    }

    if (path) {
      cookieString += `path=${  path  };`;
    }

    if (domain) {
      cookieString += `domain=${  domain  };`;
    }

    if (!secure && sameSite === 'None') {
      secure = true;
    }

    if (secure) {
      cookieString += 'secure;';
    }

    cookieString += `sameSite=${  sameSite  };`;

    document.cookie = cookieString;
  }

  /**
   * Delete a cookie based on certain values
   * @param name   Cookie name
   * @param path   Cookie path
   * @param domain Cookie domain
   */
  delete(name: string, path?: string, domain?: string, secure?: boolean, sameSite: 'Lax' | 'None' | 'Strict' = 'Lax'): void {
    this.set({ name, value: '', expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT'), path, domain, secure, sameSite });
  }

  /**
   * Delete all the cookies
   * @param path   Cookie path
   * @param domain Cookie domain
   */
  deleteAll(path?: string, domain?: string, secure?: boolean, sameSite: 'Lax' | 'None' | 'Strict' = 'Lax'): void {
    const cookies:  Record<string,string> = this.getAll();

    for (const cookieName in cookies) {
      if((Object.keys(cookies) ).find(key => cookies[key] === cookieName)){
        this.delete(cookieName, path, domain, secure, sameSite);
      }
    }
  }

  /**
   * @param name Cookie name
   * @returns property RegExp
   */
  private getCookieRegExp(name: string): RegExp {
    // eslint-disable-next-line no-useless-escape
    const escapedName: string = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, '\\$1');

    return new RegExp(`(?:^${  escapedName  }|;\\s*${  escapedName  })=(.*?)(?:;|$)`, 'g');
  }

  private safeDecodeURIComponent(encodedURIComponent: string): string {
    try {
      return decodeURIComponent(encodedURIComponent);
    } catch {
      // probably it is not uri encoded. return as is
      return encodedURIComponent;
    }
  }
}
