package com.klef.soa.docker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
public class CrudServiceProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrudServiceProjectApplication.class, args);
        System.out.println("CrudServiceProject is Running ");
    }

}

