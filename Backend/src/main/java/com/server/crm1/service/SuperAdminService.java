package com.server.crm1.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.crm1.exception.ResourceNotFoundException;
import com.server.crm1.model.users.Organizations;
import com.server.crm1.repository.OrganizationsRepository;

@Service
public class SuperAdminService {
    @Autowired
    private OrganizationsRepository organizationRepo;

    public List<Organizations> getAllOrganizations(){
        return organizationRepo.findAll();
    }

    public Organizations getOrganizationById(Long OrganizationId){
        Optional<Organizations> organization=organizationRepo.findById(OrganizationId);
        return organization.orElse(null);
    }

    public void deleteOrganization(Long organizationId){
        Organizations existingOrganization=getOrganizationById(organizationId);
        if(existingOrganization!=null){
            organizationRepo.delete(existingOrganization);
        }else {
            throw new ResourceNotFoundException("Organization", "id", organizationId);
        }
    }


}
