package com.eclinic.domain.dto;

import javax.validation.constraints.Size;

public class UserCriteria {

    @Size(max = 200)
    private String searchText;

    private String role;

    public String getSearchText() {
        return this.searchText;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}