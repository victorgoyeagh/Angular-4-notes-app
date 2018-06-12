/* angular */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';

/* third_party */
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { RootReducer, appInitialState } from './state/state.store';
import { BsModalModule } from 'ng2-bs3-modal/ng2-bs3-modal'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* pipes */
import { FormatAsUKDatePipe, FormatAs24HourTimePipe } from './pipes/fomatdate.pipe';
import { SortByPipe } from './pipes/sort.pipe';
import { FilterPipe } from './pipes/filter.pipe';

/* views */
import { HomePage } from './views/home.view';
import { LoginPage } from './views/login.view';
import { CommentPage } from './views/comments.view';
import { PageNotFoundPage } from './views/pagenotfound.view';
import { DashboardPage } from "./views/dashboard.view";

/* components */
import { Routing } from './routers/routing.route';
import { LoginComponent } from './components/login/login.component';
import { BaseComponent } from './base.component';
import { MainComponent } from './views/main.view';
import { FooterComponent } from './components/shared/footer.component';
import { HeaderComponent } from './components/shared/header.component';
import { NavigationComponent } from './components/shared/navigation.component';
import { ModalOverlayComponent } from './components/modal/modal.component';
import { NotesComponent } from './components/notes/notes.component';
import { CommentsComponent } from './components/comments/comments.component';

/* services */
import { CommentsService } from './services/comments.service';
import { CommunicationService } from './services/communication.service';
import { LoginService } from './services/login.service';
import { StateProviderService } from './services/stateprovider.service';
import { DataProviderService } from './services/dataprovider.service';
import { NotesService } from './services/notes.service';
import { UserService } from './services/user.service';

import { LoginAuth } from './routers/authguard.component';
@NgModule({
    declarations: [
        HomePage,
        PageNotFoundPage,
        CommentPage,
        LoginPage,
        DashboardPage,
        FormatAsUKDatePipe,
        FormatAs24HourTimePipe,
        BaseComponent,
        HeaderComponent,
        FooterComponent,
        NavigationComponent,
        MainComponent,
        LoginComponent,
        ModalOverlayComponent,
        NotesComponent,
        CommentsComponent
    ],
    exports: [
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        Routing,
        NgReduxModule,
        BrowserAnimationsModule,
        BsModalModule
    ],
    providers: [
        CommunicationService,
        LoginService,
        StateProviderService,
        DataProviderService,
        NotesService,
        UserService,
        CommentsService,
        LoginAuth
    ],
    bootstrap:  [
        BaseComponent
    ]
})


export class AppModule {

    constructor(
        private _store: NgRedux<any>
    ) {
        this._store.configureStore(RootReducer, {}); 
    }
}
