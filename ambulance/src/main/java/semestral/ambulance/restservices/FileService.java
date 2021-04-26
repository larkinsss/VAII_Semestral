package semestral.ambulance.restservices;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import semestral.ambulance.models.AttachmentFile;

public interface FileService {

    public AttachmentFile saveFile(MultipartFile file, String idForm) throws IOException;
    
    public AttachmentFile getFileById(String id) throws Exception;

    public List<AttachmentFile> getAllFiles();

    public AttachmentFile getFileByName(String name) throws Exception;
    
}
