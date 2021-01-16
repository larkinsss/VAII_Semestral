package semestral.ambulance.restservices;

import semestral.ambulance.models.User;

public interface UserService {
    
    public User getUserById(Long id);

    public User upsertUser(User user);

    public boolean deleteUser(Long id);

}
