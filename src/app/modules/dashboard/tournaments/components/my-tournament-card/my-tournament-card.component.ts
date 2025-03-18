import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// Material
import { MatIconModule } from '@angular/material/icon';
// Components
import { FavoriteButtonComponent } from '@app/shared/components/buttons/favorite-button/favorite-button.component';
import { StatusBadgeComponent } from '@app/shared/components/status-badge/status-badge.component';
// Directives
import { HandleImageErrorDirective } from '@app/shared/directives/image-error.directive';
// Interfaces
import { Tournament } from '@app/shared/interfaces/tournament.interface';

@Component({
	selector: 'app-dashboard-my-tournament-card',
	templateUrl: './my-tournament-card.component.html',
	imports: [
		DatePipe,
		FavoriteButtonComponent,
		HandleImageErrorDirective,
		MatIconModule,
		StatusBadgeComponent,
		TitleCasePipe
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardMyTournamentCardComponent {
	public tournament = input.required<Tournament>();
}
