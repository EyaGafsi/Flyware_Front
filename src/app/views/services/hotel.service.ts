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
   PATH_OF_BOOKING_API = "http://localhost:8082";

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


  public getCountries() {
    return this.http.get<any>(`${this.apiUrl}/hotels/countries`);
  }

  public getLocations() {
    return this.http.get(`${this.apiUrl}/hotels/locations`);}


   public afficherHotel( page: any, size: any) {    console.log(`${this.apiUrl}/hotels?page=${page}&size=${size}`)

    return this.http.get(`${this.apiUrl}/hotels?page=${page}&size=${size}`);
  }



  public getBookings(page: any, size: any) {
    return this.http.get(`${this.PATH_OF_BOOKING_API}/hotelReservations?page=${page}&size=${size}`);
  }
  public getHotelBookingByUserId(id: any, page: any, size: any) {
    return this.http.get(`${this.PATH_OF_BOOKING_API}/hotelReservationsByUserId?id=${id}&page=${page}&size=${size}`);
  }
  public getHotelBookingById(id: any) {
    return this.http.get(`${this.PATH_OF_BOOKING_API}/hotelReservations/${id}`);
  }
  public setHotelBookingStatus(id: any,status:any) {
    return this.http.put(`${this.PATH_OF_BOOKING_API}/setHotelStatus/${id}`,{status:status});
  }

  public editHotelBooking(form: any) {
    console.log(form);

    return this.http.put(`${this.PATH_OF_BOOKING_API}/updateHotelBooking`,form);
  }
  public cancelHotelBooking(id: any) {
    return this.http.delete(`${this.PATH_OF_BOOKING_API}/cancelHotelBooking/${id}`);
  }
  public deleteReservationByHotelId(id: any) {
    return this.http.delete(`${this.PATH_OF_BOOKING_API}/deleteByHotelId/${id}`);
  }
  public bookHotel(form: any) {
    return this.http.post(`${this.PATH_OF_BOOKING_API}/reserveHotel`, form);
  }
  public sendHotelEmail(hotel: any,hotelBooking: any,user : any) {
    const emailData = {
      hotel: hotel,
      hotelReservation: hotelBooking,
      user: user
    };
    console.log(emailData);

    return this.http.post(`${this.PATH_OF_BOOKING_API}/sendHotelEmail`, emailData);
  }


}
