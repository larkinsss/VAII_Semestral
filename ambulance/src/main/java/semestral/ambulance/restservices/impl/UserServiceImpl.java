package semestral.ambulance.restservices.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import semestral.ambulance.models.Role;
import semestral.ambulance.models.User;
import semestral.ambulance.repository.UserRepostory;
import semestral.ambulance.restservices.UserService;

@Service
public class UserServiceImpl implements UserService {

    private UserRepostory userRepo;

    UserServiceImpl(UserRepostory userRepostory) {
        this.userRepo = userRepostory;
    }

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User getUserById(Long id) {
        Optional<User> existing = userRepo.findById(id).map(result -> (User) result);
        if (existing.isPresent()) {
            return existing.get();
        } else
            return null;
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
    public User insertUser(User user) {
        if (user != null) {
            Optional<User> existing = userRepo.findById(user.getId());
            if (!existing.isPresent()) {
                existing = userRepo.findUserByUsername(user.getUsername());
                if (!existing.isPresent()) {
                    this.userRepo.save(user);
                    return user;
                }
            }
        }
        return null;
    }

    @Override
    public boolean deleteUser(Long id) {
        Optional<User> existing = userRepo.findById(id).map(result -> (User) result);
        if (existing.isPresent()) {
            this.userRepo.deleteById(id);;
            return true;
        } else {
            return false;
        }
    }

    @Override
    public User getUserByUsername(String username) {
        Optional<User> existing = userRepo.findUserByUsername(username);
        if (existing.isPresent()) {
            return existing.get();
        } else {
            return null;
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> existing = userRepo.findUserByUsername(username);
        if (existing.isPresent()) {
            return existing.get();
        } else {
            throw new UsernameNotFoundException("Username: " + username + " not found");
        }
    }

    @Override
    public List<User> getAllUsers() {
        return this.userRepo.findAll();
    }

    @Override
    public List<User> getPendingUsers() {
        List<User> pendingUsers = new ArrayList<>();
        List<User> allUsers = this.userRepo.findAll();
        for (User user : allUsers) {
            if (user.getRole() == Role.UNREGISTERED) {
                pendingUsers.add(user);
            }
        }
        return pendingUsers;
    }
}
