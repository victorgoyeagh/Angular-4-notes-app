import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { HomePage } from '../views/home.view';
import { LoginPage } from '../views/login.view';
import { DashboardPage } from '../views/dashboard.view';
import { CommentPage } from './../views/comments.view';
import { PageNotFoundPage } from './../views/pagenotfound.view';

const appRoutes: Routes = [
    {
        path: '',
        component: DashboardPage,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginPage,
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardPage,
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomePage,
        pathMatch: 'full'
    },
    {
        path: 'comments',
        component: CommentPage,
        pathMatch: 'full'
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