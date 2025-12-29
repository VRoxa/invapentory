import { inject, Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "../services/translate.service";

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private readonly service = inject(TranslateService);

  transform(label: string) {
    return this.service.translate(label);
  }
}
