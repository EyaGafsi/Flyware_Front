// hotel.model.ts
export class Hotel {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public rating?: number,
    public imageUrl?: string  // Add imageUrl property
  ) { }
}
