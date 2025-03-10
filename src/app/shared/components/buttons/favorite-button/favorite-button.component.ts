import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-favorite-button',
	imports: [MatButtonModule, MatIconModule],
	templateUrl: './favorite-button.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteButtonComponent {
	/**
	 * The size of the button.
	 * Accepts size 'small', 'medium' or 'large'.
	 * Defaults to 'medium'.
	 * @type {'small' | 'medium' | 'large'}
	 */
	public size = input<'small' | 'medium' | 'large'>('medium');

	/**
	 * Whether the button is in a favorite state.
	 * Defaults to false.
	 * @type {boolean}
	 */
	public isFavorite = signal<boolean>(false);

	// -----------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------

	/**
	 * Toggles the favorite status
	 */
	public toggleFavorite(): void {
		this.isFavorite.update((isFavorite) => !isFavorite);
	}
}
