export class AppointmentCriteria {
  constructor(
    public searchText?: string,
    public startDate?: Date,
    public endDate?: Date,
    public doctorId?: string // id
  ) {}
}
