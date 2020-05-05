package com.eclinic.domain.dto;

import javax.validation.constraints.Size;

public class JobCriteria {
    @Size(max=200)
    private String searchText;
    private String title;
    private String description;
    private Boolean bookable;

    public String getSearchText() {
        return searchText;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getBookable() {
        return bookable;
    }

    public void setBookable(Boolean bookable) {
        this.bookable = bookable;
    }   
}