package com.server.crm1.model.users;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Organizations {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    public Long id;

    public String Org_Name;

    public String Org_Description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
        }

    public String getName() {
        return Org_Name;
    }

    public void setName(String Org_Name) {
        this.Org_Name = Org_Name;
    }

    public String getDescription() {
        return Org_Description;
    }

    public void setDescription(String Org_Description) {
        this.Org_Description = Org_Description;
    }
}
