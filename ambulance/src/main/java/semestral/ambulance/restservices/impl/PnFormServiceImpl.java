package semestral.ambulance.restservices.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import semestral.ambulance.models.PnForm;
import semestral.ambulance.repository.PnFormRepository;
import semestral.ambulance.restservices.PnFormService;
import semestral.ambulance.util.ItemAlreadyExisting;
import semestral.ambulance.util.ItemNotFoundException;
import semestral.ambulance.util.NoItemsFoundException;

@Service
public class PnFormServiceImpl implements PnFormService {

    private PnFormRepository pnFormRepo;

    public  PnFormServiceImpl(PnFormRepository pnFormRepo) {
        this.pnFormRepo = pnFormRepo;
    }

    @Override
    public PnForm createPnForm(PnForm pnForm) throws ItemAlreadyExisting {
        if (pnForm != null) {
            Optional<PnForm> existingPnForm = pnFormRepo.findById(pnForm.getId());
            if (existingPnForm.isPresent()) {
                throw new ItemAlreadyExisting("SA-Form with id: " + pnForm.getId() + " | Already exists!");
            } else {
                this.pnFormRepo.save(pnForm);
                return pnForm;
            }
        }
        throw new NullPointerException("createPnForm: Argument null exception!"); 
    }

    @Override
    public boolean deletePnForm(String pnFormId) throws ItemNotFoundException {
        try {
            if (pnFormRepo.findById(pnFormId).isPresent()) {
                pnFormRepo.deleteById(pnFormId);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            throw new ItemNotFoundException(e.getMessage());
        }
    }

    @Override
    public PnForm getPnFormById(String pnFormId) throws ItemNotFoundException {
        if (pnFormId != null) {
            Optional<PnForm> pnFormFound = pnFormRepo.findById(pnFormId);
            if (pnFormFound.isPresent()) {
                return pnFormFound.get();
            }
            throw new ItemNotFoundException("Could not find SA-Form with id: " + pnFormId);
        }
        throw new NullPointerException("getPnFormById: Argument null exception!");
    }

    @Override
    public List<PnForm> getAllPnForms() throws NoItemsFoundException {
        if (pnFormRepo.count() > 0){
            return this.pnFormRepo.findAll();
        }
        throw new NoItemsFoundException("SA-Form list is empty!");
    }

    @Override
    public PnForm updatePnForm(PnForm pnForm) throws ItemNotFoundException {
        if (pnForm != null) {
            if (pnFormRepo.findById(pnForm.getId()).isPresent()) {
                pnFormRepo.deleteById(pnForm.getId());
                pnFormRepo.save(pnForm);
                return pnForm;
            } else {
                throw new ItemNotFoundException("updatePatient: SA-Form not found!");
            }

        }
        throw new NullPointerException("updatePatient: Argument null exception!");
    }
    
}
