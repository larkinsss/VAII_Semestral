package semestral.ambulance.restservices;

import java.util.List;

import semestral.ambulance.models.PnForm;
import semestral.ambulance.util.ItemAlreadyExisting;
import semestral.ambulance.util.ItemNotFoundException;
import semestral.ambulance.util.NoItemsFoundException;

public interface PnFormService {

    public PnForm createPnForm(PnForm pnForm) throws ItemAlreadyExisting;

    public boolean deletePnForm(String pnFormId) throws ItemNotFoundException; 

    public PnForm getPnFormById(String pnFormId) throws ItemNotFoundException;

    public List<PnForm> getAllPnForms() throws NoItemsFoundException;

    public PnForm updatePnForm(PnForm pnForm) throws ItemNotFoundException;
}
