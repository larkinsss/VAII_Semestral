package semestral.ambulance.restservices.impl;

import org.springframework.stereotype.Service;
import semestral.ambulance.models.Patient;
import semestral.ambulance.repository.PatientRepository;
import semestral.ambulance.restservices.PatientService;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService{


    private PatientRepository patientRepository;

    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient createPatient(Patient patient) {
        patientRepository.save(patient);
        return patient;
    }

    @Override
    public Patient getById(String id) {
        return patientRepository.findById(id).orElse(null);
    }

    @Override
    public List<Patient> getAllPatients(){
        List<Patient> pR = patientRepository.findAll();
        System.err.println(pR);
        return pR;
    }

    @Override
    public Patient deletePatient(String id) throws Exception{
        Patient patientToBeRemoved = patientRepository.findById(id).orElseThrow(Exception::new);
        if(id != null) {
            patientRepository.deleteById(id);
            return patientToBeRemoved;
        } else {
            return null;
        }
    }

    @Override
    public boolean deleteAll() {
        try{
            patientRepository.deleteAll();
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    @Override
    public Patient updatePatient(Patient patient) {
        try {
            Patient patientToBeUpdated = patientRepository.findById(patient.getId()).orElseThrow(Exception::new);
            if (patientToBeUpdated != null) {
                patientRepository.deleteById(patientToBeUpdated.getId());
                patientRepository.save(patient);
                return patient;
            }
            return null;
        }
        catch (Exception e) {
            return null;
        }
    }
}
