package com.klef.soa.docker.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.klef.soa.docker.entity.TreePlantationEvent;
import com.klef.soa.docker.service.TreePlantationEventService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("treeplantationevent")
public class TreePlantationEventController {

	@Autowired
	private TreePlantationEventService service;

	@GetMapping( "/")
	public String home() {
		return "CRUD Service is running";
	}

	@PostMapping( "/add")
	public ResponseEntity<?> add(@RequestBody TreePlantationEvent event) {
		TreePlantationEvent savedEvent = service.addTreePlantationEvent(event);
		return ResponseEntity.status(201).body(savedEvent);
	}

	@GetMapping( "/displayall")
	public ResponseEntity<?> displayall() {
		List<TreePlantationEvent> list = service.displayTreePlantationEvents();
		if (list.size() > 0) {
			return ResponseEntity.status(200).body(list);
		} else {
			return ResponseEntity.status(404).body("Tree Plantation Event Data Not Found");
		}
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<?> update(@PathVariable("id") Long id, @RequestBody TreePlantationEvent event) {
		TreePlantationEvent updatedEvent = service.updateTreePlantationEvent(id, event);
		return ResponseEntity.ok(updatedEvent);
	}

	@DeleteMapping( "/delete/{id}")
	public ResponseEntity<String> delete(@PathVariable("id") Long id) {
		String result = service.deleteTreePlantationEvent(id);
		return ResponseEntity.ok(result);
	}
	//this is the required backend....
}

