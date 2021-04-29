package semestral.ambulance.restservices.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import semestral.ambulance.models.Message;
import semestral.ambulance.repository.MessageRepository;
import semestral.ambulance.restservices.MessageService;
import semestral.ambulance.util.ItemAlreadyExisting;
import semestral.ambulance.util.ItemNotFoundException;


@Service
public class MessageServiceImpl implements MessageService {

    private MessageRepository messRepo;

    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messRepo = messageRepository;
    }

    @Override
    public Message createMessage(Message message) throws ItemAlreadyExisting {
        if (message != null) {
            if(messRepo.findById(message.getId()).isPresent()){
                throw new ItemAlreadyExisting("Patient with this birth number already exists!");
            } else {
                messRepo.save(message);
            }
        }
        return message;
    }

    @Override
    public Message getById(String id) throws ItemNotFoundException {
        if (id != null) {
            Optional<Message> dbResponse = this.messRepo.findById(id);
            if (dbResponse.isPresent()) {
                return dbResponse.get();
            } else {
                throw new ItemNotFoundException("getPatientById: Patient with this birthnumber was not found!");
            }
        }
        throw new NullPointerException("getPatientById: Argument id passed was null!");
    }

    @Override
    public List<Message> getAllMessages() {
        return messRepo.findAll();
    }

    @Override
    public boolean deleteMessage(String id) throws ItemNotFoundException {
        if(id != null) {
            try {
                messRepo.deleteById(id);
                return true;
            } catch (Exception e) {
                return false;
            }
        }
        return false;
    }

    @Override
    public Message updateMessage(Message message) throws ItemNotFoundException {
        try {
            Optional<Message> messToBeUpdated = messRepo.findById(message.getId());
            if (messToBeUpdated.isPresent()) {
                messRepo.deleteById(messToBeUpdated.get().getId());
                messRepo.save(message);
                return message;
            }
            throw new ItemNotFoundException("Item to be removed not found!");
        }
        catch (Exception e) {
            throw new ItemNotFoundException(e.getMessage());
        }
    }

    @Override
    public Message getByPnForm(String pnForm) throws ItemNotFoundException {
        if (pnForm != null) {
            Optional<Message> dbResponse = this.messRepo.findByPnForm(pnForm);
            if (dbResponse.isPresent()) {
                return dbResponse.get();
            } else {
                throw new ItemNotFoundException("getPatientById: Patient with this birthnumber was not found!");
            }
        }
        throw new NullPointerException("getPatientById: Argument id passed was null!");
    }

    @Override
    public boolean deleteByPnForm(String pnForm) throws ItemNotFoundException {
        if(pnForm != null) {
            try {
                Optional<Message> toBeRemoved = messRepo.findByPnForm(pnForm);
                if (toBeRemoved.isPresent()) {
                    messRepo.deleteById(toBeRemoved.get().getId());
                    return true;
                }                
            } catch (Exception e) {
                return false;
            }
        }
        return false;
    }
    
}
