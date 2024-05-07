package com.server.crm1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.server.crm1.model.users.Organizations;

@Repository
public interface OrganizationsRepository extends JpaRepository<Organizations,Long> {
    
}
