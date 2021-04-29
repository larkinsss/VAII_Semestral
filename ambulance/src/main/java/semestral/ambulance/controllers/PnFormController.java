package semestral.ambulance.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
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

import semestral.ambulance.models.DatabaseObjectModels.DBOMessage;
import semestral.ambulance.models.DatabaseObjectModels.DBOPnForm;
import semestral.ambulance.models.Message;
import semestral.ambulance.models.Patient;
import semestral.ambulance.models.PnForm;
import semestral.ambulance.restservices.MessageService;
import semestral.ambulance.restservices.PatientService;
import semestral.ambulance.restservices.PnFormService;
import semestral.ambulance.util.ItemNotFoundException;
import semestral.ambulance.util.NoItemsFoundException;
import java.util.UUID;

@CrossOrigin(
	origins = {"http://localhost:4200", "http://localhost:8080"}, 
	allowedHeaders = {"Authorization", "Content-type"},
	exposedHeaders = {"Authorization", "Content-type"}
)
@RestController
public class PnFormController {
    private final PnFormService pnFormService;
    private final ModelMapper modelMapper;
	private final PatientService patientServ;
	private final MessageService messageServ;

    public PnFormController(PnFormService pnFormService, ModelMapper modelMapper, PatientService patientService, MessageService messageService) {
		this.pnFormService = pnFormService;
        this.modelMapper = modelMapper;
		this.patientServ = patientService;
		this.messageServ = messageService;
	}

	@DeleteMapping("/delete/pnform")
	public ResponseEntity deletePnForm(@RequestParam(value = "id") String id) throws ItemNotFoundException {
		if (id != null) {
            try {
                return ResponseEntity.accepted().body(pnFormService.deletePnForm(id));
            } catch (ItemNotFoundException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
		} else {
			return ResponseEntity.badRequest().body("deletePnForm: Null argument exception");
		}
	}

	@RequestMapping(value = "/post/pnform", produces = "application/json", method = {RequestMethod.POST})
	public ResponseEntity postPnForm(@RequestBody DBOPnForm pnForm) {
		if (pnForm != null) {
			try {
				Patient patientOfPn = this.patientServ.getById(pnForm.patientBirthNumber);
				PnForm pnFromToStore = modelMapper.map(pnForm, PnForm.class);
				pnFromToStore.setPatient(patientOfPn);
				pnFormService.createPnForm(pnFromToStore);
				return ResponseEntity.accepted().body(pnFromToStore);
			} catch (Exception e) {
				return ResponseEntity.badRequest().body(e.getMessage());
			}
		} else {
			return ResponseEntity.badRequest().body("postEmployer: Null argument");
		}
	}

	@GetMapping(value="/get/pnform/{id}")
	public ResponseEntity getPnFormById(@PathVariable("id") String id) throws ItemNotFoundException {
		try {
            PnForm foundPnForm = pnFormService.getPnFormById(id);
            return ResponseEntity.ok().body(foundPnForm);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
	}

	@GetMapping("/get/pnform/all")
	public ResponseEntity getAllPnForms() {
        try {
            List<PnForm> pnFormList = this.pnFormService.getAllPnForms();
			List<DBOPnForm> dboPnForms = new ArrayList<>();
			for (PnForm pnForm : pnFormList) {
				DBOPnForm formToPass = modelMapper.map(pnForm, DBOPnForm.class);
				formToPass.patientBirthNumber = pnForm.getPatient().getId();
				dboPnForms.add(formToPass);
			}
		    return ResponseEntity.accepted().body(dboPnForms);
        } catch (NoItemsFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
		
	}

	@PostMapping("/update/pnform")
	public ResponseEntity updatePnForm(@RequestBody DBOPnForm pnForm) {
		try {
			Patient patient = this.patientServ.getById(pnForm.patientBirthNumber);
			PnForm form = modelMapper.map(pnForm, PnForm.class);
			form.setPatient(patient);
			return ResponseEntity.ok().body(pnFormService.updatePnForm(form));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }		
	}

	@GetMapping(value ="/database/update")
    public ResponseEntity updateDatabase() {
		try {
			List<PnForm> list = this.pnFormService.getAllPnForms();
			for (PnForm pnForm : list) {
				Date now = new Date();
				long diffInMillies = Math.abs(now.getTime() - pnForm.getBeginningDate().getTime());
    			long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
				if (diff > 10) {
					pnForm.setEndDate(now);
					this.pnFormService.updatePnForm(pnForm);
				}
			}
			return ResponseEntity.ok().body(null);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
    }

	@GetMapping(value = "/message/get/all")
	public ResponseEntity<List<Message>> getAllMessages() {
		try {
			return ResponseEntity.ok().body(this.messageServ.getAllMessages());
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(null);	
		}
	}

	@PostMapping(value = "/message/post", produces = "application/json")
	public ResponseEntity<Message> postPatient(@RequestBody DBOMessage message) {
		if (message != null) {
			try {
				message.id = UUID.randomUUID().toString();
				Message messageToDb = messageServ.createMessage(modelMapper.map(message, Message.class));
				return ResponseEntity.accepted().body(messageToDb);
			} catch (Exception e) {
				System.err.println(e.getMessage());
				return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
			}
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}

	@GetMapping(value="/message/get/{id}")
	public ResponseEntity getMessageById(@PathVariable("id") String id) {
		try {
            Message foundMessage = messageServ.getByPnForm(id);
            return ResponseEntity.ok().body(foundMessage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
	}

	@DeleteMapping("/message/delete/{pnId}")
	public ResponseEntity deleteMessage(@PathVariable(value = "pnId") String pnId) throws ItemNotFoundException {
		if (pnId != null) {
            try {
                return ResponseEntity.accepted().body(messageServ.deleteByPnForm(pnId));
            } catch (ItemNotFoundException e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
		} else {
			return ResponseEntity.badRequest().body("deleteMessage: Null argument exception");
		}
	}


}
