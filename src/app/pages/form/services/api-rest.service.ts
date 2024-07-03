// src/app/services/language.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectOption } from '../../../shared/models/components.models';

interface Country {
  name: {
    common: string;
  };
  cca2: string;
  languages?: {
    [key: string]: string;
  };
  region: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private apiUrl = 'https://restcountries.com/v3.1/all?fields=name,cca2,languages,region';

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<SelectOption[]> {
    return this.http.get<Country[]>(this.apiUrl).pipe(
      map((countries: Country[]) => {
        const languages: { [key: string]: Set<string> } = {};
        const languageOptions: { [key: string]: SelectOption } = {};
        
        countries.forEach(country => {
          if (country.languages) {
            Object.entries(country.languages).forEach(([_key, language]) => {
              if (!languages[language]) {
                languages[language] = new Set();
              }
              languages[language].add(country.name.common);

              /** Only add to languageOptions if it doesn't already exist */ 
              if (!languageOptions[language]) {
                languageOptions[language] = {
                  label: language,
                  value: language.toUpperCase().slice(0, 5),
                  description: Array.from(languages[language]).join(', ')
                };
              }
            });
          }
        });

        /** Update descriptions with all country names for each language */
        Object.entries(languageOptions).forEach(([language, option]) => {
          option.description = Array.from(languages[language]).join(', ');
        });

        return Object.values(languageOptions);
      })
    );
  }

  getCountries(): Observable<SelectOption[]> {
    return this.http.get<Country[]>(this.apiUrl).pipe(
      map((countries: Country[]) => countries.map(country => ({
        label: country.name.common,
        value: country.cca2,
        description: country.region
      })))
    );
  }
}