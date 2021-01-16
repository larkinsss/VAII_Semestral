package semestral.ambulance.restservices;

import semestral.ambulance.models.Patient;
import java.util.List;

public interface PatientService {

    public Patient createPatient(Patient patient);

    public Patient getById(Long id);

    public List<Patient> getAllPatients();

    public Patient deletePatient(Long id) throws Exception;

    public boolean deleteAll();

    public Patient updatePatient(Patient patient);
}
