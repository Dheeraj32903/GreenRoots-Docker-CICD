package com.klef.soa.docker.service;

import java.util.List;
import com.klef.soa.docker.entity.TreePlantationEvent;

public interface TreePlantationEventService {
	public TreePlantationEvent addTreePlantationEvent(TreePlantationEvent event);
	public List<TreePlantationEvent> displayTreePlantationEvents();
	public TreePlantationEvent updateTreePlantationEvent(Long id, TreePlantationEvent event);
	public String deleteTreePlantationEvent(Long id);
}

