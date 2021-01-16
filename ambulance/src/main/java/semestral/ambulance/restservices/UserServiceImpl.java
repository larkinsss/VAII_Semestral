package semestral.ambulance.restservices;

import java.util.Optional;

import semestral.ambulance.models.User;
import semestral.ambulance.repository.UserRepostory;

public class UserServiceImpl implements UserService {

    private UserRepostory userRepo;

    UserServiceImpl(UserRepostory userRepostory) {
        this.userRepo = userRepostory;
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> existing = userRepo.findById(id).map(result -> (User) result);
        if (existing.isPresent()){
            return existing.get();
        } else return null;
    }

    @Override
    public User upsertUser(User user) {
        if (user != null) {
            Optional<User> existing = userRepo.findById(user.getId()).map(result -> (User) result);
            if (existing.isPresent()) {
                this.deleteUser(user.getId());
                userRepo.save(user);
                return user;
            } else {
                this.userRepo.save(user);
                return user;
            }
        }
        return null;
    }

    @Override
    public boolean deleteUser(Long id) {
        Optional<User> existing = userRepo.findById(id).map(result -> (User) result);
        if (existing.isPresent()) {
            this.deleteUser(id);
            return true;
        } else {
            return false;
        }
    }
    
}
