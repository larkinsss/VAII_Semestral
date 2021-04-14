package semestral.ambulance.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name= "city_table")
public class ZipPostal {

    @Id
    @Column(name = "psc")
    private String psc;

    @Column(name = "name")
    private String name;

    public String getPsc() {
        return psc;
    }

    public void setPsc(String psc) {
        this.psc = psc;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ZipPostal(String psc, String name) {
        this.psc = psc;
        this.name = name;
    }

    public ZipPostal() {}

    
}
