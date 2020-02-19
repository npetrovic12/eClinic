package com.eclinic.domain.dto;

import java.time.Instant;

import javax.validation.constraints.Size;

public class AppointmentCriteria {

    @Size(max = 200)
    private String searchText;
    
    private Instant fromAppointmentDate;
    private Instant toAppointmentDate;

    public String getSearchText() {
        return this.searchText;
    }

    public Instant getFromAppointmentDate() {
        return this.fromAppointmentDate;
    }

    public Instant getToAppointmentDate() {
        return this.toAppointmentDate;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    public void setFromAppointmentDate(Instant fromAppointmentDate) {
        this.fromAppointmentDate = fromAppointmentDate;
    }

    public void setToAppointmentDate(Instant toAppointmentDate) {
        this.toAppointmentDate = toAppointmentDate;
    }
}