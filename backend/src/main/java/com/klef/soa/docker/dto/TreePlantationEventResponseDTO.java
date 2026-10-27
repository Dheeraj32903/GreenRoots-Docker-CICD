package com.klef.soa.docker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TreePlantationEventResponseDTO {
    private Long id;
    private String eventName;
    private String location;
    private Integer treesPlanted;
    private Boolean completed;
}