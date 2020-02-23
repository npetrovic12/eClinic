import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { Appointment } from './appointment.model';
import { AppointmentStore } from './appointmentStore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
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
  constructor(private appointmentStore: AppointmentStore) {}

  ngOnInit() {
    this.events = this.appointmentStore.appointmentList;
    this.events.subscribe(ev => {
      this.calendarEvents = ev;
    });
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  handleEventClick(args: any) {
    if (args.event) {
      this.appointmentStore.select(this.readAppointment(args.event));
    } else {
      this.appointmentStore.select(this.initAppointment(args));
    }
  }

  readAppointment(appointmentData: any) {
    const startDate = new Date(appointmentData.start);
    const endDate = new Date(appointmentData.end);
    return new Appointment(appointmentData.id, appointmentData.title, appointmentData.extendedProps.description, startDate, endDate);
  }

  initAppointment(appointmentData: any) {
    const startDate = new Date(appointmentData.start);
    const endDate = new Date(appointmentData.end);
    const newAppointment = new Appointment();
    newAppointment.start = startDate;
    newAppointment.end = endDate;
    return newAppointment;
  }

  onViewChange($event) {
    const startDate = new Date($event.currentStart);
    const endDate = new Date($event.currentEnd);
    this.appointmentStore.query(startDate, endDate);
  }

  onUserSelected(data: any) {
    console.log(data);
  }
}
