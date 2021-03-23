package semestral.ambulance.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name= "patient_data")
public class Patient {

    @Id
    //@NotEmpty
    @Column (name = "birth_number")
    private String id;

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

    @Column (name = "ins_comp_num")
    private Integer insuranceNumber;

    @Column (name = "street_name")
    private String streetName;

    @Column (name = "street_number")
    private Integer streetNumber;

    @Column (name = "ins_rel")
    private String insuranceRelationship;

    public Patient(String id, String firstname, String lastname,
                   Date dateOfBirth, Date timeOfArrival, String email,
                   String phoneNumber, Integer insuranceNum, String streetName, Integer streetNum, String insuranceRelString) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dateOfBirth = dateOfBirth;
        this.dateOfArrival = timeOfArrival;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.insuranceNumber = insuranceNum;
        this.streetName = streetName;
        this.streetNumber = streetNum;
        this.insuranceRelationship = insuranceRelString;
    }

    public Patient(String id) {
        this.id = id;
        this.firstname = "Tester";
        this.lastname = "Subject";
        this.dateOfBirth = new Date();
        this.dateOfArrival = new Date();
        this.email = "random@email.com";
        this.phoneNumber="0000000000";
        this.insuranceNumber = 24;
        this.streetName = "streetName";
        this.streetNumber = 5;
        this.insuranceRelationship = "insuranceRelString";
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

    public String getFirstname() {
        return firstname;
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getInsuranceNumber() {
        return insuranceNumber;
    }

    public void setInsuranceNumber(Integer insuranceNumber) {
        this.insuranceNumber = insuranceNumber;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public Integer getStreetNumber() {
        return streetNumber;
    }

    public void setStreetNumber(Integer streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getInsuranceRelationship() {
        return insuranceRelationship;
    }

    public void setInsuranceRelationship(String insuranceRelationship) {
        this.insuranceRelationship = insuranceRelationship;
    }
}
