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
  constructor(private httpclient: HttpClient) { }
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

  public afficher(form: any, page: any, size: any) {
    if (form){
    const params = new HttpParams()
      .set('departure', form.value.from || '')
      .set('destination', form.value.to || '')
      .set('date', form.value.departure || '')
      .set('returnDate', form.value.return || '')
      .set('minPrice', form.value.minPrice || 0)
      .set('maxPrice', form.value.maxPrice || 0)
      .set('type', form.value.type || '')
      .set('nbPlaces', form.value.nbAdult+form.value.nbChildren || 0);
console.log(params);

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
  public getBookings(page: any, size: any) {
    return this.httpclient.get(`${this.PATH_OF_BOOKING_API}/flightBookings?page=${page}&size=${size}`);
  }
  public getFlightBookingByUserId(id: any, page: any, size: any) {
    return this.httpclient.get(`${this.PATH_OF_BOOKING_API}/UserFlightBookings?id=${id}&page=${page}&size=${size}`);
  }
  public getFlightBookingById(id: any) {
    return this.httpclient.get(`${this.PATH_OF_BOOKING_API}/flightBookings/${id}`);
  }
  public setFlightBookingStatus(id: any,status:any) {
    return this.httpclient.put(`${this.PATH_OF_BOOKING_API}/setStatus/${id}`,{status:status});
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
<<<<<<< HEAD
=======
  public deleteReservationByFlightId(id: any) {
    return this.httpclient.delete(`${this.PATH_OF_BOOKING_API}/deleteByFlightId/${id}`);
  }
>>>>>>> 1459f06eb693b6483cd05cbc177f59143d69fdf4
  public bookFlight(form: any) {
    return this.httpclient.post(`${this.PATH_OF_BOOKING_API}/reserver`, form);
  }
  public sendFlightEmail(flight: any,flightBooking: any,user : any) {
    const emailData = {
      flight: flight,
      flightBooking: flightBooking,
      user: user
    };
    console.log("My email data" ,emailData);

    return this.httpclient.post(`${this.PATH_OF_BOOKING_API}/send-email`, emailData);
  }
  public getUserById(id: any) {
    return this.httpclient.get(`${this.PATH_OF_USER_API}/users/${id}`);
  }
}

