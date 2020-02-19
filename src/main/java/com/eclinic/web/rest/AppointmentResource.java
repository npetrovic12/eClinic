package com.eclinic.web.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.micrometer.core.annotation.Timed;
import io.swagger.annotations.ApiParam;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.Instant;
import java.util.List;

import com.eclinic.domain.Appointment;
import com.eclinic.domain.dto.AppointmentCriteria;
import com.eclinic.web.rest.errors.BadRequestAlertException;
import com.eclinic.util.misc.Misc;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
public class AppointmentResource {

    private final Logger log = LoggerFactory.getLogger(AppointmentResource.class);
    
    private static final String ENTITY_NAME = "appointment";
    private final Appointment appointment = new Appointment();

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

    @PostMapping("/appointments/filter")
    public ResponseEntity<List<Appointment>> getAppointmentsByCriteria(@ApiParam Pageable pageable, @RequestBody AppointmentCriteria criteria) {
        Query q = new Query();
        if(criteria != null && criteria.getSearchText() != null && !"".equals(criteria.getSearchText().trim())) {
            String searchText = Misc.enableAndSearchText(criteria.getSearchText());
            q.addCriteria(TextCriteria.forDefaultLanguage().caseSensitive(false).matching(searchText));
        }

        if(criteria != null && criteria.getFromAppointmentDate() != null && criteria.getToAppointmentDate() != null) {
            q.addCriteria(new Criteria().andOperator(Criteria.where("appointmentDate")
            .gte(criteria.getFromAppointmentDate()).lte(criteria.getToAppointmentDate())));
        }

        if(pageable != null) {
            q.with(pageable);
        }

        List<Appointment> result = mongoTemplate.find(q, Appointment.class);
        Page<Appointment> page = PageableExecutionUtils.getPage(result, pageable, () -> mongoTemplate.count(q, Appointment.class));
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(UriComponentsBuilder.fromPath("api/appointments/filter"), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    // @PostMapping("/appointments/available")
    // public ResponseEntity<List<Instant>> getAvailableAppointments(@RequestBody AppointmentCriteria criteria) {
    //     Query q = new Query();
        
    //     if(criteria != null && criteria.getFromAppointmentDate() != null && criteria.getToAppointmentDate() != null) {
    //         q.addCriteria(new Criteria().andOperator(Criteria.where("appointmentDate")
    //         .gte(criteria.getFromAppointmentDate()).lte(criteria.getToAppointmentDate())));
    //     }
    //     List<Appointment> appointments = mongoTemplate.find(q, Appointment.class);
    //     // List<Instant> result = appointment.getAvailableTimes(appointments);
    //     return new ResponseEntity<List<Instant>>(result, HttpStatus.OK);
    // }
    
}