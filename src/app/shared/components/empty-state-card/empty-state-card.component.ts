import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-empty-state-card',
	imports: [MatIconModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div
			class="dashboard-card flex h-full w-full flex-col items-center justify-center gap-3 text-center"
		>
			<ng-content select="[icon]"></ng-content>
			<h3 class="text-adaptive-title text-base font-bold">{{ title() }}</h3>
			<p class="text-adaptive-secondary max-w-58 text-sm">{{ description() }}</p>
			<ng-content select="[action]"></ng-content>
		</div>
	`
})
export class EmptyStateCardComponent {
	title = input.required<string>();
	description = input.required<string>();
}
