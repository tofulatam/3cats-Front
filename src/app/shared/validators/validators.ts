import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class customValidators {
	static emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

	/**
	 * Validator function to ensure that two form controls have matching values.
	 *
	 * @param controlPath - The path to the first control.
	 * @param matchingControlPath - The path to the second control.
	 * @returns A validator function that returns an error object if the controls' values do not match.
	 */
	static mustMatch(controlPath: string, matchingControlPath: string): ValidatorFn {
		return (formGroup: AbstractControl): ValidationErrors | null => {
			const control = formGroup.get(controlPath);
			const matchingControl = formGroup.get(matchingControlPath);

			if (!control || !matchingControl) {
				return null;
			}

			matchingControl.setErrors(null);

			if (control.value !== matchingControl.value) {
				matchingControl.setErrors({ mustMatch: true });
				return { mustMatch: true };
			}

			return null;
		};
	}
}
