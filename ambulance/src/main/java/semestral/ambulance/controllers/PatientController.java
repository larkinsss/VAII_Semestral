package semestral.ambulance.controllers;

import java.util.List;
import java.util.Random;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import semestral.ambulance.models.DBOPatient;
import semestral.ambulance.models.Patient;
import semestral.ambulance.restservices.PatientService;

@RestController
public class PatientController {

	private final Random counter = new Random();

	private final PatientService patientService;
	private final ModelMapper modelMapper;

	public PatientController(PatientService patientService, ModelMapper modelMapper) {
		this.patientService = patientService;
		this.modelMapper = modelMapper;
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/get/patient/default")
	public Patient getPatient(@RequestParam(value = "firstname", defaultValue = "Patient") String firstname) {
		return new Patient(counter.nextLong());
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/delete/patient")
	public ResponseEntity<Patient> deletePatient(@RequestParam(value = "id") Long id) throws Exception {
		if (id != null) {
			return ResponseEntity.accepted().body(patientService.deletePatient(id));
		} else {
			return ResponseEntity.badRequest().body(null);
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value = "/post/patient", produces = "application/json", method = {RequestMethod.POST})
	public ResponseEntity<Patient> postPatient(@RequestBody DBOPatient patient) {
		if (patient != null) {
			Patient storedPatient = patientService.createPatient(modelMapper.map(patient, Patient.class));
			return ResponseEntity.accepted().body(storedPatient);
		} else {
			return ResponseEntity.badRequest().body(null);
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping(value="/get/{id}")
	public DBOPatient getPatientById(@PathVariable("id") Long id, Model model) throws ItemNotFoundException {
		Patient controlPatient = patientService.getById(id);
		return modelMapper.map(controlPatient, DBOPatient.class);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/get/all")
	public ResponseEntity<List<Patient>> getAllPatients() {
		List<Patient> patientList = this.patientService.getAllPatients();
		return ResponseEntity.accepted().body(patientList);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/delete/all")
	public ResponseEntity<String> deleteAllAppointments() {
		if (this.patientService.deleteAll()) {
			return ResponseEntity.accepted().body("All appointments removed");
		} else {
			return ResponseEntity.badRequest().body("Could not remove all appointments");
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
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
