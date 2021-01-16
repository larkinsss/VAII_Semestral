package semestral.ambulance.restservices;

import semestral.ambulance.models.Procedure;
import java.util.List;
import java.util.Optional;

public interface ProcedureService {
    public Procedure createProcedure(Procedure procedure);

    public Procedure getProcedureById(Long procedureId);

    public List<Procedure> getAllProcedures();

    public Optional<Procedure> deleteProcedure(Long procedureId);

    public boolean deleteAll();

    public Procedure updateProcedure(Procedure procedure);
}
