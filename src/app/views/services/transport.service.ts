import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  PATH_OF_API = "http://localhost:3003";
  PATH_OF_BOOKING_API = "http://localhost:3005";
  PATH_OF_USER_API = "http://localhost:3002";
  private selectedTransport: any;
  private currentPage: any;
  constructor(private httpclient: HttpClient) { }
  setSelectedTransport(transport: any) {
    this.selectedTransport = transport;
  }
  getSelectedTransport() {
    return this.selectedTransport;
  }
  setCurrentPage(currentPage: any) {
    this.currentPage = currentPage;
  }
  getCurrentPage() {
    return this.currentPage;
  }

  public afficherTransport(form: any, page: any, size: any) {
    if (form){
    const params = new HttpParams()
    .set('date', form.value.departureTransport || '')
    .set('returnDate', form.value.returnTransport || '')
    .set('destinationTransport', form.value.toTransport || '')
    .set('departureTransport', form.value.fromTransport || '')
    .set('minPrice', form.value.minPriceTransport || 0)
    .set('maxPrice', form.value.maxPriceTransport || 0)
console.log(params);

    return this.httpclient.get(${this.PATH_OF_API}/transports?page=${page}&size=${size}, { params });}
    return this.httpclient.get(${this.PATH_OF_API}/transports?page=${page}&size=${size});
  }
  public addTransport(form: any) {
    return this.httpclient.post(this.PATH_OF_API + '/transports', form);
  }
  public updateTransport(id: any, form: any) {
    return this.httpclient.put(${this.PATH_OF_API}/transports/${id}, form);
  }
  public deleteTransport(id: any) {
    return this.httpclient.delete(${this.PATH_OF_API}/transports/${id});
  }
  public getTransportById(id: any) {
    return this.httpclient.get(${this.PATH_OF_API}/transports/${id});
  }

  public getDestinationsTransport() {
    return this.httpclient.get(${this.PATH_OF_API}/destinations);
  }
  public getDeparturesTransport() {
    return this.httpclient.get(${this.PATH_OF_API}/departures);
  }
  public getBookingsTransport(page: any, size: any) {
    return this.httpclient.get(${this.PATH_OF_BOOKING_API}/transportBookings?page=${page}&size=${size});
  }
  public getTransportBookingByUserId(id: any, page: any, size: any) {
    return this.httpclient.get(${this.PATH_OF_BOOKING_API}/UserTransportBookings?id=${id}&page=${page}&size=${size});
  }
  public getTransportBookingById(id: any) {
    return this.httpclient.get(${this.PATH_OF_BOOKING_API}/transportBookings/${id});
  }
  public setTransportBookingStatus(id: any,status:any) {
    return this.httpclient.put(${this.PATH_OF_BOOKING_API}/setStatus/${id},{status:status});
  }
  public refuseTransportBooking(id: any) {
    return this.httpclient.put(${this.PATH_OF_BOOKING_API}/refuse/${id},null);
  }
  public editTransportBooking(form: any) {
    console.log(form);

    return this.httpclient.put(${this.PATH_OF_BOOKING_API}/updateBooking,form);
  }
  public cancelTransportBooking(id: any) {
    return this.httpclient.delete(${this.PATH_OF_BOOKING_API}/cancelBooking/${id});
  }
  public bookTransport(form: any) {
    return this.httpclient.post(${this.PATH_OF_BOOKING_API}/reserver, form);
  }
  public sendTransportEmail(transport: any,transportBooking: any,user : any) {
    const emailData = {
      transport: transport,
      transportBooking: transportBooking,
      user: user
    };
    console.log("My email data" ,emailData);

    return this.httpclient.post(${this.PATH_OF_BOOKING_API}/send-email, emailData);
  }
  public getUserById(id: any) {
    return this.httpclient.get(${this.PATH_OF_USER_API}/users/${id});
  }
}