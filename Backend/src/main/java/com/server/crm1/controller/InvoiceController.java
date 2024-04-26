package com.server.crm1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import java.io.File;
import java.io.FileWriter;
import java.util.Collections;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

@RestController
@RequestMapping("/invoice")
public class InvoiceController {

    @Autowired
    private RestTemplate restTemplate;

    @PostMapping("/generate-invoice")
    public ResponseEntity<byte[]> generateInvoice(@RequestBody String jsonData) {
        // Set the URL of the external API
        String apiUrl = "https://invoice-generator.com";

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_PDF));

        // Set the request entity, including the JSON data
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonData, headers);

        // Make the POST request
        ResponseEntity<byte[]> response = restTemplate.exchange(
                apiUrl,
                HttpMethod.POST,
                requestEntity,
                byte[].class
        );

        // Handle the response
        HttpStatus statusCode = response.getStatusCode();
        if (statusCode == HttpStatus.OK) {
            byte[] responseBody = response.getBody();
            
            // Save the PDF file
            savePdf(responseBody);
            
            // Send the PDF file to the frontend
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.APPLICATION_PDF);
            responseHeaders.setContentDispositionFormData("filename", "invoice.pdf");
            
            return new ResponseEntity<>(responseBody, responseHeaders, HttpStatus.OK);
        } else {
            return ResponseEntity.status(statusCode).body(null);
        }
    }

    private void savePdf(byte[] pdfBytes) {
        try (OutputStream outputStream = new FileOutputStream("invoice.pdf")) {
            outputStream.write(pdfBytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
