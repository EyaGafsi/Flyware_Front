import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  PATH_OF_API="http://localhost:3000";
  requestHeader=new HttpHeaders(
{"No-Auth":"True"}
  );
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
  constructor(private httpclient:HttpClient) { }
  public afficher(page:any, size:any) {
    return this.httpclient.get(`${this.PATH_OF_API}/flights?page=${page}&size=${size}`);
 }
 public add(form:any) {
  return this.httpclient.post(this.PATH_OF_API+'/flights',form,{headers:this.requestHeader});
}
public update(id:any,form:any) {
  return this.httpclient.put(`${this.PATH_OF_API}/flights/${id}`,form);
}
public delete(id:any) {
  return this.httpclient.delete(`${this.PATH_OF_API}/flights/${id}`);
}
public getFlightById(id:any) {
  return this.httpclient.get(`${this.PATH_OF_API}/flights/${id}`);}
}

