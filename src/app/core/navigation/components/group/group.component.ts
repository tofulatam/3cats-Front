import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
// Material
import { MatIconModule } from '@angular/material/icon';
// Services
// Interfaces
import { NavigationItem } from '@app/core/navigation/interfaces/navigation.interface';
// Components
import { NavigationBasicItemComponent } from '../basic/basic.component';

@Component({
	selector: 'app-navigation-group-item',
	templateUrl: './group.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		MatIconModule,
		NavigationBasicItemComponent,
		forwardRef(() => NavigationGroupItemComponent)
	]
})
export class NavigationGroupItemComponent {
	// Inputs signals
	public item = input<NavigationItem>();
}
