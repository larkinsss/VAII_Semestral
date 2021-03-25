package semestral.ambulance.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import semestral.ambulance.models.Employer;


@Repository
public interface EmployerRepository extends JpaRepository<Employer, Integer> {
    
}
