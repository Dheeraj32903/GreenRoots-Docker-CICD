package com.klef.soa.docker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TreePlantationEventRequestDTO {

    @NotBlank(message = "Event name is required and cannot be empty")
    private String eventName;

    @NotBlank(message = "Location / Botanical site is required and cannot be empty")
    private String location;

    @NotNull(message = "Number of trees planted is required")
    private Integer treesPlanted;

    @NotNull(message = "Completed status must be specified (true or false)")
    private Boolean completed;
}