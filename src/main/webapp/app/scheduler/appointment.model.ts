import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

export class Appointment {
  public constructor(
    public id?: string,
    public subject?: string,
    public description?: string,
    public appointmentStart?: Date,
    public appointmentEnd?: Date
  ) {}
}
