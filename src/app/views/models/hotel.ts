// hotel.model.ts
export class Hotel {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public rating?: number,
    public imageUrl?: string,
    public country?: string,
    public location?: string,
    public checkIn?: Date,
    public checkOut?: Date,
    public duration?: number,
    public members?: number
  ) { }
}
