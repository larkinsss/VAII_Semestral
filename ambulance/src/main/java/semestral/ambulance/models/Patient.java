package semestral.ambulance.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name= "patient_data")
public class Patient {

    @Id
    //@NotEmpty
    @Column (name = "id")
    private Long id;

    //NotEmpty
    @Column (name = "firstname")
    private String firstname;

    //@NotEmpty
    @Column (name = "lastname")
    private String lastname;

    //@NotEmpty
    @Column (name = "date_of_birth")
    private Date dateOfBirth;

    //@NotEmpty
    @Column (name = "date_of_arrival")
    private Date dateOfArrival;

    //@NotEmpty
    //@Email
    @Column (name = "email")
    private String email;

    @Column (name = "phone_number")
    private String phoneNumber;

    @Column (name = "illness_desc")
    private String illnessDesc;

    public Patient(Long id, String firstname, String lastname,
                   Date dateOfBirth, Date timeOfArrival, String email,
                   String phoneNumber, String illnessDesc) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dateOfBirth = dateOfBirth;
        this.dateOfArrival = timeOfArrival;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.illnessDesc = illnessDesc;
    }

    public Patient(Long id) {
        this.id = id;
        this.firstname = "Tester";
        this.lastname = "Subject";
        this.dateOfBirth = new Date();
        this.dateOfArrival = new Date();
        this.email = "random@email.com";
        this.phoneNumber="0000000000";
        this.illnessDesc = "Corona virus";
    }

    public Patient(){}

    public String getLastname() {
        return lastname;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public Date getDateOfArrival() {
        return dateOfArrival;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getIllnessDesc() {
        return illnessDesc;
    }

    public Long getId() {
        return id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setDateOfArrival(Date timeOfArrival) {
        this.dateOfArrival = timeOfArrival;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setIllnessDesc(String illnessDesc) {
        this.illnessDesc = illnessDesc;
    }
}
