import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value) return '';

    return value.length > 2 
      ? `+${value.slice(0, 2)} ${value.slice(2)}` 
      : value;
  }
}
