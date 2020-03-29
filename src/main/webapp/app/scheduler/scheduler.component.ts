import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { Appointment } from './appointment.model';
import { AppointmentStore } from './appointmentStore.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { distinctUntilChanged } from 'rxjs/operators';
import { User } from 'app/core/user/user.model';

@Component({
  selector: 'scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit, OnDestroy {
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
  events: Observable<Appointment[]>;
  calendarEvents: Appointment[];
  calendarEvents$: Subscription;
  selectedDoctor: User;
  selectedDoctor$: Subscription;
  constructor(private store: AppointmentStore) {}

  ngOnDestroy(): void {
    this.calendarEvents$.unsubscribe();
  }

  ngOnInit() {
    this.calendarEvents$ = this.store.state$
      .pipe(
        map(state => state.appointmentList),
        distinctUntilChanged()
      )
      .subscribe(res => (this.calendarEvents = res));

    this.selectedDoctor$ = this.store.state$
      .pipe(
        map(state => state.selectedDoctor),
        distinctUntilChanged()
      )
      .subscribe(res => (this.selectedDoctor = res));
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  handleEventClick(args: any) {
    if (args.event) {
      this.store.select(this.readAppointment(args.event));
    } else {
      this.store.select(this.initAppointment(args));
    }
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
    const newAppointment = new Appointment();
    newAppointment.start = startDate;
    newAppointment.end = endDate;
    newAppointment.doctor = this.selectedDoctor;
    return newAppointment;
  }

  onNewAppointment() {
    this.store.select(this.initAppointment());
  }

  onViewChange($event) {
    const startDate = new Date($event.currentStart);
    const endDate = new Date($event.currentEnd);
    this.store.fetchAppointments(startDate, endDate, this.selectedDoctor.id);
  }

  onUserSelected(data: any) {
    this.store.selectDoctor(data);
  }
}
