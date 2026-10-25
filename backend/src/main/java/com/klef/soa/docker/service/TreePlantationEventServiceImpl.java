package com.klef.soa.docker.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.soa.docker.entity.TreePlantationEvent;
import com.klef.soa.docker.exception.ResourceNotFoundException;
import com.klef.soa.docker.repository.TreePlantationEventRepository;

@Service
public class TreePlantationEventServiceImpl implements TreePlantationEventService {

	@Autowired
	private TreePlantationEventRepository repository;

	@Override
	public TreePlantationEvent addTreePlantationEvent(TreePlantationEvent event) {
		TreePlantationEvent newEvent = TreePlantationEvent.builder()
				.eventName(event.getEventName())
				.location(event.getLocation())
				.treesPlanted(event.getTreesPlanted())
				.completed(event.getCompleted())
				.build();
		return repository.save(newEvent);
	}

	@Override
	public String deleteTreePlantationEvent(Long id) {
		Optional<TreePlantationEvent> optionalEvent = repository.findById(id);
		if (optionalEvent.isPresent()) {
			TreePlantationEvent event = optionalEvent.get();
			repository.delete(event);
			return "Tree Plantation Event Deleted Successfully";
		} else {
			return "Tree Plantation Event Id Not Found to Delete";
		}
	}

	@Override
	public TreePlantationEvent updateTreePlantationEvent(Long id, TreePlantationEvent event) {
		TreePlantationEvent existingEvent = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Tree Plantation Event not found with id : " + id));
		existingEvent.setEventName(event.getEventName());
		existingEvent.setLocation(event.getLocation());
		existingEvent.setTreesPlanted(event.getTreesPlanted());
		existingEvent.setCompleted(event.getCompleted());
		return repository.save(existingEvent);
	}

	@Override
	public List<TreePlantationEvent> displayTreePlantationEvents() {
		return repository.findAll();
	}
}

