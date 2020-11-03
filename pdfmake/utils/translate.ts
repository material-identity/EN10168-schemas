import * as FR from '../../FR.json';
import * as EN from '../../EN.json';
import * as DE from '../../DE.json';
import * as PL from '../../PL.json';

import {CertificateLanguages} from "../types/schemaTypes"

export class Translate {
  languages: CertificateLanguages;
  translation: {}

  constructor (_languages: CertificateLanguages){
  this.languages = _languages;
  this.translation = { FR, EN, DE, PL };
  }

  translate(phrase: string, group: string): string{
    if (group === 'certificateFields') return `${phrase} ${this.languages.map(language =>
      this.translation[language][group][phrase]).join(' / ')}`;
    return this.languages.map(language => this.translation[language][group][phrase]).join(' / ')
  }
}