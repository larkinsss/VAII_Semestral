package semestral.ambulance.restservices.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import semestral.ambulance.models.Employer;
import semestral.ambulance.repository.EmployerRepository;
import semestral.ambulance.restservices.EmployerService;
import semestral.ambulance.util.ItemAlreadyExisting;
import semestral.ambulance.util.ItemNotFoundException;
import semestral.ambulance.util.NoItemsFoundException;

@Service
public class EmployerServiceImpl implements EmployerService {

    private EmployerRepository emplRepo;

    public EmployerServiceImpl(EmployerRepository emplRepo) {
        this.emplRepo = emplRepo;
    }

    @Override
    public Employer createEmployer(Employer empl) throws ItemAlreadyExisting {
        if (empl != null) {
            Optional<Employer> existingEmpl = emplRepo.findById(empl.getId());
            if (existingEmpl.isPresent()) {
                throw new ItemAlreadyExisting("Employer with name: " + empl.getName() + "| with id: " + empl.getId() + "| Already exists!");
            } else {
                this.emplRepo.save(empl);
                return empl;
            }
        }
        throw new NullPointerException("createEmployer: Argument null exception!");
    }

    @Override
    public boolean deleteEmployer(Integer emplId) throws ItemNotFoundException {
        if (emplRepo.findById(emplId).isPresent()) {
            emplRepo.deleteById(emplId);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Employer getEmployerById(Integer id) throws ItemNotFoundException{
        if (id != null) {
            Optional<Employer> emplFound = emplRepo.findById(id);
            if (emplFound.isPresent()) {
                return emplFound.get();
            }
            throw new ItemNotFoundException("Could not find employer with id: " + id);
        }
        throw new NullPointerException("getEmployerById: Argument null exception!");
    }

    @Override
    public List<Employer> getAllEmployers() throws NoItemsFoundException{
        if (emplRepo.count() > 0){
            return this.emplRepo.findAll();
        }
        throw new NoItemsFoundException("Employer list is empty!");
        
    }

    @Override
    public boolean deleteAll() throws NoItemsFoundException{
        if (emplRepo.count() > 0){
            emplRepo.deleteAll();
            return true;
        }
        throw new NoItemsFoundException("Employer list is empty!");
    }

    @Override
    public Employer updateEmployer(Employer empl) throws ItemNotFoundException{
        if (empl != null) {
            if (emplRepo.findById(empl.getId()).isPresent()) {
                emplRepo.deleteById(empl.getId());
                emplRepo.save(empl);
                return empl;
            } else {
                throw new ItemNotFoundException("updateEmployer: Employer not found!");
            }

        }
        throw new NullPointerException("createEmployer: Argument null exception!");
    }

    
    
}
