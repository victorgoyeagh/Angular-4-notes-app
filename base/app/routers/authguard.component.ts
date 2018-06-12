import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as Rx from 'rxjs';
import { LoginService } from './../services/login.service';
import { map, take, tap } from 'rxjs/operators';


@Injectable()
export class LoginAuth implements CanActivate {

    constructor(
        private _loginService: LoginService,
        private _router: Router
    ){
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Rx.Observable<boolean> {

        return this._loginService.userIsLoggedIn
                .pipe(
                    map((value) => value),
                    take(1),
                    tap((loggenIn: boolean) => {

                        if(!loggenIn){
                            this._router.navigate(['login']);
                        }
                    })
                )
    }
}