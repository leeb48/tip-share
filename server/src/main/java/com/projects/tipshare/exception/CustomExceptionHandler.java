package com.projects.tipshare.exception;

import com.projects.tipshare.exception.authexception.DuplicateUsernameException;
import com.projects.tipshare.exception.authexception.DuplicateUsernameResponse;
import com.projects.tipshare.exception.googleapiexcpetion.SearchFailedException;
import com.projects.tipshare.exception.googleapiexcpetion.SearchFailedResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<Object> handleDuplicateUsernameException(DuplicateUsernameException ex, WebRequest req) {
        DuplicateUsernameResponse res = new DuplicateUsernameResponse(ex.getMessage());

        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler
    public final ResponseEntity<Object> handleSearchFailedException(SearchFailedException ex, WebRequest req) {
        SearchFailedResponse res = new SearchFailedResponse(ex.getMessage());

        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }

}
