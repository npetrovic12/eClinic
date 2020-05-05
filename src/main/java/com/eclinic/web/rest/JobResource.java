package com.eclinic.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import com.eclinic.domain.Job;
import com.eclinic.domain.dto.JobCriteria;
import com.eclinic.security.AuthoritiesConstants;
import com.eclinic.util.misc.Misc;
import com.eclinic.web.rest.errors.BadRequestAlertException;

import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.web.util.HeaderUtil;
import io.micrometer.core.annotation.Timed;

@RestController
@RequestMapping("/api")
public class JobResource {
    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    private static final String ENTITY_NAME = "job";

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping("/jobs")
    @PreAuthorize("hasRole(\"" + AuthoritiesConstants.ADMIN + "\")")
    @Timed
    public ResponseEntity<Job> createJob(@Valid @RequestBody Job job) throws URISyntaxException {
        log.debug("REST request to save job : {}", job);
        if(job.getId() != null) {
            throw new BadRequestAlertException("A new job cannot already have an ID", ENTITY_NAME, "idexists");
        }
        mongoTemplate.save(job);

        return ResponseEntity.created(new URI("/api/jobs/" + job.getId()))
        .headers(HeaderUtil.createEntityCreationAlert("eClinicApp", false, ENTITY_NAME, job.getId().toString()))
        .body(job);
    }

    @PutMapping("/jobs")
    @Timed
    public ResponseEntity<Job> updateJob(@RequestBody Job job) throws URISyntaxException {
        log.debug("REST request to update a job : {}", job);
        if (job.getId() == null) {
            return createJob(job);
        }

        mongoTemplate.save(job);
        
        return ResponseEntity.ok()
        .headers(HeaderUtil.createEntityUpdateAlert("eClinicApp", false, ENTITY_NAME, job.getId().toString()))
        .body(job);
    }


    @DeleteMapping("/jobs/{id}")
    @Timed
    public ResponseEntity<Void> deleteJob(@PathVariable String id) {
        log.debug("REST request to delete a job: ", id);
        Query q = new Query();
        q.addCriteria(Criteria.where("id").is(new ObjectId(id)));
        mongoTemplate.remove(q, Job.class);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("eClinicApp", false, ENTITY_NAME, id))
        .build();
    }


    @GetMapping("/jobs/{id}")
    @Timed
    public ResponseEntity<Job> getJob(@PathVariable String id) {
        log.debug("REST request to fetch a job: ", id);
        Query q = new Query();
        q.addCriteria(Criteria.where("id").is(new ObjectId(id)));
        Job job = mongoTemplate.findOne(q, Job.class);
        return new ResponseEntity<Job>(job, new HttpHeaders(), HttpStatus.OK);
    }



    @PostMapping("/jobs/filter")
    @Timed
    public ResponseEntity<List<Job>> getJobsByCriteria(@RequestBody JobCriteria criteria) {
        log.debug("REST request to filter jobs");
        Query q = new Query();
        if(criteria != null && criteria.getSearchText() != null && !"".equals(criteria.getSearchText().trim())) {
            String searchText = Misc.enableAndSearchText(criteria.getSearchText());
            q.addCriteria(TextCriteria.forDefaultLanguage().caseSensitive(false).matching(searchText));
        }

        if(criteria != null && criteria.getTitle() != null && !"".equals(criteria.getTitle().trim())) {
            q.addCriteria(Criteria.where("title").is(criteria.getTitle()));
        }

        if(criteria != null && criteria.getDescription() != null && !"".equals(criteria.getDescription().trim())) {
            q.addCriteria(Criteria.where("description").is(criteria.getDescription()));
        }

        if(criteria != null && criteria.getBookable() != null) {
            q.addCriteria(Criteria.where("bookable").is(criteria.getBookable()));
        }

        List<Job> result = mongoTemplate.find(q, Job.class);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}