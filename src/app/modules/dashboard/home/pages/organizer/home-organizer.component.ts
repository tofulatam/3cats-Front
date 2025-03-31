import { ChangeDetectionStrategy, Component } from '@angular/core';
// Componentes
import { EmptyMyTournamentsComponent } from '@app/shared/components/empty-my-tournaments/empty-my-tournaments.component';
import { TeamsListComponent } from '../../components/teams-list/teams-list.component';
import { TournamentsListComponent } from '../../components/tournaments-list/tournaments-list.component';

@Component({
	selector: 'home-organizer',
	imports: [EmptyMyTournamentsComponent, TournamentsListComponent, TeamsListComponent],
	templateUrl: './home-organizer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeOrganizerComponent {}
