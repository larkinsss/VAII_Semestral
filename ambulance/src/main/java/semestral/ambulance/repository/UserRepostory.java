package semestral.ambulance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import semestral.ambulance.models.User;

@Repository
public interface UserRepostory extends JpaRepository<User, Long> {
    Optional<User> findUserByUsername(String username);
}
