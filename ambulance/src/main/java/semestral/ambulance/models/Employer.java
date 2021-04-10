package semestral.ambulance.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "employer_data")
public class Employer {
    
    @Id
    @Column(name = "company_id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "adress_street")
    private String adressStreet;

    @Column(name = "adress_number")
    private Integer adressNumber;

    @Column(name = "psc")
    private String psc;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdressStreet() {
        return adressStreet;
    }

    public void setAdressStreet(String adressStreet) {
        this.adressStreet = adressStreet;
    }

    public Integer getAdressNumber() {
        return adressNumber;
    }

    public void setAdressNumber(Integer adressNumber) {
        this.adressNumber = adressNumber;
    }

    public String getPsc() {
        return psc;
    }

    public void setPsc(String psc) {
        this.psc = psc;
    }

    public Employer(Integer id, String name, String adressStreet, Integer adressNumber, String psc) {
        this.id = id;
        this.name = name;
        this.adressStreet = adressStreet;
        this.adressNumber = adressNumber;
        this.psc = psc;
    }

    public Employer() {
    }
}
