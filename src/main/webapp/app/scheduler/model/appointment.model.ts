import { User } from 'app/core/user/user.model';

export class Appointment {
  public constructor(
    public id?: string,
    public title?: string,
    public description?: string,
    public doctor?: User,
    public start?: Date,
    public end?: Date
  ) {}
}
