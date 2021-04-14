package semestral.ambulance.controllers;

import java.io.IOException;
import java.sql.Array;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


import semestral.ambulance.models.DBOPnForm;
import semestral.ambulance.models.DBOPsc;
import semestral.ambulance.util.PdfClass;
import semestral.ambulance.models.ZipPostal;
import semestral.ambulance.restservices.impl.PscServiceImpl;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(
	origins = {"http://localhost:4200", "http://localhost:8080"}, 
	allowedHeaders = {"Authorization", "Content-type"},
	exposedHeaders = {"Authorization", "Content-type"}
)
@RestController
public class FileController {

    private PdfClass pdfClass;
    private final PscServiceImpl pscServ;
	private final ModelMapper modelMapper;

    public FileController(PdfClass pdfClass, PscServiceImpl pscService, ModelMapper modelMapper) {
        this.pdfClass = pdfClass;
        this.pscServ = pscService;
        this.modelMapper = modelMapper;
    }


    @PostMapping(value = "/pdf/fill")
    public ResponseEntity<DBOPnForm> fillPdf(@RequestBody DBOPnForm form) {
        try {
            this.pdfClass.doMagic(form);
            return ResponseEntity.accepted().body(form);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }        
    }

    @PostMapping(value = "/psc/post")
    public ResponseEntity pscMapping(@RequestBody List<DBOPsc> list) {
        try {
            for (DBOPsc psc : list) {
                if (psc.psc != null) {
                    this.pscServ.insertPsc(modelMapper.map(psc, ZipPostal.class));
                }                
            } 
            return ResponseEntity.ok().body(true);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
              
        
    }


    @GetMapping(value = "/pdf/{fileName:.+}", produces = "application/pdf")
    public ResponseEntity<InputStreamResource> download(@PathVariable("fileName") String fileName) throws IOException {
        
        System.out.println("Calling Download:- " + fileName);
        ClassPathResource pdfFile = new ClassPathResource(fileName);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        headers.add("Access-Control-Allow-Methods", "GET, POST, PUT");
        headers.add("Access-Control-Allow-Headers", "Content-Type");
        headers.add("Content-Disposition", "filename=" + fileName);
        headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
 
        headers.setContentLength(pdfFile.contentLength());
        return new ResponseEntity<InputStreamResource>(new InputStreamResource(pdfFile.getInputStream()), headers, HttpStatus.OK);
    }


    

}
