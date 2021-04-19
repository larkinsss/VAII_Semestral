package semestral.ambulance.restservices.impl;

import org.springframework.stereotype.Service;
import semestral.ambulance.models.Patient;
import semestral.ambulance.repository.PatientRepository;
import semestral.ambulance.restservices.PatientService;
import semestral.ambulance.util.ItemAlreadyExisting;
import semestral.ambulance.util.ItemNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService{


    private PatientRepository patientRepository;

    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient createPatient(Patient patient) throws ItemAlreadyExisting {
        if (patient != null) {
            if(patientRepository.findById(patient.getId()).isPresent()){
                throw new ItemAlreadyExisting("Patient with this birth number already exists!");
            } else {
                patientRepository.save(patient);
            }
        }
        return patient;
    }

    @Override
    public Patient getById(String id) throws ItemNotFoundException {
        if (id != null) {
            Optional<Patient> dbResponse = this.patientRepository.findById(id);
            if (dbResponse.isPresent()) {
                return dbResponse.get();
            } else {
                throw new ItemNotFoundException("getPatientById: Patient with this birthnumber was not found!");
            }
        }
        throw new NullPointerException("getPatientById: Argument id passed was null!");
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
