import { ChangeDetectionStrategy, Component } from '@angular/core';
import ConstructionComponent from '@app/shared/pages/construction/construction.component';

@Component({
	selector: 'organizer-my-tournaments',
	imports: [ConstructionComponent],
	templateUrl: './my-tournaments.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MyTournamentsComponent {}
