package semestral.ambulance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import semestral.ambulance.models.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

}
