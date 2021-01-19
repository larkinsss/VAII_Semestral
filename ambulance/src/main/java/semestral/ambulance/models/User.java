package semestral.ambulance.models;

import java.sql.Date;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javassist.Loader.Simple;

@Entity
@Table(name = "user_data")
public class User implements UserDetails {

    @Id
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_name")
    private String username;

    @Email
    @Column(name = "user_email")
    private String email;

    @Column(name = "user_firstname")
    private String firstname;

    @Column(name = "user_lastname")
    private String lastname;

    @Column(name = "user_birthdate")
    private Date birthdate;

    @Column(name = "user_password")
    private String password;

    @Column(name = "role")
    private Role role;

    public User(Long id, String userName, @Email String email, String firstname, String lastname, Date birthdate,
            String password, String role) {
        this.id = id;
        this.username = userName;
        this.email = email;
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.password = password;
        if (role.equals("ADMIN")) {
            this.role = Role.ADMIN;
        }
        if (role.equals("USER")) {
            this.role = Role.USER;
        }
    }

    public User(User user, String hashedPasswd) {
        this.id = user.id;
        this.username = user.username;
        this.email = user.email;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.birthdate = user.birthdate;
        this.password = hashedPasswd;
        this.role = user.role;
    }

    public User(String username) {
        this.username = username;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.username = userName;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role.equals(Role.ADMIN)) {
            return Arrays.asList(new SimpleGrantedAuthority("ADMIN"));
        } else {
            return Arrays.asList(new SimpleGrantedAuthority("USER"));
        }
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return true;
    }
}
