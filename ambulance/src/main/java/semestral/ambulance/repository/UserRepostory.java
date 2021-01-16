package semestral.ambulance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import semestral.ambulance.models.User;

public interface UserRepostory extends JpaRepository<User, Long> {
    
}
