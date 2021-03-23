package semestral.ambulance.restservices.impl;

import org.springframework.stereotype.Service;
import semestral.ambulance.models.Procedure;
import semestral.ambulance.repository.ProcedureRepository;
import semestral.ambulance.restservices.ProcedureService;

import java.util.List;
import java.util.Optional;

@Service
public class ProcedureServiceImpl implements ProcedureService{


    private ProcedureRepository procedureRepository;

    public ProcedureServiceImpl(ProcedureRepository procedureRepository) {
        this.procedureRepository = procedureRepository;
    }

    @Override
    public Procedure createProcedure(Procedure procedure) {
        procedureRepository.save(procedure);
        return procedure;
    }

    @Override
    public Procedure getProcedureById(Long procedureId) {
        return procedureRepository.findById(procedureId).orElse(null);
    }

    @Override
    public List<Procedure> getAllProcedures(){
        return procedureRepository.findAll();
        // System.err.println(procedureList);
    }

    @Override
    public Optional<Procedure> deleteProcedure(Long procedureId) {
        return procedureRepository.findById(procedureId).map(result -> (Procedure) result);
    }

    @Override
    public boolean deleteAll() {
        try{
            procedureRepository.deleteAll();
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    @Override
    public Procedure updateProcedure(Procedure procedure) {
        try {
            Optional<Procedure> procedureToBeUpdated = procedureRepository.findById(procedure.getProcedureId()).map(result -> (Procedure) result);
            if (procedureToBeUpdated.isPresent()) {
                Procedure oldProcedure = procedureToBeUpdated.get();
                procedureRepository.deleteById(oldProcedure.getProcedureId());
                procedureRepository.save(procedure);
                return procedureToBeUpdated.get();
            }
            return null;
        }
        catch (Exception e) {
            return null;
        }
    }
}

