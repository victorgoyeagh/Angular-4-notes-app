import { Component } from '@angular/core';

@Component({
	selector: 'e-footer',
	templateUrl: './templates/footer.template.html'
})

export class FooterComponent {
	private outDateYear: number;

	constructor() {
		this.outDateYear = new Date().getFullYear();
	}
}