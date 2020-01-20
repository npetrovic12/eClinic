package com.eclinic.web.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.web.util.HeaderUtil;
import io.micrometer.core.annotation.Timed;

import java.net.URI;
import java.net.URISyntaxException;

import com.eclinic.domain.Appointment;
import com.eclinic.web.rest.errors.BadRequestAlertException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
public class AppointmentResource {

    private final Logger log = LoggerFactory.getLogger(AppointmentResource.class);
    
    private static final String ENTITY_NAME = "appointment";

    @Autowired
    private MongoTemplate mongoTemplate; 

    @PostMapping(value="/appointments")
    @Timed
    public ResponseEntity<Appointment> createAppointment(@RequestBody Appointment appointment) throws URISyntaxException {
        log.debug("REST request to save appointment : {}", appointment);
        if (appointment.getId() != null) {
            throw new BadRequestAlertException("A new appointment cannot already have an ID", ENTITY_NAME, "idexists");
        }

        mongoTemplate.save(appointment);
        
        return ResponseEntity.created(new URI("/api/appointments/" + appointment.getId()))
        .headers(HeaderUtil.createEntityCreationAlert("eClinicApp", false, ENTITY_NAME, appointment.getId().toString()))
        .body(appointment);
    }
    
}