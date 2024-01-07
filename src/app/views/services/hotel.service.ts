// hotel.service.ts
import { Injectable } from '@angular/core';

import { HttpClient ,HttpHeaders , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel';


@Injectable({
  providedIn: 'root'
})
export class HotelService {
   apiUrl = 'http://localhost:8081';
   requestHeader=new HttpHeaders(
    {"No-Auth":"True"}
      );
      private selectedHotel: any;
      private currentPage: any;

      setSelectedHotel(hotel: any) {
        this.selectedHotel = hotel;
      }
      getSelectedHotel() {
        return this.selectedHotel;
      }
      setCurrentPage(currentPage: any) {
        this.currentPage = currentPage;
      }
      getCurrentPage() {
        return this.currentPage;
      }
  constructor(private http: HttpClient) { }


  getHotelById(id: any): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/hotels/${id}`);
  }

  createHotel(hotel: any){
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    // Include headers in the request
    const options = { headers: headers };

    return this.http.post(`${this.apiUrl}/hotels`, hotel, options);
  }

  updateHotel(id: any, hotel: any): Observable<any> {
    console.log(id);

    const url = `${this.apiUrl}/hotels/${id}`;
    return this.http.put(url, hotel);
  }

  deleteHotel(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/hotels/${id}`;
    return this.http.delete(deleteUrl);
  }

  public searchHotels(form: any, page: any, size: any): Observable<any> {
    const params = new HttpParams()
      .set('name', form.value.from || '')
      .set('address', form.value.to || '');

    return this.http.get(`${this.apiUrl}/hotels?page=${page}&size=${size}`, { params });
  }


  public getCountries() {
    return this.http.get<any>(`${this.apiUrl}/hotels/countries`);
  }

  public getLocations() {
    return this.http.get(`${this.apiUrl}/hotels/locations`);}


   public afficherHotel( page: any, size: any) {    console.log(`${this.apiUrl}/hotels?page=${page}&size=${size}`)

    return this.http.get(`${this.apiUrl}/hotels?page=${page}&size=${size}`);
  }
}
