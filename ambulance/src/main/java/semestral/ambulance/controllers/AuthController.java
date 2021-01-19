package semestral.ambulance.controllers;

import javax.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import semestral.ambulance.models.AuthenticationRequest;
import semestral.ambulance.models.AuthenticationResponse;
import semestral.ambulance.models.DBOUser;
import semestral.ambulance.models.User;
import semestral.ambulance.restservices.UserService;
import semestral.ambulance.util.JwtUtil;

@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:8080"})
@RestController
public class AuthController {

    private UserService userService;
    private PasswordEncoder passwordEncoder;
    private JwtUtil jwtTokenUtil;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    AuthController(UserService userService, PasswordEncoder encoder, JwtUtil util) {
        this.userService = userService;
        this.passwordEncoder = encoder;
        this.jwtTokenUtil = util;
    }

    
    @RequestMapping(value = "/register", method = { RequestMethod.POST })
    public ResponseEntity<User> registerUser(@RequestBody DBOUser user) {
        if (user == null) {
            return ResponseEntity.badRequest().body(null);
        }
        String hashedPassword = passwordEncoder.encode(user.password);

        User userToStore = new User(modelMapper.map(user, User.class), hashedPassword);
        User resultOfPost = this.userService.upsertUser(userToStore);
        if (resultOfPost != null) {
            return ResponseEntity.accepted().body(userToStore);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping(value = "/user/get")
    public ResponseEntity<User> getUserById(@RequestParam Long id) {
        User user = this.userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.badRequest().body(null);
        } else {
            return ResponseEntity.ok().body(user);
        }
    }

    @CrossOrigin(origins = { "http://localhost:4200", "http://localhost:8080" })
    @RequestMapping(value = "/authenticate", method = { RequestMethod.POST })
    public ResponseEntity<AuthenticationResponse> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
            throws Exception {

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetail = userService.loadUserByUsername(authenticationRequest.getUsername());

        final User userForResponse = userService.getUserByUsername(userDetail.getUsername());
        
        final String jwt = jwtTokenUtil.generateToken(userDetail);

        return ResponseEntity.ok(new AuthenticationResponse(jwt, userForResponse));
    }

}
