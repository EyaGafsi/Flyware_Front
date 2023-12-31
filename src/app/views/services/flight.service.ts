import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  PATH_OF_API = "http://localhost:3000";
  PATH_OF_BOOKING_API = "http://localhost:3001";
  PATH_OF_USER_API = "http://localhost:3002";

  private selectedFlight: any;
  private currentPage: any;

  setSelectedFlight(flight: any) {
    this.selectedFlight = flight;
  }
  getSelectedFlight() {
    return this.selectedFlight;
  }
  setCurrentPage(currentPage: any) {
    this.currentPage = currentPage;
  }
  getCurrentPage() {
    return this.currentPage;
  }
  constructor(private httpclient: HttpClient) { }
  public afficher(form: any, page: any, size: any) {
    if (form){
    const params = new HttpParams()
      .set('departure', form.value.from || '')
      .set('destination', form.value.to || '')
      .set('date', form.value.departure || '')
      .set('returnDate', form.value.return || '')
      .set('price', form.value.price || '');

    return this.httpclient.get(`${this.PATH_OF_API}/flights?page=${page}&size=${size}`, { params });}
    return this.httpclient.get(`${this.PATH_OF_API}/flights?page=${page}&size=${size}`);
  }
  public add(form: any) {
    return this.httpclient.post(this.PATH_OF_API + '/flights', form);
  }
  public update(id: any, form: any) {
    return this.httpclient.put(`${this.PATH_OF_API}/flights/${id}`, form);
  }
  public delete(id: any) {
    return this.httpclient.delete(`${this.PATH_OF_API}/flights/${id}`);
  }
  public getFlightById(id: any) {
    return this.httpclient.get(`${this.PATH_OF_API}/flights/${id}`);
  }

  public getDestinations() {
    return this.httpclient.get(`${this.PATH_OF_API}/destinations`);
  }
  public getDepartures() {
    return this.httpclient.get(`${this.PATH_OF_API}/departures`);
  }
  public getBookings() {
    return this.httpclient.get(`${this.PATH_OF_BOOKING_API}/flightBookings`);
  }
  public getFlightBookingByUserId(id: any) {
    return this.httpclient.get(`${this.PATH_OF_BOOKING_API}/UserFlightBookings/${id}`);
  }
  public getFlightBookingById(id: any) {
    return this.httpclient.get(`${this.PATH_OF_BOOKING_API}/flightBookings/${id}`);
  }
  public acceptFlightBooking(id: any) {
    return this.httpclient.put(`${this.PATH_OF_BOOKING_API}/accept/${id}`,null);
  }
  public refuseFlightBooking(id: any) {
    return this.httpclient.put(`${this.PATH_OF_BOOKING_API}/refuse/${id}`,null);
  }
  public editFlightBooking(form: any) {
    console.log(form);

    return this.httpclient.put(`${this.PATH_OF_BOOKING_API}/updateBooking`,form);
  }
  public cancelFlightBooking(id: any) {
    return this.httpclient.delete(`${this.PATH_OF_BOOKING_API}/cancelBooking/${id}`);
  }
  public bookFlight(form: any) {
    return this.httpclient.post(`${this.PATH_OF_BOOKING_API}/reserver`, form);
  }
  public getUserById(id: any) {
    return this.httpclient.get(`${this.PATH_OF_USER_API}/users/${id}`);
  }
}

