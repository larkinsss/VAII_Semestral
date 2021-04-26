package semestral.ambulance.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "files_data")
public class AttachmentFile {

    @Id
    @Column(name = "id")
    private String id;

    @Lob
    @Type(type = "org.hibernate.type.BinaryType")
    @Column(name = "data")
    private byte[] data;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "patient_birth_number")
    private String patient;

    @Column(name = "id_form")
    private String pnForm;

    public AttachmentFile() {
    }

    public AttachmentFile(String id, byte[] data, String name, String type, String patient, String pnForm) {
        this.id = id;
        this.data = data;
        this.name = name;
        this.type = type;
        this.patient = patient;
        this.pnForm = pnForm;
    }



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPatient() {
        return patient;
    }

    public void setPatient(String patient) {
        this.patient = patient;
    }

    public String getPnForm() {
        return pnForm;
    }

    public void setPnForm(String pnForm) {
        this.pnForm = pnForm;
    }
    
    

}