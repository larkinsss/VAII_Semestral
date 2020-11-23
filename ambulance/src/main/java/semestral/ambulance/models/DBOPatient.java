package semestral.ambulance.models;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

public class DBOPatient {
    public Integer id;
    public String firstname;
    public String lastname;
    public Date dateOfBirth;
    public Date dateOfArrival;
    public String email;
    public String phoneNumber;
    public String illnessDesc;
}
