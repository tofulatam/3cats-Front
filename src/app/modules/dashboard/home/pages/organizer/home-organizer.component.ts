import { ChangeDetectionStrategy, Component } from '@angular/core';
// Componentes
import { EmptyMyTournamentsComponent } from '@app/shared/components/empty-my-tournaments/empty-my-tournaments.component';
import { TournamentsListComponent } from '../../components/tournaments-list/tournaments-list.component';
import { UpcomingMatchesComponent } from '../../components/upcoming-matches/upcoming-matches.component';

@Component({
	selector: 'home-organizer',
	imports: [EmptyMyTournamentsComponent, TournamentsListComponent, UpcomingMatchesComponent],
	templateUrl: './home-organizer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeOrganizerComponent {}
