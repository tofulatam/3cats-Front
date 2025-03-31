import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-back-button',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [MatIconModule, RouterModule, MatButtonModule, MatTooltipModule],
	template: `
		<button mat-icon-button [routerLink]="[route() || '../']" [matTooltip]="text()">
			<mat-icon>arrow_back</mat-icon>
		</button>
	`
})
export class BackButtonComponent {
	// input
	public route = input<string>();
	public text = input<string>();
}
