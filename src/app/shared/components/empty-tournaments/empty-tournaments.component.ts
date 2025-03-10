import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EmptyStateCardComponent } from '../empty-state-card/empty-state-card.component';

@Component({
	selector: 'app-empty-tournaments',
	imports: [EmptyStateCardComponent, MatIconModule],
	template: `
		<app-empty-state-card
			title="El torneo de tus sueños te está esperando"
			description="Busca tu desafío, compite y lleva tu juego al siguiente nivel."
		>
			<mat-icon icon fontIcon="emoji_events" class="text-colorGrisClaro icon-size-18"></mat-icon>
			<button action class="btn-primary mt-2 w-fit text-base font-semibold">Ver equipos</button>
		</app-empty-state-card>
	`
})
export class EmptyTournamentsComponent {}
