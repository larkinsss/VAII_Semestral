package semestral.ambulance.restservices;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import semestral.ambulance.models.User;

public interface UserService extends UserDetailsService{
    
    public User getUserById(Long id);

    public User upsertUser(User user);

    public boolean deleteUser(Long id);

    public User getUserByUsername(String username);

    public List<User> getAllUsers();

}
