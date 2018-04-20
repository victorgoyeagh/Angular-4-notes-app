import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router'; 
import { CommentsComponent } from './../components/comments/comments.component';
import { LoginService } from './../services/login.service';

@Component({
    selector: 'e-comments',
    templateUrl: './templates/comments.template.html'
})

export class CommentPage implements OnInit { 

    constructor(
        private _loginService: LoginService
    ) {
        this._loginService.CheckLogin();
    }

    ngOnInit() {
    }

}