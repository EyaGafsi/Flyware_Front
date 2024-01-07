import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient ,HttpHeaders , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
   apiUrl = 'http://localhost:8081/hotels';
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

  createHotelWithDetails(hotel: Hotel): Observable<Hotel> {
    const createUrl = `${this.apiUrl}/create-with-details`;
    return this.http.post<Hotel>(createUrl, hotel);
  }

  advancedSearchHotels(
    name: string,
    address: string,
    country: string,
    location: string,
    checkIn: string,
    checkOut: string,
    duration: string,
    members: number | null
  ): Observable<any> {
    console.log('Paramètres reçus :', name, address, country, location, checkIn, checkOut, duration, members);

    const url = `${this.apiUrl}/advancedSearchHotels`;
    let params = new HttpParams()
      // ... (votre logique de construction des paramètres)
      .set('name', name)
      .set('address', address)
      .set('country', country)
      .set('location', location)
      .set('checkIn', checkIn)
      .set('checkOut', checkOut)
      .set('duration', duration)
      .set('members', members != null ? members.toString() : '');

    console.log('Paramètres de la requête :', params.toString()); // Vérifiez les paramètres de la requête

    return this.http.get(url, { params });
  }
  public getCountries() {
    return this.http.get<any>(`${this.apiUrl}/hotels/countries`);
  }

  public getLocations() {
    return this.http.get(`${this.apiUrl}/locations`);}


   public afficherHotel(form: any, page: any, size: any) { // Correction du nom de la méthode
    const params = new HttpParams()
      .set('country', form.value.country || '')
      .set('location', form.value.location || '')
      .set('checkIn', form.value.checkIn || '')
      .set('checkOut', form.value.checkOut || '')
      .set('duration', form.value.duration || '')
      .set('members', form.value.members || '');

    return this.http.post(`${this.PATH_OF_BOOKING_API}/sendHotelEmail`, emailData);
  }


}
