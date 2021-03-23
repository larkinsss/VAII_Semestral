package semestral.ambulance.controllers;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import semestral.ambulance.models.DBOPatient;
import semestral.ambulance.models.Patient;
import semestral.ambulance.restservices.PatientService;
import semestral.ambulance.util.ItemNotFoundException;

@CrossOrigin(
	origins = {"http://localhost:4200", "http://localhost:8080"}, 
	allowedHeaders = {"Authorization", "Content-type"},
	exposedHeaders = {"Authorization", "Content-type"}
)
@RestController
public class PatientController {

	private final PatientService patientService;
	private final ModelMapper modelMapper;

	public PatientController(PatientService patientService, ModelMapper modelMapper) {
		this.patientService = patientService;
		this.modelMapper = modelMapper;
	}

	
	@GetMapping("/get/patient/default")
	public Patient getPatient(@RequestParam(value = "firstname", defaultValue = "Patient") String firstname) {
		return new Patient("9901011004");
	}

	@DeleteMapping("/delete/patient")
	public ResponseEntity<Patient> deletePatient(@RequestParam(value = "id") String id) throws Exception {
		if (id != null) {
			return ResponseEntity.accepted().body(patientService.deletePatient(id));
		} else {
			return ResponseEntity.badRequest().body(null);
		}
	}

	@RequestMapping(value = "/post/patient", produces = "application/json", method = {RequestMethod.POST})
	public ResponseEntity postPatient(@RequestBody DBOPatient patient) {
		if (patient != null) {
			try {
				Patient storedPatient = patientService.createPatient(modelMapper.map(patient, Patient.class));
				return ResponseEntity.accepted().body(storedPatient);
			} catch (Exception e) {
				return ResponseEntity.badRequest().body("Pacient s týmto rodným číslom už existuje!");
			}
		} else {
			return ResponseEntity.badRequest().body("postPatient: null argument");
		}
	}

	@GetMapping(value="/get/patient/{id}")
	public DBOPatient getPatientById(@PathVariable("id") String id, Model model) throws ItemNotFoundException {
		Patient controlPatient = patientService.getById(id);
		return modelMapper.map(controlPatient, DBOPatient.class);
	}

	@GetMapping("/get/all")
	public ResponseEntity<List<Patient>> getAllPatients() {
		List<Patient> patientList = this.patientService.getAllPatients();
		return ResponseEntity.accepted().body(patientList);
	}

	@DeleteMapping("/delete/all")
	public ResponseEntity<String> deleteAllAppointments() {
		if (this.patientService.deleteAll()) {
			return ResponseEntity.accepted().body("All appointments removed");
		} else {
			return ResponseEntity.badRequest().body("Could not remove all appointments");
		}
	}

	@PostMapping("/update/patient")
	public ResponseEntity<Patient> updatePatient(@RequestBody DBOPatient patient) {
		if (patient != null) {
			Patient updatedPatient = patientService.updatePatient(modelMapper.map(patient, Patient.class));
			if(updatedPatient != null) {
				return ResponseEntity.accepted().body(updatedPatient);
			}
		}
		return ResponseEntity.badRequest().body(null);
	}
}
