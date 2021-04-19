package semestral.ambulance.restservices;

import semestral.ambulance.models.Patient;
import semestral.ambulance.util.ItemAlreadyExisting;
import semestral.ambulance.util.ItemNotFoundException;

import java.util.List;

public interface PatientService {

    public Patient createPatient(Patient patient) throws ItemAlreadyExisting;

    public Patient getById(String id) throws ItemNotFoundException;

    public List<Patient> getAllPatients();

    public Patient deletePatient(String id) throws Exception;

    public boolean deleteAll();

    public Patient updatePatient(Patient patient);
}
