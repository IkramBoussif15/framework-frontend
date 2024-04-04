import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    return '' +
      '<div>Capital: "Madrid" </div>' +
      '<div>State: "SPAIN"</div>'

  }
}
