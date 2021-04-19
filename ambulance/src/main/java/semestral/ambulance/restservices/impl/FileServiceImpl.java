package semestral.ambulance.restservices.impl;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties.Io;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import semestral.ambulance.models.File;
import semestral.ambulance.models.PnForm;
import semestral.ambulance.repository.FileRepository;
import semestral.ambulance.repository.PnFormRepository;
import semestral.ambulance.restservices.FileService;
import semestral.ambulance.util.ItemNotFoundException;

@Service
public class FileServiceImpl implements FileService {

    private FileRepository fileRepo;
    private PnFormRepository pnRepo;

    public FileServiceImpl(FileRepository fileRepo, PnFormRepository pnRepository) {
        this.fileRepo = fileRepo;
        this.pnRepo = pnRepository;
    }

    @Override
    public File saveFile(MultipartFile file, String idForm) throws IOException {
        if (file != null) {
            Optional<PnForm> form = pnRepo.findById(idForm);
            if (form.isPresent()) {

                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                File fileToDatabase = new File(UUID.randomUUID().toString(), file.getBytes(), fileName, file.getContentType(), form.get().getPatient().getId(), form.get().getId());

                return this.fileRepo.save(fileToDatabase);
            }
            
        }
        throw new NullPointerException("saveFile: MultipartFile argument is null");
    }

    @Override
    public File getFileById(String id) throws Exception {
        if (id != null) {
            Optional<File> existing = this.fileRepo.findById(id);
            if (existing.isPresent()) {
                return existing.get();
            } else {
                throw new ItemNotFoundException("getFileById: File with specified id was not found.");
            }
        }
        throw new NullPointerException("getFileById: id specified in argument is null");
    }

    @Override
    public List<File> getAllFiles() {
        return this.fileRepo.findAll();
    }

    @Override
    public File getFileByName(String name) throws Exception {
        if (name != null) {
            Optional<File> existing = this.fileRepo.findByName(name);
            if (existing.isPresent()) {
                return existing.get();
            } else {
                throw new ItemNotFoundException("getFileById: File with specified name was not found.");
            }
        }
        throw new NullPointerException("getFileById: id specified in argument is null");
    }
    
}
