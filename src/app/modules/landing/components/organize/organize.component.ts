import { Component } from '@angular/core';

interface Feature {
	icon: string;
	title: string;
	description: string;
}

@Component({
	selector: 'landing-organize',
	templateUrl: './organize.component.html',
	styleUrl: './organize.component.scss'
})
export class LandingOrganizeComponent {
	public features: Feature[] = [
		{
			icon: 'images/landing/rayo.png',
			title: 'Fácil y rápido',
			description: 'Configura tu torneo en pocos pasos y sin complicaciones.'
		},
		{
			icon: 'images/landing/jugador.png',
			title: 'Llega a más jugadores',
			description:
				'Publica tu torneo en nuestra plataforma y conéctate con equipos y jugadores de todo nivel.'
		},
		{
			icon: 'images/landing/velocimetro.png',
			title: 'Resultados en tiempo real',
			description: 'Gestiona tu torneo en línea y comparte los resultados al instante.'
		}
	];
}
