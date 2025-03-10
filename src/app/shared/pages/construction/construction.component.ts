import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'construction',
	templateUrl: './construction.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink],
	host: {
		class: 'flex flex-col flex-auto items-center justify-center h-full p-6 sm:p-10'
	}
})
export default class ConstructionComponent {}
