package semestral.ambulance.controllers;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import semestral.ambulance.models.AuthenticationRequest;
import semestral.ambulance.models.DBOUser;
import semestral.ambulance.models.PasswordChangeRequest;
import semestral.ambulance.models.User;
import semestral.ambulance.restservices.UserService;
import semestral.ambulance.util.JwtUtil;

@CrossOrigin(
	origins = {"http://localhost:4200", "http://localhost:8080"}, 
	allowedHeaders = {"Authorization", "Content-type"},
	exposedHeaders = {"Authorization", "Content-type"}
)
@RestController
public class UserContoller {
    
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    private UserService userService;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtTokenUtil;

    UserContoller(UserService userService, PasswordEncoder encoder, JwtUtil util) {
        this.userService = userService;
        this.passwordEncoder = encoder;
        this.jwtTokenUtil = util;
    }

    @PostMapping(value = "/user/post")
    public ResponseEntity upsertUser(@RequestBody DBOUser user)
    {
        try {
            return ResponseEntity.accepted().body(this.userService.upsertUser(modelMapper.map(user, User.class)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("upsertUser:: Upserting user failed!");
        }
    }

    @PostMapping(value = "/user/password/change")
    public ResponseEntity<String> changeUserPassword(@RequestBody PasswordChangeRequest passChangeReq) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                passChangeReq.getUsername(), passChangeReq.getOldPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        try {
            User userToChange = this.userService.getUserByUsername(passChangeReq.getUsername());
            String newHashedPass = passwordEncoder.encode(passChangeReq.getNewPassword());
            userToChange.setPassword(newHashedPass);
            this.userService.upsertUser(userToChange);
            return ResponseEntity.ok().body("Password changed successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(value = "user/get/all")
    public ResponseEntity getAllPatients() {
        try {
            return ResponseEntity.accepted().body(this.userService.getAllUsers());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/user/delete/{id}")
	public ResponseEntity deletePatient(@PathVariable("id") Long id) {
		try {
            return ResponseEntity.ok().body(this.userService.deleteUser(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
	}
}
