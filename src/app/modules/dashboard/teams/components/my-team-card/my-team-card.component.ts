import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// Material
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
// Components
import { FavoriteButtonComponent } from '@app/shared/components/buttons/favorite-button/favorite-button.component';
// Directives
import { HandleImageErrorDirective } from '@app/shared/directives/image-error.directive';
// Interfaces
import { Team } from '@app/shared/interfaces/team.interface';

@Component({
	selector: 'app-my-team-card',
	templateUrl: './my-team-card.component.html',
	imports: [
		DatePipe,
		FavoriteButtonComponent,
		HandleImageErrorDirective,
		MatDividerModule,
		MatIconModule
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyTeamCardComponent {
	public team = input.required<Team>();
}
