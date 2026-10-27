package com.klef.soa.docker.controller;

import java.util.List;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.klef.soa.docker.dto.TreePlantationEventRequestDTO;
import com.klef.soa.docker.dto.TreePlantationEventResponseDTO;
import com.klef.soa.docker.service.TreePlantationEventService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("treeplantationevent")
public class TreePlantationEventController {

    @Autowired
    private TreePlantationEventService service;

    @GetMapping("/")
    public String home() {
        return "CRUD Service is running";
    }

    @PostMapping("/add")
    public ResponseEntity<TreePlantationEventResponseDTO> add(@Valid @RequestBody TreePlantationEventRequestDTO requestDTO) {
        TreePlantationEventResponseDTO savedEvent = service.addTreePlantationEvent(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
    }

    @GetMapping("/displayall")
    public ResponseEntity<?> displayall() {
        List<TreePlantationEventResponseDTO> list = service.displayTreePlantationEvents();
        if (!list.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(list);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tree Plantation Event Data Not Found");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TreePlantationEventResponseDTO> update(@PathVariable("id") Long id, @Valid @RequestBody TreePlantationEventRequestDTO requestDTO) {
        TreePlantationEventResponseDTO updatedEvent = service.updateTreePlantationEvent(id, requestDTO);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Long id) {
        String result = service.deleteTreePlantationEvent(id);
        return ResponseEntity.ok(result);
    }
}