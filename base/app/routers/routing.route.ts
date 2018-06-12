import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { HomePage } from '../views/home.view';
import { LoginPage } from '../views/login.view';
import { DashboardPage } from '../views/dashboard.view';
import { CommentPage } from './../views/comments.view';
import { PageNotFoundPage } from './../views/pagenotfound.view';
import { LoginAuth } from './authguard.component';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginPage,
        pathMatch: 'full'
    },
    {
        path: '',
        component: HomePage,
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardPage,
        pathMatch: 'full',
        canActivate: [LoginAuth]
    },
    {
        path: 'comments',
        component: CommentPage,
        pathMatch: 'full',
        canActivate: [LoginAuth]
    },
    {
        path: '**',
        component: PageNotFoundPage
    }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,
    {
        useHash: true
    }
);