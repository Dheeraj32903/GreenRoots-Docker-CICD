package com.klef.soa.docker.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.soa.docker.dto.TreePlantationEventRequestDTO;
import com.klef.soa.docker.dto.TreePlantationEventResponseDTO;
import com.klef.soa.docker.entity.TreePlantationEvent;
import com.klef.soa.docker.exception.ResourceNotFoundException;
import com.klef.soa.docker.repository.TreePlantationEventRepository;

@Service
public class TreePlantationEventServiceImpl implements TreePlantationEventService {
    @Autowired
    private TreePlantationEventRepository repository;

    @Override
    public TreePlantationEventResponseDTO addTreePlantationEvent(TreePlantationEventRequestDTO requestDTO) {
        TreePlantationEvent newEvent = TreePlantationEvent.builder()
                .eventName(requestDTO.getEventName())
                .location(requestDTO.getLocation())
                .treesPlanted(requestDTO.getTreesPlanted())
                .completed(requestDTO.getCompleted())
                .build();
        TreePlantationEvent savedEvent = repository.save(newEvent);
        return mapToResponse(savedEvent);
    }
    @Override
    public List<TreePlantationEventResponseDTO> displayTreePlantationEvents() {
        return repository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    @Override
    public TreePlantationEventResponseDTO updateTreePlantationEvent(Long id, TreePlantationEventRequestDTO requestDTO) {
        Optional<TreePlantationEvent> optionalEvent = repository.findById(id);
        if (optionalEvent.isPresent()) {
            TreePlantationEvent existingEvent = optionalEvent.get();
            existingEvent.setEventName(requestDTO.getEventName());
            existingEvent.setLocation(requestDTO.getLocation());
            existingEvent.setTreesPlanted(requestDTO.getTreesPlanted());
            existingEvent.setCompleted(requestDTO.getCompleted());
            TreePlantationEvent updatedEvent = repository.save(existingEvent);
            return mapToResponse(updatedEvent);
        } else {
            throw new ResourceNotFoundException("Tree Plantation Event not found with id : " + id);
        }
    }
    @Override
    public String deleteTreePlantationEvent(Long id) {
        Optional<TreePlantationEvent> optionalEvent = repository.findById(id);
        if (optionalEvent.isPresent()) {
            repository.delete(optionalEvent.get());
            return "Tree Plantation Event Deleted Successfully";
        } else {
            return "Tree Plantation Event Id Not Found to Delete";
        }
    }
    private TreePlantationEventResponseDTO mapToResponse(TreePlantationEvent event) {
        return TreePlantationEventResponseDTO.builder()
                .id(event.getId())
                .eventName(event.getEventName())
                .location(event.getLocation())
                .treesPlanted(event.getTreesPlanted())
                .completed(event.getCompleted())
                .build();
    }
}