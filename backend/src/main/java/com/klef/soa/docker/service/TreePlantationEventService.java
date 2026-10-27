package com.klef.soa.docker.service;

import java.util.List;
import com.klef.soa.docker.dto.TreePlantationEventRequestDTO;
import com.klef.soa.docker.dto.TreePlantationEventResponseDTO;

public interface TreePlantationEventService {
    TreePlantationEventResponseDTO addTreePlantationEvent(TreePlantationEventRequestDTO requestDTO);
    List<TreePlantationEventResponseDTO> displayTreePlantationEvents();
    TreePlantationEventResponseDTO updateTreePlantationEvent(Long id, TreePlantationEventRequestDTO requestDTO);
    String deleteTreePlantationEvent(Long id);
}