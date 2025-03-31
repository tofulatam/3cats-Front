import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomPaginatorIntl } from '../../services/paginator-intl.service';

@Component({
	selector: 'app-paginator',
	standalone: true,
	imports: [MatPaginatorModule],
	providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
	template: `
		<mat-paginator
			class="bg-card"
			[length]="length()"
			[pageSize]="pageSize()"
			[hidePageSize]="true"
			[showFirstLastButtons]="true"
			(page)="pageChange.emit($event)"
			[attr.aria-label]="ariaLabel()"
		>
		</mat-paginator>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'self-end w-fit'
	}
})
export class PaginatorComponent {
	// Inputs
	public length = input.required<number>();
	public pageSize = input.required<number>();
	public ariaLabel = input<string>('Seleccionar página');

	// Outputs
	public pageChange = output<PageEvent>();
}
