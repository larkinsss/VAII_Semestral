package semestral.ambulance.models;

public class AuthenticationResponse {
    
    private final String jwt;
    private User user;

    public String getJwt() {
        return jwt;
    }

    public AuthenticationResponse(String jwt) {
        this.jwt = jwt;
    }

    public AuthenticationResponse(String jwt, User user){
        this.jwt = jwt;
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
