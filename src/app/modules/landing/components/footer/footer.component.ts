import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'landing-footer',
	imports: [MatIconModule],
	templateUrl: './footer.component.html'
})
export class LandingFooterComponent {
	currentYear = new Date().getFullYear();
}
