package semestral.ambulance.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import semestral.ambulance.models.ZipPostal;

@Repository
public interface PscRepository extends JpaRepository<ZipPostal, String> {

}