import { ChangeDetectionStrategy, Component } from '@angular/core';
import ConstructionComponent from '@app/shared/pages/construction/construction.component';

@Component({
	selector: 'dashboard-matches',
	templateUrl: './matches.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ConstructionComponent],
	host: {
		class: 'h-full'
	}
})
export default class MatchesComponent {}
