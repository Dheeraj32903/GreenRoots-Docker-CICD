package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tree_plantation_event")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TreePlantationEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_name", nullable = false)
    private String eventName;

    @Column(name = "location")
    private String location;

    @Column(name = "trees_planted")
    private Integer treesPlanted;

    @Column(name = "completed")
    private Boolean completed;
    
}

