package semestral.ambulance.models;

import java.sql.Date;
import javax.persistence.*;

@Entity
@Table(name= "pn_form_table")
public class PnForm {

    @Id
    @Column(name= "id_form")
    private String id;

    @Column(name = "temp_adress_street_name")
    private String streetName;

    @Column(name = "temp_adress_street_num")
    private Integer streetNumber;

    @Column(name = "temp_address_psc")
    private String tempAddressPSC;

    @Column(name = "beginning_date")
    private Date beginningDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "diagnose_category")
    private Integer diagnoseCategory;

    @Column(name = "diagnose_number")
    private Integer diagnoseNumber;

    @Column(name = "end_diagnose")
    private Integer endDiagnose;

    @Column(name = "patient_birth_number")
    private String patientBirthNumber;

    @Column(name = "doctor_id")
    private Integer doctorId;

    @Column(name = "status")
    private Integer status;

    public PnForm(String id, String streetName, Integer streetNumber, Date beginningDate, Date endDate,
            Integer diagnoseCategory, Integer diagnoseNumber, Integer endDiagnose, String patientBirthNumber,
            Integer doctorId, String psc, Integer status) {
        this.id = id;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.beginningDate = beginningDate;
        this.endDate = endDate;
        this.diagnoseCategory = diagnoseCategory;
        this.diagnoseNumber = diagnoseNumber;
        this.endDiagnose = endDiagnose;
        this.patientBirthNumber = patientBirthNumber;
        this.doctorId = doctorId;
        this.tempAddressPSC = psc;
        this.status = status;
    }

    public PnForm() {
    }

    

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Date getBeginningDate() {
        return beginningDate;
    }

    public void setBeginningDate(Date beginningDate) {
        this.beginningDate = beginningDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Integer getDiagnoseCategory() {
        return diagnoseCategory;
    }

    public void setDiagnoseCategory(Integer diagnoseCategory) {
        this.diagnoseCategory = diagnoseCategory;
    }

    public Integer getDiagnoseNumber() {
        return diagnoseNumber;
    }

    public void setDiagnoseNumber(Integer diagnoseNumber) {
        this.diagnoseNumber = diagnoseNumber;
    }

    public Integer getEndDiagnose() {
        return endDiagnose;
    }

    public void setEndDiagnose(Integer endDiagnose) {
        this.endDiagnose = endDiagnose;
    }

    public String getPatientBirthNumber() {
        return patientBirthNumber;
    }

    public void setPatientBirthNumber(String patientBirthNumber) {
        this.patientBirthNumber = patientBirthNumber;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public String getTempAddressPSC() {
        return tempAddressPSC;
    }

    public void setTempAddressPSC(String tempAddressPSC) {
        this.tempAddressPSC = tempAddressPSC;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    
}