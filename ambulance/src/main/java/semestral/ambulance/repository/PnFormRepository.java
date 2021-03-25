package semestral.ambulance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import semestral.ambulance.models.PnForm;

@Repository
public interface PnFormRepository extends JpaRepository<PnForm, String>{
    
}
