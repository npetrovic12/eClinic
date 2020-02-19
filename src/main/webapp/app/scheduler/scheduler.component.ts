import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SchedulerService } from './scheduler.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentDetailsModalComponent } from './appointment-details-modal/appointment-details-modal.component';
import { Appointment } from './appointment.model';
import { AppointmentStore } from './appointmentStore.service';

@Component({
  selector: 'scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  @ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent; // the #calendar in the template
  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  @Input() calendarSlotDuration = '00:30:00';
  calendarEvents: EventInput[] = [
    { title: 'Hehehe', start: '2020-02-17T15:00:00', end: '2020-02-17T16:00:00', description: 'Test' },
    { title: 'Title', start: '2020-02-17T13:00:00', end: '2020-02-17T15:00:00' }
  ];
  constructor(private schedulerService: SchedulerService, private appointmentStore: AppointmentStore, private modalService: NgbModal) {}

  ngOnInit() {}

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  handleEventClick(args: any) {
    console.log(args);
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
    newAppointment.appointmentStart = startDate;
    newAppointment.appointmentEnd = endDate;
    return newAppointment;
  }

  onUserSelected(data: any) {
    console.log(data);
  }
}
