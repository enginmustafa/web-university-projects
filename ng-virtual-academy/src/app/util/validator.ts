import { FormGroup, RequiredValidator } from '@angular/forms';
import { ControlName } from './variables';

export class ValidatorUtil {

    private fc : FormGroup;

    constructor(formComponent: FormGroup) {
        this.fc=formComponent;
    }
    
    public isValid() {
        return this.fc.valid;
    }

    public getError(): string {
        let errMessage:string;
        let foundError: boolean;

        Object.keys(this.fc.controls).forEach(key => {
            //if validation failed, search for other(angular doesnt provide break from forEach)
            if(!foundError) {
                if(this.fc.get(key).invalid) {
                    if(this.fc.get(key).getError('required')) {
                        errMessage = this.getControlName(key.toString()) + ' is required.';
                    }
                    else if(this.fc.get(key).getError('minlength')) {
                        errMessage = this.getControlName(key.toString()) + ' is too short.';
                    }
                    else if(this.fc.get(key).getError('maxlength')) {
                        errMessage = this.getControlName(key.toString()) + ' is too long.';
                    }
                    else if(this.fc.get(key).getError('email')) {
                        errMessage = this.getControlName(key.toString()) + ' is not recognized as proper email format.';
                    }
                    else {
                        errMessage = this.getControlName(key.toString()) + ' is not in proper form.';
                    }

                    foundError=true;
                }
            }   
          });
          return errMessage;

    }

    private getControlName(fcName: string): string {
        let controlName: string;

        switch(fcName) {
            case ControlName.firstName:
                controlName = 'First name';
                break;
            case ControlName.lastName:
                controlName= 'Last name';
                break;
            case ControlName.password:
                controlName = 'Password';
                break;
            case ControlName.repeatPassword:
                controlName= 'Repeat password';
                break;
            case ControlName.email:
                controlName = 'Email';
                break;
            case ControlName.title:
                controlName = 'Title';
                break;
            case ControlName.description:
                controlName = "Description";
                break;
            case ControlName.publishDate:
                controlName = 'Publish date';
                break;
            case ControlName.rating:
                controlName = "Rating";
                break;
            default:
                controlName = "[Unrecognized field]";
                break;
        }

        return controlName;
    }
}