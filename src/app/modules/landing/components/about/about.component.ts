import { ChangeDetectionStrategy, Component } from '@angular/core';

// Components
import { LandingAboutCardComponent } from '../about-card/about-card.component';
import { LandingAboutFeatureCardComponent } from '../about-feature-card/about-feature-card.component';

// Interfaces
import { AboutCard } from '@landing/interfaces/about.interface';

@Component({
	selector: 'landing-about',
	templateUrl: './about.component.html',
	imports: [LandingAboutCardComponent, LandingAboutFeatureCardComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingAboutComponent {
	public aboutCards: AboutCard[] = [
		{
			title: 'Jugador',
			description:
				'Conéctate con equipos, participa en torneos y demuestra tu talento donde importa.',
			image: 'images/landing/jugador.svg',
			redirect: 'jugador',
			button: 'Busca torneos'
		},
		{
			title: 'Equipo',
			description: 'Registra tu equipo, lleva tus colores al próximo nivel y conquista la cancha.',
			image: 'images/landing/equipo.svg',
			redirect: 'equipo',
			button: 'Crea tu equipo'
		},
		{
			title: 'Organizador',
			description: 'Lleva tus eventos al máximo nivel, con herramientas diseñadas para destacar.',
			image: 'images/landing/torneos.svg',
			redirect: 'torneos',
			button: 'Crea tu torneo'
		}
	];
}
