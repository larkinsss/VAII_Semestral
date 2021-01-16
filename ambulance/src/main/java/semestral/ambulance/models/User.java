package semestral.ambulance.models;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;

@Entity
@Table(name= "user_data")
public class User {

    @Id
    @Column(name="user_id")
    private Long id;

    @Column(name="user_name")
    private String userName;
    
    @Email
    @Column(name="user_email")
    private String email;

    @Column(name="user_firstname")
    private String firstname;

    @Column(name="user_lastname")
    private String lastname;

    @Column(name="user_birthday")
    private Date birthdate;

    @Column(name="user_password")
    private String password;

    @Column(name="role")
    private int role;

    public User(Long id, String userName, @Email String email, String firstname, String lastname, Date birthdate,
            String password, int role) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.password = password;
        this.role = role;
    }

    public User(User user, String hashedPasswd) {
        this.id = user.id;
        this.userName = user.userName;
        this.email = user.email;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.birthdate = user.birthdate;
        this.password = hashedPasswd;
        this.role = user.role;
    }

    public User() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }    
}
