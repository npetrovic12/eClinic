package com.eclinic.web.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.web.util.HeaderUtil;
import io.micrometer.core.annotation.Timed;
import io.swagger.annotations.ApiParam;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import com.eclinic.domain.Appointment;
import com.eclinic.domain.dto.AppointmentCriteria;
import com.eclinic.web.rest.errors.BadRequestAlertException;
import com.eclinic.util.misc.Misc;

import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
        log.debug("REST request to save an appointment : {}", appointment);
        if (appointment.getId() != null) {
            throw new BadRequestAlertException("A new appointment cannot already have an ID", ENTITY_NAME, "idexists");
        }

        mongoTemplate.save(appointment);
        
        return ResponseEntity.created(new URI("/api/appointments/" + appointment.getId()))
        .headers(HeaderUtil.createEntityCreationAlert("eClinicApp", false, ENTITY_NAME, appointment.getId().toString()))
        .body(appointment);
    }

    @PutMapping(value="/appointments")
    @Timed
    public ResponseEntity<Appointment> updateAppointment(@RequestBody Appointment appointment) throws URISyntaxException {
        log.debug("REST request to update an appointment : {}", appointment);
        if (appointment.getId() == null) {
            return createAppointment(appointment);
        }

        mongoTemplate.save(appointment);
        
        return ResponseEntity.ok()
        .headers(HeaderUtil.createEntityUpdateAlert("eClinicApp", false, ENTITY_NAME, appointment.getId().toString()))
        .body(appointment);
    }

    @DeleteMapping("/appointments/{id}")
    @Timed
    public ResponseEntity<Void> deleteAppointment(@PathVariable String id) {
        log.debug("REST request to delete EndPoint : {}", id);
        Query q = new Query();
        q.addCriteria(Criteria.where("id").is(id));
        mongoTemplate.remove(q, Appointment.class);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("eClinicApp", false, ENTITY_NAME, id))
        .build();
    }

    @PostMapping("/appointments/filter")
    @Timed
    public ResponseEntity<List<Appointment>> getAppointmentsByCriteria(@ApiParam Pageable pageable, @RequestBody AppointmentCriteria criteria) {
        Query q = new Query();
        if(criteria != null && criteria.getSearchText() != null && !"".equals(criteria.getSearchText().trim())) {
            String searchText = Misc.enableAndSearchText(criteria.getSearchText());
            q.addCriteria(TextCriteria.forDefaultLanguage().caseSensitive(false).matching(searchText));
        }

        String doctorId = criteria.getDoctorId();
        System.out.println(doctorId);
        if(criteria != null && doctorId != null && !"".equals(doctorId.trim())) {
            try {
                q.addCriteria(Criteria.where("doctor.$id").is(new ObjectId(doctorId)));   
            } catch (Exception e) {
                q.addCriteria(Criteria.where("doctor.$id").is(doctorId));
            }
        }

        if(criteria != null && criteria.getStartDate() != null && criteria.getEndDate() != null) {
            LocalDateTime localDataTimeStart;
            if(criteria.getStartDate() != null){
                localDataTimeStart = LocalDateTime.ofInstant(criteria.getStartDate(), ZoneId.systemDefault());
            } else {
                localDataTimeStart = LocalDateTime.now().minusYears(100);
            }

            LocalDateTime localDateTimeEnd;
            if(criteria.getEndDate() != null) {
                localDateTimeEnd = LocalDateTime.ofInstant(criteria.getEndDate(), ZoneId.systemDefault());
            } else {
                localDateTimeEnd = LocalDateTime.now().plusYears(100);
            }

            q.addCriteria(new Criteria().andOperator(
                Criteria.where("appointmentStart").lt(localDateTimeEnd.atZone(ZoneId.systemDefault()).toInstant()),
                Criteria.where("appointmentEnd").gt(localDataTimeStart.atZone(ZoneId.systemDefault()).toInstant())
            ));
        }

        List<Appointment> result = mongoTemplate.find(q, Appointment.class);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // @PostMapping("/appointments/available")
    // @Timed
    // public ResponseEntity<Boolean> checkAvailability(@RequestBody AppointmentCriteria criteria) {
    //     boolean available = false;
    //     System.out.print(getAppointmentsByCriteria(criteria).getBody());
    //     if(getAppointmentsByCriteria(criteria).getBody().isEmpty()) {
    //         available = true;
    //     } else {
    //         available = false;
    //     }
    //     return new ResponseEntity<>(available, HttpStatus.OK);
    // }
}