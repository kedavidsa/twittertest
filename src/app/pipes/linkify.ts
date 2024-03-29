import { Pipe, PipeTransform } from '@angular/core';
import linkifyStr from 'linkifyjs/string';

/**
 * Pipe que busca url en un texto y retorna el html con a href
 */
@Pipe({name: 'linkify'})
export class LinkifyPipe implements PipeTransform {
  transform(str: string): string {
    return str ? linkifyStr(str, {target: '_blank'}) : str;
  }
}