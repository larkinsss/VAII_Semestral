package semestral.ambulance.restservices;

import java.util.List;
import semestral.ambulance.models.Employer;
import semestral.ambulance.util.ItemAlreadyExisting;
import semestral.ambulance.util.ItemNotFoundException;
import semestral.ambulance.util.NoItemsFoundException;

public interface EmployerService {

    public Employer createEmployer(Employer empl) throws ItemAlreadyExisting;

    public boolean deleteEmployer(Integer emplId) throws ItemNotFoundException; 

    public Employer getEmployerById(Integer id) throws ItemNotFoundException;

    public List<Employer> getAllEmployers() throws NoItemsFoundException;

    public boolean deleteAll() throws NoItemsFoundException;

    public Employer updateEmployer(Employer empl) throws ItemNotFoundException;
    
}
