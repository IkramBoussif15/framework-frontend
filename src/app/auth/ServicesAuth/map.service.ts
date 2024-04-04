import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PopUpService } from 'src/app/services/pop-up.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  capitals: string = '/assets/data/usa-capitals.geo.json';

  constructor(private http: HttpClient, private popupService: PopUpService) {
  }

  makeCapitalMarkers(map: L.Map): void {
    this.getListMap().subscribe((res: any) => {
      console.log(res);

      for (const c of res) {
        const lat = c.latitude;
        const lon = c.longitude;
        const marker = L.marker([lat, lon]).addTo(map);
       }
    });
  }



  makeCapitalCircleMarkers(map: L.Map): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        const circle = L.circleMarker([lon, lat]);
        circle.bindPopup(this.popupService.makeCapitalPopup(c.geometry.type));

        circle.addTo(map);
      }
    });
  }



getServiceCreateAdress(): Observable<any> {
  return this.http.get(environment.baseUrl +'/business/adress/getServiceId');
}
getListMap(): Observable<any> {
  return this.http.get(environment.baseUrl +'/business/map/listMap');
}
}