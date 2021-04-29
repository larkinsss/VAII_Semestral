package semestral.ambulance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import semestral.ambulance.models.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {
    Optional<Message> findByPnForm(String pnForm);
}
