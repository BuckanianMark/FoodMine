import { AbstractControl } from "@angular/forms"

export const PasswordsMatchValidator = (passwordControlName:string,
    confirmPasswordControlname:string)=>{
        const validator = (form:AbstractControl) =>{
            const passwordControl = form.get(passwordControlName);
            const confirmPassword= form.get(confirmPasswordControlname);
            if(!passwordControl || !confirmPassword) return;
            if(passwordControl.value !== confirmPassword.value){
                confirmPassword.setErrors({notMatch:true})
            }else{
                const errors = confirmPassword.errors;
                if(!errors) return;

                delete errors['notMatch'];

                confirmPassword.setErrors(errors)
            }
        }
        return validator;
    }