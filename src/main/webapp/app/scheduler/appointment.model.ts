export class AppointmentModel {
  public constructor(
    public id?: string,
    public subject?: string,
    public description?: string,
    public startDate?: Date,
    public endDate?: Date
  ) {}
}
