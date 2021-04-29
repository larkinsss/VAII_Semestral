package semestral.ambulance.restservices;

import java.util.List;

import semestral.ambulance.models.Message;
import semestral.ambulance.util.ItemAlreadyExisting;
import semestral.ambulance.util.ItemNotFoundException;

public interface MessageService {
    public Message createMessage(Message message) throws ItemAlreadyExisting;

    public Message getById(String id) throws ItemNotFoundException;

    public List<Message> getAllMessages();

    public boolean deleteMessage(String id) throws ItemNotFoundException;

    public Message updateMessage(Message message) throws ItemNotFoundException;

    public Message getByPnForm(String pnForm) throws ItemNotFoundException;

    public boolean deleteByPnForm(String pnForm) throws ItemNotFoundException;
}
