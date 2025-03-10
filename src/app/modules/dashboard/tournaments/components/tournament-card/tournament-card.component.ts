import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
// Material
import { MatIconModule } from '@angular/material/icon';
// Components
import { FavoriteButtonComponent } from '@app/shared/components/buttons/favorite-button/favorite-button.component';
import { StatusBadgeComponent } from '@app/shared/components/status-badge/status-badge.component';
// Interfaces
import { Tournament } from '@app/shared/interfaces/tournament.interface';

@Component({
	selector: 'app-dashboard-tournament-card',
	imports: [DatePipe, FavoriteButtonComponent, MatIconModule, StatusBadgeComponent, TitleCasePipe],
	templateUrl: './tournament-card.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardTournamentCardComponent {
	public tournament = input.required<Tournament>();
}
