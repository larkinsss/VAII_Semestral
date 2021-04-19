package semestral.ambulance.controllers;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import semestral.ambulance.models.DatabaseObjectModels.*;
import semestral.ambulance.models.Employer;
import semestral.ambulance.restservices.EmployerService;
import semestral.ambulance.util.ItemNotFoundException;
import semestral.ambulance.util.NoItemsFoundException;

@CrossOrigin(
	origins = {"http://localhost:4200", "http://localhost:8080"}, 
	allowedHeaders = {"Authorization", "Content-type"},
	exposedHeaders = {"Authorization", "Content-type"}
)
@RestController
public class EmployerController {
    
    private final EmployerService employerService;
    private final ModelMapper modelMapper;

    public EmployerController(EmployerService emplService, ModelMapper modelMapper) {
		this.employerService = emplService;
        this.modelMapper = modelMapper;
	}

	@DeleteMapping("/delete/employer")
	public ResponseEntity deleteEmployer(@RequestParam(value = "id") Integer id) throws ItemNotFoundException {
		if (id != null) {
            try {
                return ResponseEntity.accepted().body(employerService.deleteEmployer(id));
            } catch (ItemNotFoundException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
		} else {
			return ResponseEntity.badRequest().body("deletePatient: Null argument exception");
		}
	}

	@RequestMapping(value = "/post/employer", produces = "application/json", method = {RequestMethod.POST})
	public ResponseEntity postEmployer(@RequestBody DBOEmployer employer) {
		if (employer != null) {
			try {
				Employer emplToStore = employerService.createEmployer(modelMapper.map(employer, Employer.class));
				return ResponseEntity.accepted().body(emplToStore);
			} catch (Exception e) {
				return ResponseEntity.badRequest().body("Zamestnávateľ s týmto číslom už existuje!");
			}
		} else {
			return ResponseEntity.badRequest().body("postPatient: null argument");
		}
	}

	@GetMapping(value="/get/employer/{id}")
	public ResponseEntity getEmployerById(@PathVariable("id") Integer id) throws ItemNotFoundException {
		try {
            Employer foundEmployer = employerService.getEmployerById(id);
		    // return modelMapper.map(foundEmployer, DBOEmployer.class);
            return ResponseEntity.ok().body(foundEmployer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        
        
	}

	@GetMapping("/get/employer/all")
	public ResponseEntity getAllEmployers() {
        try {
            List<Employer> employerList = this.employerService.getAllEmployers();
		    return ResponseEntity.accepted().body(employerList);
        } catch (NoItemsFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
		
	}

	@PostMapping("/update/employer")
	public ResponseEntity updateEmployer(@RequestBody DBOEmployer employer) {
		try {
            return ResponseEntity.ok().body(employerService.updateEmployer(modelMapper.map(employer, Employer.class)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }		
	}
}
