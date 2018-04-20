import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { HomeComponent } from '../views/home.view';
import { LoginPage } from '../views/login.view';
import { CommentsComponent } from '../components/comments/comments.component';
import { PageNotFoundComponent } from './../views/pagenotfound.view';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginPage,
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'comments',
        component: CommentsComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,
    {
        useHash: true
    }
);