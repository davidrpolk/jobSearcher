package com.applications.jobs.route;

import com.applications.jobs.JobRepository;
import com.applications.jobs.Job;
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.ResponseBody;

@RestController
public class RouteController {
    @Autowired
    JobRepository jobRepository;
    private final String origin = "http://localhost:3000";

    @RequestMapping("/")
    public String index() {
        return "index";
    }
    
    @CrossOrigin(origins = origin)
    @PostMapping("/job")
    public String PostJob(@RequestParam(required = false) String company, @RequestParam(required = false) String role, @RequestParam(required = false) String link, @RequestParam(required = false) String description) {
        Job job = new Job(company, role, link, description);
        jobRepository.save(job);
        return "Job Saved";
    }

    @CrossOrigin(origins = origin)
    @GetMapping("/allJobs")
    public Iterable<Job> getAllJobs() {
        return jobRepository.findAll();
    }
}