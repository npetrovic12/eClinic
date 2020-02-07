import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SchedulerService } from './scheduler.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentDetailsModalComponent } from './appointment-details-modal/appointment-details-modal.component';

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
  calendarEvents: EventInput[] = [{ title: 'Event Now', start: new Date() }];
  constructor(private schedulerService: SchedulerService, private modalService: NgbModal) {}

  ngOnInit() {}

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  handleDateClick(args: any) {
    const modalRef = this.modalService.open(AppointmentDetailsModalComponent);
    modalRef.componentInstance.title = 'Appointment';
    console.log(args);
  }

  onUserSelected(data: any) {
    console.log(data);
  }
}
