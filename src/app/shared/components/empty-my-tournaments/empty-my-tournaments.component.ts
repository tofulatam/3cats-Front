import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EmptyStateCardComponent } from '../empty-state-card/empty-state-card.component';

@Component({
	selector: 'app-empty-my-tournaments',
	imports: [EmptyStateCardComponent, MatIconModule],
	template: `
		<app-empty-state-card
			title="Haz que todo comience"
			description="Da vida a tu visión. Organiza y crea momentos inolvidables.h"
		>
			<mat-icon icon svgIcon="tournament-icon" class="text-colorGrisClaro icon-size-18"></mat-icon>
			<button action class="btn-primary mt-2 w-fit text-base font-semibold">Crear torneo</button>
		</app-empty-state-card>
	`
})
export class EmptyMyTournamentsComponent {}
