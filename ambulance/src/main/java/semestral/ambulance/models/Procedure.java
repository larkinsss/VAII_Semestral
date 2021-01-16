package semestral.ambulance.models;

import javax.persistence.*;

@Entity
@Table(name= "procedures_table")
public class Procedure {

    @Id
    @Column (name = "procedure_id")
    private Long procedureId;

    @Column (name = "description")
    private String description;

    @Column (name = "proc_name")
    private String procedureName;

    @Column (name = "proc_price")
    private double procedurePrice;

    @Column (name = "proc_rest")
    private String procedureRestriction;

    public Procedure(Long procedureId, String description, String procedureName, double procedurePrice,
            String procedureRestriction) {
        this.procedureId = procedureId;
        this.description = description;
        this.procedureName = procedureName;
        this.procedurePrice = procedurePrice;
        this.procedureRestriction = procedureRestriction;
    }

    public Procedure(){}

    public Long getProcedureId() {
        return procedureId;
    }

    public void setProcedureId(Long procedureId) {
        this.procedureId = procedureId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProcedureName() {
        return procedureName;
    }

    public void setProcedureName(String procedureName) {
        this.procedureName = procedureName;
    }

    public double getProcedurePrice() {
        return procedurePrice;
    }

    public void setProcedurePrice(double procedurePrice) {
        this.procedurePrice = procedurePrice;
    }

    public String getProcedureRestriction() {
        return procedureRestriction;
    }

    public void setProcedureRestriction(String procedureRestriction) {
        this.procedureRestriction = procedureRestriction;
    }
    
    
}
