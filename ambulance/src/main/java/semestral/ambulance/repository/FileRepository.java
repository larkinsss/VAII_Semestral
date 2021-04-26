package semestral.ambulance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import semestral.ambulance.models.AttachmentFile;

@Repository
public interface FileRepository extends JpaRepository<AttachmentFile, String> {
    Optional<AttachmentFile> findByData(byte[] data);

    Optional<AttachmentFile> findByName(String name);
}
