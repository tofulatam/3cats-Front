import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EmptyStateCardComponent } from '../empty-state-card/empty-state-card.component';

@Component({
	selector: 'app-empty-my-tournaments',
	imports: [EmptyStateCardComponent, MatIconModule],
	template: `
		<app-empty-state-card [section]="section()" [title]="title()" [description]="description()">
			<mat-icon icon svgIcon="tournament-icon" class="text-colorGrisClaro icon-size-18"></mat-icon>
			<button action class="btn-primary mt-2 w-fit text-base font-semibold">Crear torneo</button>
		</app-empty-state-card>
	`
})
export class EmptyMyTournamentsComponent {
	public section = input<string>('Torneos creados');
	public title = input<string>('Haz que todo comience');
	public description = input<string>('Da vida a tu visión. Organiza y crea momentos inolvidables');
}
