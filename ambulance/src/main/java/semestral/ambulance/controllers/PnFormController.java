package semestral.ambulance.controllers;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

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

import semestral.ambulance.models.DBOPnForm;
import semestral.ambulance.models.PnForm;
import semestral.ambulance.repository.PnFormRepository;
import semestral.ambulance.restservices.PnFormService;
import semestral.ambulance.util.ItemNotFoundException;
import semestral.ambulance.util.NoItemsFoundException;

@CrossOrigin(
	origins = {"http://localhost:4200", "http://localhost:8080"}, 
	allowedHeaders = {"Authorization", "Content-type"},
	exposedHeaders = {"Authorization", "Content-type"}
)
@RestController
public class PnFormController {
    private final PnFormService pnFormService;
    private final ModelMapper modelMapper;

    public PnFormController(PnFormService pnFormService, ModelMapper modelMapper) {
		this.pnFormService = pnFormService;
        this.modelMapper = modelMapper;
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
				PnForm pnFromToStore = pnFormService.createPnForm(modelMapper.map(pnForm, PnForm.class));
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
		    return ResponseEntity.accepted().body(pnFormList);
        } catch (NoItemsFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
		
	}

	@PostMapping("/update/pnform")
	public ResponseEntity updatePnForm(@RequestBody DBOPnForm pnForm) {
		try {
            return ResponseEntity.ok().body(pnFormService.updatePnForm(modelMapper.map(pnForm, PnForm.class)));
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
}
