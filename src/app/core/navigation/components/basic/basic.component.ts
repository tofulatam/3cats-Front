import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
// Material
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
// Interfaces
import { NavigationItem } from '@app/core/navigation/interfaces/navigation.interface';

@Component({
	selector: 'app-navigation-basic-item',
	templateUrl: './basic.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink, RouterLinkActive, MatTooltipModule, MatIconModule]
})
export class NavigationBasicItemComponent {
	// Inputs signals
	public item = input<NavigationItem>();
}
