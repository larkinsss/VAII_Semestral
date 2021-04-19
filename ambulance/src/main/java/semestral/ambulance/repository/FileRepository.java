package semestral.ambulance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import semestral.ambulance.models.File;

@Repository
public interface FileRepository extends JpaRepository<File, String> {
    Optional<File> findByData(byte[] data);

    Optional<File> findByName(String name);
}
