import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { Appointment } from './appointment.model';
import { Observable, Subscription } from 'rxjs';
import { User } from 'app/core/user/user.model';
import * as SchedulerActions from './store/scheduler.actions';
import * as fromRoot from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit, OnDestroy {
  selectedDoctor$: Subscription;
  appointments$: Observable<Appointment[]>;
  loadingAppointments$: Observable<boolean>;

  selectedDoctor: User;
  events: Observable<Appointment[]>;
  calendarEvents: Appointment[];

  @ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent; // the #calendar in the template
  @Input() calendarSlotDuration = '00:30:00';

  calendarVisible = true;
  calendarWeekends = false;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarHeader = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
  };
  userCriteria = {
    role: 'ROLE_DOCTOR'
  };

  constructor(private store: Store<fromRoot.State>) {}

  ngOnDestroy() {
    this.store.dispatch(SchedulerActions.clearSelectedDoctor());
  }

  ngOnInit() {
    this.appointments$ = this.store.select(fromRoot.getAppointmentList);
    this.loadingAppointments$ = this.store.select(fromRoot.getLoadingAppointments);
    this.store.select(fromRoot.getSelectedDoctor).subscribe(doctor => (this.selectedDoctor = doctor));
  }

  onViewChange($event) {
    const startDate = new Date($event.currentStart);
    const endDate = new Date($event.currentEnd);
    this.store.dispatch(SchedulerActions.setStartDate({ startDate }));
    this.store.dispatch(SchedulerActions.setEndDate({ endDate }));
    this.store.dispatch(SchedulerActions.tryGetAppointments());
  }

  onDoctorSelected(doctor: User) {
    this.store.dispatch(SchedulerActions.setSelectedDoctor({ user: doctor }));
    this.store.dispatch(SchedulerActions.tryGetAppointments());
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  handleEventClick(args: any) {
    this.store.dispatch(
      SchedulerActions.setSelectedAppointment({ appointment: args.event ? this.readAppointment(args.event) : this.initAppointment(args) })
    );
  }

  onNewAppointment() {
    this.store.dispatch(SchedulerActions.setSelectedAppointment({ appointment: this.initAppointment() }));
  }

  onDoctorCleared() {
    this.store.dispatch(SchedulerActions.clearSelectedDoctor());
  }

  readAppointment(appointmentData: any) {
    const startDate = new Date(appointmentData.start);
    const endDate = new Date(appointmentData.end);
    return new Appointment(
      appointmentData.id,
      appointmentData.title,
      appointmentData.extendedProps.description,
      appointmentData.extendedProps.doctor,
      startDate,
      endDate
    );
  }

  initAppointment(appointmentData?: any) {
    const startDate = appointmentData ? new Date(appointmentData.start) : new Date();
    const endDate = appointmentData ? new Date(appointmentData.end) : new Date();
    return new Appointment(null, null, null, this.selectedDoctor, startDate, endDate);
  }
}
