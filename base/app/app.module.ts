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
import { LoginPage } from './views/login.view';

/* components */
import { Routing } from './routers/routing.route';
import { PageNotFoundComponent } from './views/pagenotfound.view';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home.view';
import { MainComponent } from './views/main.view';
import { CommentComponent } from './views/comments.view';
import { BaseComponent } from './base.component';
import { FooterComponent } from './components/shared/footer.component';
import { HeaderComponent } from './components/shared/header.component';
import { NavigationComponent } from './components/shared/navigation.component';
import { ModalOverlayComponent } from './components/modal/modal.component';

/* services */
import { CommunicationService } from './services/communication.service';
import { LoginService } from './services/login.service';
import { DataService } from './services/data.service';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        FormatAsUKDatePipe,
        FormatAs24HourTimePipe,
        BaseComponent,
        HomeComponent,
        HeaderComponent,
        FooterComponent,
        NavigationComponent,
        MainComponent,
        LoginPage,
        LoginComponent,
        CommentComponent,
        ModalOverlayComponent
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
        DataService
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
