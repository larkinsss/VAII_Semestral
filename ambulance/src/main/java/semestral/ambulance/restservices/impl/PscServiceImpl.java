package semestral.ambulance.restservices.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

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

    
}
