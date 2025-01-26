import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalLetters',
  standalone: true,
})
export class CapitalLettersPipe implements PipeTransform {
  transform(str: string, args?: any): any {
    // let result = '';
    // for (let i = 0; i < str.length; i++) {
    //   if (i == 0 || str[i - 1] == ' ') {
    //     result += str[i].toUpperCase();
    //   } else {
    //     result += str[i];
    //   }
    // }

    //echivalent map in c#
    // let mere: Record<string, number>;
    // mere['element1'] = 0;

    const words = str.split(' ');
    //map returns a separate array instead of modifying the current one | not the same thing as map in other languages
    // const results = words.map((word) => {
    //   const mere = word.charAt(0).toUpperCase();
    //   return word;
    // });
    const results = words.map((word) => {
      const wordUpperCaseFirstLetter = word.charAt(0).toUpperCase() + word.slice(1);
      return wordUpperCaseFirstLetter;
    });
    const result = results.join(' ');
    return result;
  }
}
