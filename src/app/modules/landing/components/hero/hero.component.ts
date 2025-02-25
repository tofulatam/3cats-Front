import { Component } from '@angular/core';

@Component({
	selector: 'landing-hero',
	templateUrl: './hero.component.html',
	imports: [],
	styles: [
		`
			.banner {
				background-image: url('/images/landing/landing-hero.webp');
				background-size: cover;
				background-position: center;
			}

			@media (max-width: 600px) {
				.banner {
					background-image: url('/images/landing/landing-hero-600.webp');
				}
			}
		`
	]
})
export class LandingHeroComponent {}
