package semestral.ambulance.controllers;

import java.util.Arrays;
import java.util.Collection;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import semestral.ambulance.models.DBOUser;
import semestral.ambulance.models.User;
import semestral.ambulance.restservices.UserService;

@RestController
public class AuthController {

    private UserService userService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    AuthController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping(value = "/register", method = {RequestMethod.POST})
	public ResponseEntity<User> postProcedure(@Valid @ModelAttribute("user") DBOUser user, BindingResult result, Model model) {
		if (result.hasErrors()) {
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


    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping("/login")
    public String login(@RequestParam(value = "firstname", defaultValue = "Patient") String firstname) {
        
    }

}
