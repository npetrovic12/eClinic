package com.eclinic.domain.dto;

import javax.validation.constraints.Size;

import com.eclinic.domain.Department;

public class UserCriteria {

    @Size(max = 200)
    private String searchText;

    private Department department;

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

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
}