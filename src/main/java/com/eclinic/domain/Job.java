package com.eclinic.domain;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Field;

import io.swagger.annotations.ApiModelProperty;

@org.springframework.data.mongodb.core.mapping.Document(collection = "job")
public class Job implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @ApiModelProperty(required = true)
    @Field("title")
    @TextIndexed
    private String title;

    @ApiModelProperty(required = false)
    @Field("description")
    @TextIndexed
    private String description;

    @ApiModelProperty(required = true)
    @Field("bookable")
    private boolean bookable;
    
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

    public String getDescription(){
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getBookable() {
        return this.bookable;
    }

    public void setBookable(Boolean bookable) {
        this.bookable = bookable;
    }
}