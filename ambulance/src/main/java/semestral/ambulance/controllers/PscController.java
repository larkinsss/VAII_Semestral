package semestral.ambulance.controllers;

import java.util.List;

import org.apache.tools.ant.taskdefs.Zip;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import semestral.ambulance.models.ZipPostal;
import semestral.ambulance.models.DatabaseObjectModels.DBOPsc;
import semestral.ambulance.restservices.impl.PscServiceImpl;

@CrossOrigin(
	origins = {"http://localhost:4200", "http://localhost:8080"}, 
	allowedHeaders = {"Authorization", "Content-type"},
	exposedHeaders = {"Authorization", "Content-type"}
)
@RestController
public class PscController {
    
    private final PscServiceImpl pscService;
    private final ModelMapper modelMapper;

    public PscController(PscServiceImpl pscService, ModelMapper modelMapper) {
        this.pscService = pscService;
        this.modelMapper = modelMapper;
    }

    @PostMapping(value = "/psc/post")
    public ResponseEntity pscMapping(@RequestBody List<DBOPsc> list) {
        try {
            for (DBOPsc psc : list) {
                if (psc.psc != null) {
                    this.pscService.insertPsc(modelMapper.map(psc, ZipPostal.class));
                }                
            } 
            return ResponseEntity.ok().body(true);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping(value = "/psc/get/all")
    public ResponseEntity<List<ZipPostal>> getAllZips() {
        try {
            return ResponseEntity.ok().body(this.pscService.getAllZips()); 
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
        }
    }
    

}