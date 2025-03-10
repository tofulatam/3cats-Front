import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EmptyStateCardComponent } from '../empty-state-card/empty-state-card.component';

@Component({
	selector: 'app-empty-teams',
	imports: [EmptyStateCardComponent, MatIconModule],
	template: `
		<app-empty-state-card
			title="Encuentra tu equipo, encuentra tu lugar"
			description="Únete a un equipo, encuentra tu lugar y juega con pasión."
		>
			<mat-icon icon fontIcon="security" class="text-colorGrisClaro icon-size-18"></mat-icon>
			<button action class="btn-primary mt-2 w-fit text-base font-semibold">Ver torneos</button>
		</app-empty-state-card>
	`
})
export class EmptyTeamsComponent {}
