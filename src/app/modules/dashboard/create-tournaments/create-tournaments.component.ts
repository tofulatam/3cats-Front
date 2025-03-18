import { ChangeDetectionStrategy, Component } from '@angular/core';
import ConstructionComponent from '@app/shared/pages/construction/construction.component';

@Component({
	selector: 'organizer-create-tournaments',
	imports: [ConstructionComponent],
	templateUrl: './create-tournaments.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CreateTournamentsComponent {}
