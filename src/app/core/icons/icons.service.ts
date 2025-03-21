import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class IconsService {
	private readonly _domSanitizer = inject(DomSanitizer);
	private readonly _matIconRegistry = inject(MatIconRegistry);

	/**
	 * Constructor
	 */
	constructor() {
		// Register logo
		this._matIconRegistry.addSvgIcon(
			'logo',
			this._domSanitizer.bypassSecurityTrustResourceUrl('images/logo/logo.svg')
		);

		// Tournament icons
		this._matIconRegistry.addSvgIcon(
			'tournament-icon',
			this._domSanitizer.bypassSecurityTrustResourceUrl('images/cards/tournament.svg')
		);
	}
}
