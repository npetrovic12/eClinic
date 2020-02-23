package com.eclinic.domain.dto;

import java.time.Instant;

import javax.validation.constraints.Size;

public class AppointmentCriteria {

    @Size(max = 200)
    private String searchText;
    private Instant startDate;
    private Instant endDate;

    public String getSearchText() {
        return searchText;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }
}