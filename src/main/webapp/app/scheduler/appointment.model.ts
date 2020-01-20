export class AppointmentModel {
  public constructor(
    public text?: string,
    public allDay?: boolean,
    public description?: string,
    public startDate?: Date,
    public endDate?: Date,
    public recurrenceRule?: string
  ) {}
}
