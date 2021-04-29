package semestral.ambulance.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "message_table")
public class Message {
    
    @Id
    @Column(name = "message_id")
    private String id;

    @Column(name = "message_text")
    private String text;

    @Column(name = "form_id")
    private String pnForm;

    public Message() {
    }

    public Message(String id, String text, String pnForm) {
        this.id = id;
        this.text = text;
        this.pnForm = pnForm;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getPnForm() {
        return pnForm;
    }

    public void setPnForm(String pnForm) {
        this.pnForm = pnForm;
    }

    
}
