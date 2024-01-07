import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  apiUrl = 'http://localhost:8081/hotels';
  requestHeader = new HttpHeaders({ "No-Auth": "True" });
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

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
  }

  createHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.apiUrl, hotel);
  }

  updateHotel(id: number, hotel: Hotel): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, hotel);
  }

  deleteHotel(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${id}`;
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
    const url = `${this.apiUrl}/advancedSearchHotels`;
    let params = new HttpParams()
      .set('name', name)
      .set('address', address)
      .set('country', country)
      .set('location', location)
      .set('checkIn', checkIn)
      .set('checkOut', checkOut)
      .set('duration', duration)
      .set('members', members != null ? members.toString() : '');

    return this.http.get(url, { params });
  }

  public getCountries() {
    return this.http.get<any>(`${this.apiUrl}/countries`);
  }

  public getLocations() {
    return this.http.get(`${this.apiUrl}/locations`);
  }

  public afficherHotel(form: any, page: any, size: any): Observable<any> {
    const params = new HttpParams()
      .set('country', form.value.country || '')
      .set('location', form.value.location || '')
      .set('checkIn', form.value.checkIn || '')
      .set('checkOut', form.value.checkOut || '')
      .set('duration', form.value.duration || '')
      .set('members', form.value.members || '');

    return this.http.get(`${this.apiUrl}/hotels?page=${page}&size=${size}`, { params });
  }
}
