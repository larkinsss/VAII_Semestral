package semestral.ambulance.util;

import java.io.File;
import java.io.IOException;
import java.sql.Date;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentCatalog;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDField;
import org.springframework.stereotype.Service;

import semestral.ambulance.models.DatabaseObjectModels.DBOPnForm;
import semestral.ambulance.models.Employer;
import semestral.ambulance.models.Patient;
import semestral.ambulance.restservices.EmployerService;
import semestral.ambulance.restservices.PatientService;

/**
 * This class presents methods and logic for generating pdf documents
 */
@Service
public class PdfGeneratorClass {

    private PatientService patientService;
    private EmployerService employerService;

    private static String original = "C:/Users/petla/git/bakalarska_praca_ambulancia/ambulance/src/main/resources/pn_form.pdf";
    private static String target = "C:/Users/petla/git/bakalarska_praca_ambulancia/ambulance/src/main/resources/pn_form_filled.pdf";

    /**
     * This method tries to populate fields of predefined pdf document with data from SicknessLeave form
     * @param pnForm sickness leave form data (PN)
     */
    public void fillPdfWithFormData(DBOPnForm pnForm) {
        try {
			populateSicknessLeave(original, target, pnForm);
		} catch (Exception e) {
			System.err.println(e);
		}
    }

    public PdfGeneratorClass(PatientService patientService, EmployerService employerService) {
        this.patientService = patientService;
        this.employerService = employerService;
    }

    /**
     * Method that takes predefined pdf document, creates a copy of it 
     * Populates it's fields and saves it to specified location
     * @param originalPdf original document
     * @param targetPdf new document filled out 
     * @param pnForm sickness leave form data
     * @throws IOException throws exception if population of field fails
     */
    private void populateSicknessLeave(String originalPdf, String targetPdf, DBOPnForm pnForm) throws IOException {
        
        PDDocument pdfDocument = PDDocument.load(new File(originalPdf));

        
        try {
            Patient patient = this.patientService.getById(pnForm.patientBirthNumber);
            Employer employer = this.employerService.getEmployerById(patient.getIdEmployer());

            setField("id", pnForm.id, pdfDocument);
            setField("name_field", patient.getFirstname() + " " + patient.getLastname(), pdfDocument);
            setField("birthnumber", patient.getId(), pdfDocument);
            setField("address", patient.getStreetName() + " " + patient.getStreetNumber() + ", " + patient.getPsc(), pdfDocument);
            setField("employer", employer.getName() + ", " +  employer.getAdressStreet() + " " + employer.getAdressNumber() + ", " + employer.getPsc(), pdfDocument);

            if (pnForm.streetName == null) {
                setField("temp_address", patient.getStreetName() + " " + patient.getStreetNumber() + ", " + patient.getPsc(), pdfDocument);
            } else {
                setField("temp_address", pnForm.streetName + " " + pnForm.streetNumber + ", " + pnForm.tempAddressPSC, pdfDocument);
            }
            String rel = "relationship";
            switch (patient.getInsuranceRelationship()) {
                case "Zamestnanec":
                    setField(rel, "0", pdfDocument);
                    break;
                case "Povinne nemocensky poistená samostatne zárobkovo činná osoba":
                    setField(rel, "1", pdfDocument);
                    break;
                case "Dobrovoľne nemocensky poistená osoba":
                    setField(rel, "2", pdfDocument);
                    break;
                default:
                    throw new DocumentPopulationException("Program could not map value of Insurance relationship to field in document");
            }

            String group = "Group2";
            switch (pnForm.diagnoseCategory) {
                case 0:     
                    setField(group, "0", pdfDocument);         
                    break;
                case 1:     
                    setField(group, "1", pdfDocument);                   
                    break;
                case 2:      
                    setField(group, "2", pdfDocument);                  
                    break;
                case 3:      
                    setField(group, "3", pdfDocument);               
                    break;
                case 4:    
                    setField(group, "4", pdfDocument);                   
                    break;
                case 5:      
                    setField(group, "5", pdfDocument);                 
                    break;
                case 6:                    
                    setField(group, "6", pdfDocument);   
                    break;
                default:
                throw new DocumentPopulationException("Program could not map value of diagnose category to field in document");
            }
            setField("insurance_code", patient.getInsuranceNumber().toString(), pdfDocument);
            setField("start_date", pnForm.beginningDate.toGMTString(), pdfDocument);
            setField("diagnose", pnForm.diagnoseNumber.toString(), pdfDocument);
            setField("today_date", new Date(System.currentTimeMillis()).toGMTString(), pdfDocument);

        } catch (Exception e) {
            throw new DocumentPopulationException(e.getMessage());
        }
        
        pdfDocument.save(targetPdf);

        pdfDocument.close();
    }
    

    /**
     * Method that tries to find field with specified name in specified document
     * If field is found value is inserted in the field
     * @param name name of the field in document
     * @param value value to be stored in the field
     * @param document document where field is supposed to be
     * @throws IOException Exception when field not found, or processing fails
     */
    public static void setField(String name, String value, PDDocument document) throws IOException {
        PDDocumentCatalog docCatalog = document.getDocumentCatalog();
        PDAcroForm acroForm = docCatalog.getAcroForm();
        PDField field = acroForm.getField( name );
        if( field != null ) {
            field.setValue(value);
        }
        else {
            throw new DocumentPopulationException( "No field found with name:" + name );
        }
    }

    /**
     * Method that returns field with specified name
     * @param name name of the field
     * @param document document where field should be
     * @return returns 
     * @throws IOException
     */
    public static String getField(String name, PDDocument document) throws IOException {
        PDDocumentCatalog docCatalog = document.getDocumentCatalog();
        PDAcroForm acroForm = docCatalog.getAcroForm();
        PDField field = acroForm.getField( name );
        return field.getValueAsString();
    }


    
}
