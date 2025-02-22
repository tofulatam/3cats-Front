import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'landing-hero',
	templateUrl: './hero.component.html',
	imports: [MatButtonModule],
	styles: [
		`
			.banner {
				background-image: url('/images/landing/landing-hero.webp');
				background-size: cover;
				background-position: center;
			}
		`
	]
})
export class LandingHeroComponent {
	title: string = 'El lugar donde nacen los campeones';
	subtitle: string = '¿Listo para competir? ¡Es tu momento!';
	description: string =
		'Descubre los miles de torneos que están esperando tu llegada. Tú tienes el talento, nosotros la oportunidad de hacerlo.';
}
