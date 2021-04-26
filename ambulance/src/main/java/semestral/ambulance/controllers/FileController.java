package semestral.ambulance.controllers;

import java.io.IOException;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import semestral.ambulance.models.DatabaseObjectModels.DBOPnForm;
import semestral.ambulance.models.DatabaseObjectModels.DBOPsc;
import semestral.ambulance.util.PdfGeneratorClass;
import semestral.ambulance.models.AttachmentFile;
import semestral.ambulance.models.ZipPostal;
import semestral.ambulance.restservices.FileService;
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

    private PdfGeneratorClass pdfClass;
    private final PscServiceImpl pscServ;
	private final ModelMapper modelMapper;
    private final FileService fileServ;

    public FileController(PdfGeneratorClass pdfClass, PscServiceImpl pscService, ModelMapper modelMapper, FileService fileService) {
        this.pdfClass = pdfClass;
        this.pscServ = pscService;
        this.modelMapper = modelMapper;
        this.fileServ = fileService;
    }


    @PostMapping(value = "/pdf/fill")
    public ResponseEntity<DBOPnForm> fillPdf(@RequestBody DBOPnForm form) {
        try {
            this.pdfClass.fillPdfWithFormData(form);
            return ResponseEntity.accepted().body(form);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
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


    @PostMapping("/file/upload/{id_form}")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @PathVariable("id_form") String idForm) {

        try {
            this.fileServ.saveFile(file, idForm);
            return ResponseEntity.ok().body("Uploaded the file successfully: " + file.getOriginalFilename());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("Could not upload the file: " + file.getOriginalFilename() + "!");
        }
    }

    @GetMapping("/file/get/{name}")
    public ResponseEntity getFile(@PathVariable("name") String name) {
        
        try {
            AttachmentFile fileFromDB = this.fileServ.getFileByName(name);
            return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileFromDB.getName() + "\"").body(fileFromDB.getData());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    @GetMapping(value = "file/get/all") 
    public ResponseEntity getAllFiles() {
        try {
            List<AttachmentFile> list = this.fileServ.getAllFiles();
            return ResponseEntity.ok().body(list);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
