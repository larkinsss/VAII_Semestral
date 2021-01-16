package semestral.ambulance.controllers;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Random;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import semestral.ambulance.models.DBOProcedure;
import semestral.ambulance.models.Procedure;
import semestral.ambulance.restservices.ProcedureService;

@RestController
public class ProcedureController {

	private final Random counter = new Random();

	private final ProcedureService procedureService;
	private final ModelMapper modelMapper;

	public ProcedureController(ProcedureService procedureService, ModelMapper modelMapper) {
		this.procedureService = procedureService;
		this.modelMapper = modelMapper;
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/delete/procedure")
	public ResponseEntity<Procedure> deleteProcedure(@RequestParam(value = "id") Long id) throws NoSuchElementException{
		if (id != null) {
            Optional<Procedure> procToDelete = procedureService.deleteProcedure(id);
            if (procToDelete.isPresent()) {
                return ResponseEntity.accepted().body(procToDelete.get());
            } else {
                return ResponseEntity.badRequest().body(null);
            }
			
		} else {
			return ResponseEntity.badRequest().body(null);
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value = "/post/procedure", produces = "application/json", method = {RequestMethod.POST})
	public ResponseEntity<Procedure> postProcedure(@RequestBody DBOProcedure procedure) {
		if (procedure != null) {
			Procedure procToStore = procedureService.createProcedure(modelMapper.map(procedure, Procedure.class));
			return ResponseEntity.accepted().body(procToStore);
		} else {
			return ResponseEntity.badRequest().body(null);
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping(value="/get/procedure/{id}")
	public DBOProcedure getProcedureById(@PathVariable("id") Long id, Model model) throws ItemNotFoundException {
		Procedure procedure = procedureService.getProcedureById(id);
		return modelMapper.map(procedure, DBOProcedure.class);
	}

	@CrossOrigin(origins = "http://localhost:4200, http://localhost:8080")
	@GetMapping("/get/procedure/all")
	public ResponseEntity<List<Procedure>> getAllProcedures() {
		List<Procedure> procedureList = this.procedureService.getAllProcedures();
		return ResponseEntity.accepted().body(procedureList);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/delete/procedure/all")
	public ResponseEntity<String> deleteAllAppointments() {
		if (this.procedureService.deleteAll()) {
			return ResponseEntity.accepted().body("All procedures removed");
		} else {
			return ResponseEntity.badRequest().body("Could not remove all procedures");
		}
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/update/procedure")
	public ResponseEntity<Procedure> updateProcedure(@RequestBody DBOProcedure procedure) {
		if (procedure != null) {
			Procedure updatedProcedure = procedureService.updateProcedure(modelMapper.map(procedure, Procedure.class));
			if(updatedProcedure != null) {
				return ResponseEntity.accepted().body(updatedProcedure);
			}
		}
		return ResponseEntity.badRequest().body(null);
	}
}
