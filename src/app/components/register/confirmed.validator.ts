import { FormGroup, AbstractControl, ValidatorFn } from "@angular/forms";



export function MustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => 
    {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];


        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            return null;
        }


        if (control?.value !== matchingControl?.value) {
            matchingControl.setErrors({ mustMatch: true });
            //return { matching: true };
        }else {
            matchingControl.setErrors(null)
        }
    }
};
