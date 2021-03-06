package com.eclinic.domain;

import java.io.Serializable;
import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import io.swagger.annotations.ApiModelProperty;

@Document(collection = "appointments")
public class Appointment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("title")
    @ApiModelProperty(required = true)
    @TextIndexed
    private String title;

    @Field("description")
    @TextIndexed
    private String description;

    @ApiModelProperty(required = true)
    @Field("doctor")
    @DBRef
    private User doctor;

    @ApiModelProperty(required = true)
    @Field("appointmentStart")
    private Instant start;

    @ApiModelProperty(required = true)
    @Field("appointmentEnd")
    private Instant end;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getStart() {
        return start;
    }

    public void setStart(Instant start) {
        this.start = start;
    }

    public Instant getEnd() {
        return end;
    }

    public void setEnd(Instant end) {
        this.end = end;
    }

    public User getDoctor() {
        return doctor;
    }

    public void setDoctor(User doctor) {
        this.doctor = doctor;
    }
}

    
