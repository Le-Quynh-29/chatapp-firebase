import { ValidatorFn, AbstractControl } from '@angular/forms';
import { IMG_REGEX } from '../constants/regex';

export function contentImageValidator(): ValidatorFn {
    let nameRe: RegExp = IMG_REGEX;
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = control.value.match(nameRe);
      return forbidden ? {content_image: {value: control.value}} : null;
    };
  }
