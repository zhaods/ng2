/** @module ng2 */
/** */
import { UIRouter, BaseLocationServices, parseUrl } from "ui-router-core";
import { LocationStrategy } from "@angular/common";

/** A `LocationServices` that delegates to the Angular LocationStrategy */
export class Ng2LocationServices extends BaseLocationServices {
  constructor(router: UIRouter, private _locationStrategy: LocationStrategy) {
    super(router, true);
    this._locationStrategy.onPopState(this._listener);
  }

  _get() {
    return this._locationStrategy.path(true)
      .replace(this._locationStrategy.getBaseHref().replace(/\/$/, ''), '');
  }

  _set(state: any, title: string, url: string, replace: boolean): any {
    let { path, search, hash } = parseUrl(url);
    let urlWithHash = path + (hash ? "#" + hash : "");

    if (replace) {
      this._locationStrategy.replaceState(state, title, urlWithHash, search);
    } else {
      this._locationStrategy.pushState(state, title, urlWithHash, search);
    }
  }

  dispose(router: UIRouter) {
    super.dispose(router);
  }
}
