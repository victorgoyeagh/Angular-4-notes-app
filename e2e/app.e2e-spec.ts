import { YopaPage } from './app.po';
import { TestBed, inject } from '@angular/core/testing';
import { LoginService } from './../base/app/services/login.service';
import { DataService } from './../base/app/services/data.service';
import { IUser } from './../base/app/entities/user.entity';
import { INotes } from '../base/app/entities/notes.entity';

describe('Init success', function () {
	let page: YopaPage;

	beforeEach(() => {
		page = new YopaPage();
	});

	it('Check title display', () => {
		page.navigateTo();
		expect(page.getParagraphText()).toContain('Notes App');
	});
});

describe('Login tests', function () {
	let page: YopaPage;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LoginService, DataService]
		})
	});

	it('successfull data initialisation',
		inject([DataService], (service: DataService) => {
			expect(service).toBeTruthy();
		}));
		
	it('Users should be of type IUser',
		inject([DataService], (service: DataService) => {
			let user = service.GetAllUsersData()[0];
			expect((<IUser>user != undefined) && (user.Type == "IUser")).toEqual(true);
		}));

});
