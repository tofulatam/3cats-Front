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
		// Register heroicons icon sets
		this._matIconRegistry.addSvgIconSetInNamespace(
			'heroicons_outline',
			this._domSanitizer.bypassSecurityTrustResourceUrl('icons/heroicons/heroicons-outline.svg')
		);
		this._matIconRegistry.addSvgIconSetInNamespace(
			'heroicons_solid',
			this._domSanitizer.bypassSecurityTrustResourceUrl('icons/heroicons/heroicons-solid.svg')
		);
		this._matIconRegistry.addSvgIconSetInNamespace(
			'heroicons_mini',
			this._domSanitizer.bypassSecurityTrustResourceUrl('icons/heroicons/heroicons-mini.svg')
		);

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
