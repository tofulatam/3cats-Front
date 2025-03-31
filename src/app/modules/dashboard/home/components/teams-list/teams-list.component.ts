import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { EmptyTeamsComponent } from '@app/shared/components/empty-teams/empty-teams.component';
import { TEAMS } from '@app/shared/constants/teams.constant';
import { Team } from '@app/shared/interfaces/team.interface';
@Component({
	selector: 'app-teams-list',
	imports: [EmptyTeamsComponent, DatePipe, MatDividerModule],
	templateUrl: './teams-list.component.html'
})
export class TeamsListComponent {
	// Mock data
	public teams: Team[] = TEAMS.slice(0, 2);
}
