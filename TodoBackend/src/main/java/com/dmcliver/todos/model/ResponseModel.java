package com.dmcliver.todos.model;

import java.io.Serializable;

public class ResponseModel implements Serializable {

    private static final long serialVersionUID = 1L;

    private String responseMessage = "Transfer approved";
    private boolean valid = true;
    
    public String getResponseMessage() {
        return responseMessage;
    }
    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }
    
    public boolean isValid() {
        return valid;
    }
    public void setValid(boolean valid) {
        this.valid = valid;
    }
}
