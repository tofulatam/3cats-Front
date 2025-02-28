import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Team } from '@app/shared/interfaces/team.interface';

@Component({
	selector: 'landing-team-card',
	templateUrl: './team-card.component.html',
	imports: [DatePipe, MatDividerModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class:
			'flex flex-col items-center justify-center gap-4 rounded-xl p-6 text-center text-colorBlancoMenta 2xs:w-64'
	}
})
export class LandingTeamCardComponent {
	public team = input.required<Team>();
}
