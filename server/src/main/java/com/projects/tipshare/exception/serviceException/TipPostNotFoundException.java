package com.projects.tipshare.exception.serviceException;

public class TipPostNotFoundException extends RuntimeException {
    public TipPostNotFoundException(String message) {
        super(message);
    }
}
