import { TestBed, inject } from '@angular/core/testing';
import { LoginService } from './login.service';
import { DataService } from './../services/data.service';
import { IUser } from './../entities/user.entity';
import { INotes } from '../entities/notes.entity';
import { RouterTestingModule } from '@angular/router/testing';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { createStore } from 'redux';
import { RootReducer } from './../state/state.store';

describe('LOGIN TESTS: ', function () {
    const store = createStore(RootReducer, {});

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, NgReduxModule],
            providers: [LoginService, DataService]
        })
    });

    it('Login initialisation',
        inject([LoginService], (service: LoginService) => {
            expect(service).toBeTruthy();
        })
    );
/*
    it('User object should be of type IUser',
        inject([LoginService], (service: LoginService) => {
            //let user = service.GetUserDetails();
            //expect(<IUser>user == undefined && user.Type == "IUser").toEqual(true);
        })
    );
*/
});