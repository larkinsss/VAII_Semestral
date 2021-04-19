package semestral.ambulance.restservices;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import semestral.ambulance.models.File;

public interface FileService {

    public File saveFile(MultipartFile file, String idForm) throws IOException;
    
    public File getFileById(String id) throws Exception;

    public List<File> getAllFiles();

    public File getFileByName(String name) throws Exception;
    
}
