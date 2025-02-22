import { Component } from '@angular/core';

@Component({
	selector: 'landing-footer',
	templateUrl: './footer.component.html'
})
export class LandingFooterComponent {
	currentYear = new Date().getFullYear();
}
