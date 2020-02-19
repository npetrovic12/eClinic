package com.eclinic.domain;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "appointments")
public class Appointment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("subject")
    private String subject;

    @Field("description")
    private String description;

    @Field("appointmentDate")
    private Instant appointmentDate;

    @Field("appointmentTime")
    private long appointmentTime;

    // public List<Instant> getAvailableTimes(List<Appointment> appointments) {
    //     return appointments.stream().map(appointment -> appointment.getAppointmentDateollect(Collectors.toList());
    // }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSubject() {
        return this.subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getAppointmentDate() {
        return this.appointmentDate;
    }

    public void setAppointmentDate(Instant appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public void setAppointmentTime(long appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public long getAppointmentTime() {
        return this.appointmentTime;
    }
}

    
