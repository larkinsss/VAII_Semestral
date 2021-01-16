package semestral.ambulance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import semestral.ambulance.models.Procedure;

@Repository
public interface ProcedureRepository extends JpaRepository<Procedure, Long> {

}
