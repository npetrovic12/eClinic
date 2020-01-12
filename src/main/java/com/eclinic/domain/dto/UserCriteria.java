package com.eclinic.domain.dto;

import javax.validation.constraints.Size;

public class UserCriteria {

    @Size(max = 200)
    private String searchText;


    public String getSearchText() {
        return this.searchText;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }
}