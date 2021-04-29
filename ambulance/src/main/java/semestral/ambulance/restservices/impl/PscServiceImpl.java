package semestral.ambulance.restservices.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import javassist.NotFoundException;
import semestral.ambulance.models.ZipPostal;
import semestral.ambulance.repository.PscRepository;

@Service
public class PscServiceImpl {

    private PscRepository pscRepo;

    PscServiceImpl(PscRepository pscRepostory) {
        this.pscRepo = pscRepostory;
    }

    public boolean insertPsc(ZipPostal zip) {
        if (zip != null) {
            Optional<ZipPostal> existing = pscRepo.findById(zip.getPsc());
            if (!existing.isPresent()) {
                 this.pscRepo.save(zip);
                return true;
            }
        }
        return false;
    }

    public List<ZipPostal> getAllZips() {
        return this.pscRepo.findAll();
    }

    public ZipPostal getZipPostal(String postal) throws Exception{
        if (postal != null) {
            Optional<ZipPostal> existing = pscRepo.findById(postal);
            if (existing.isPresent()) {
                return existing.get();
            }
            throw new NotFoundException("Postal was not found!");
        }
        throw new NullPointerException("Postal argument was null!");
    }
    
}
