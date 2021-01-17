package semestral.ambulance.controllers;

import javax.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import semestral.ambulance.models.DBOUser;
import semestral.ambulance.models.User;
import semestral.ambulance.restservices.UserService;

@RestController
public class AuthController {

    private UserService userService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ModelMapper modelMapper;

    AuthController(UserService userService, PasswordEncoder encoder) {
        this.userService = userService;
        this.passwordEncoder = encoder;
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

}
