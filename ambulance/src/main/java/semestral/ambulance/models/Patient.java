package semestral.ambulance.models;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name= "patient_data")
public class Patient {

    @Id
    @Column (name = "birth_number")
    private String id;

    @Column (name = "firstname")
    private String firstname;

    @Column (name = "lastname")
    private String lastname;

    @Column (name = "date_of_birth")
    private Date dateOfBirth;

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

    @Column (name = "psc")
    private String psc;

    @Column (name = "id_employer")
    private Integer idEmployer;

    public Patient(String id, String firstname, String lastname, Date dateOfBirth, String email, String phoneNumber,
            Integer insuranceNumber, String streetName, Integer streetNumber, String insuranceRelationship, String psc,
            Integer idEmployer) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.insuranceNumber = insuranceNumber;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.insuranceRelationship = insuranceRelationship;
        this.psc = psc;
        this.idEmployer = idEmployer;
    }

    public Patient(){}

    public String getLastname() {
        return lastname;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
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

    public String getPsc() {
        return psc;
    }

    public void setPsc(String psc) {
        this.psc = psc;
    }

    public Integer getIdEmployer() {
        return idEmployer;
    }

    public void setIdEmployer(Integer idEmployer) {
        this.idEmployer = idEmployer;
    }

    
}
