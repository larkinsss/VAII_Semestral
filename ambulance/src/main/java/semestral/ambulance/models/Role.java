package semestral.ambulance.models;

public enum Role{
    ADMIN,
    DOCTOR,
    UNREGISTERED,
    PSP;

    public static Role getRoleByInt(Integer number) {
        switch (number) {
            case 0:
                return ADMIN;
            case 1: 
                return DOCTOR;
            case 2:
                return UNREGISTERED;
            default:
                return PSP;    
        }
    }
}