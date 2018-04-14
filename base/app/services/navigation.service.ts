import { Injectable } from "@angular/core";
import { Router } from "@angular/router"; 

@Injectable()
export class NavigationService {

    constructor(
        private _router: Router
    ){

    }

    NavigateTo(pageName: string) {
        this._router.navigate(['/' + pageName]);
    }
    
}