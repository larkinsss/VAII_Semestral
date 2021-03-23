package semestral.ambulance.util;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionMapper {
    @ResponseStatus(value= HttpStatus.NOT_FOUND)
    @ExceptionHandler(ItemNotFoundException.class)
    public String handleItemNotFoundException(ItemNotFoundException e){
        return e.getMessage();
    }
}
