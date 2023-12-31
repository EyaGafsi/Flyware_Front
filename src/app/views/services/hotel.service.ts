// hotel.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:8081/hotels';

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

  // Add a new method to search hotels with additional parameters
  searchHotels(name: string, address: string): Observable<Hotel[]> {
    const searchUrl = `${this.apiUrl}/search?name=${name}&address=${address}`;
    return this.http.get<Hotel[]>(searchUrl);
  }

  // Add a new method to create hotel with additional fields
  createHotelWithDetails(hotel: Hotel): Observable<Hotel> {
    // Update the API URL to match your Spring Boot endpoint for creating hotels with details
    const createUrl = `${this.apiUrl}/create-with-details`;
    return this.http.post<Hotel>(createUrl, hotel);
  }
}
