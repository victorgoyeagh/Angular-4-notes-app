import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject } from '@angular/core';
import { LoginService } from './../services/login.service';
import * as Rx from 'rxjs';
import { take, map, tap } from 'rxjs/operators';


@Injectable()
export class LoginAuth implements CanActivate {

    constructor(
        private _loginService: LoginService,
        private _router: Router
    ) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Rx.Observable<boolean> {

        return this._loginService.userIsLoggedIn
            .pipe(
                map(value => {
                    return value
                }),
                take(1),
                tap(allowed => {

                    if (!allowed) {
                        this._router.navigate(['login'])
                    }
                }
            ));
            
    }

}
