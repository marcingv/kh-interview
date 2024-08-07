import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chartBarColor',
  standalone: true
})
export class ChartBarBgColorPipe implements PipeTransform {
  private readonly CSS_CLASSES: string[] = [
    'bg-violet-400',
    'bg-rose-400',
    'bg-orange-400'
  ];

  public transform(index: number): string {
    return this.CSS_CLASSES[index % this.CSS_CLASSES.length];
  }
}
