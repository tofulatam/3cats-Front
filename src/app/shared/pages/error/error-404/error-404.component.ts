import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'error-404',
	templateUrl: './error-404.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [RouterLink],
	host: {
		class: 'flex flex-col flex-auto items-center justify-center h-full p-6 sm:p-10'
	}
})
export class Error404Component {
	/**
	 * Constructor
	 */
	constructor() {}
}
