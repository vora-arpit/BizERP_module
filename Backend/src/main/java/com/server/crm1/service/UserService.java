package com.server.crm1.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.server.crm1.exception.BadRequestException;
import com.server.crm1.exception.ResourceNotFoundException;
import com.server.crm1.model.sales.Customer;
import com.server.crm1.model.users.Role;
import com.server.crm1.model.users.User;
import com.server.crm1.model.users.UserRole;
import com.server.crm1.repository.RoleRepository;
import com.server.crm1.repository.UserRoleRepository;
import com.server.crm1.repository.customer.CustomerRepository;
import com.server.crm1.repository.user.UserRepository;
import com.server.crm1.security.UserPrincipal;

@Service
public class  UserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RoleRepository roleRepo;

	@Autowired
	private UserRoleRepository userRoleRepo;

	@Autowired
	private CustomerRepository customerRepo;

	public User create(User user) {
		Optional<Role> defaultRole = roleRepo.findById(Role.ADMIN);
		user = userRepo.save(user);
		UserRole userRole = new UserRole();
		userRole.setRole(defaultRole.get());
		userRole.setUser(user);
		userRole = userRoleRepo.save(userRole);
		user.setUserRoles(Arrays.asList(userRole));
		return user;
	}

	public User update(User user) {
		User u = userRepo.findById(user.getId()).get();
		u.setName(user.getName());
		u.setImageUrl(user.getImageUrl());
		return userRepo.save(u);
	}

	@PreAuthorize("hasRole('" + Role.ADMIN + "')")
	public void addRole(Integer userId, String roleId) {
		if (userId == null || roleId == null)
			throw new BadRequestException("User and Role are required.");

		User user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

		Role role = roleRepo.findById(roleId)
				.orElseThrow(() -> new ResourceNotFoundException("Role", "name", roleId));

		UserRole exists = userRoleRepo.findByUserAndRole(user, role);
		if (exists != null) {
			// do nothing
			return;
		}

		UserRole newUserRole = new UserRole();
		newUserRole.setUser(user);
		newUserRole.setRole(role);
		userRoleRepo.save(newUserRole);
	}

	@PreAuthorize("hasRole('" + Role.ADMIN + "')")
	public void removeRole(Integer userId, String roleId) {

		User user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

		Role role = roleRepo.findById(roleId)
				.orElseThrow(() -> new ResourceNotFoundException("Role", "name", roleId));

		UserRole exists = userRoleRepo.findByUserAndRole(user, role);
		if (exists == null) {
			// do nothing
			return;
		}

		userRoleRepo.delete(exists);
	}

	public User getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		User currentUser = userPrincipal.getRef();
		
		// Print list of users with the same organization_id
		// List<User> users = getUsersByOrganizationId();
		// System.out.println("Users with the same organization_id: " + users);
	
		return currentUser;
	}
	

	public Integer getOrganizationId() {
        User currentUser = getCurrentUser();
        // Assuming the organization ID is a field in the User entity, replace this with your actual field name
        return currentUser.getOrganizationId();
    }

	// public List<User> getUsersByOrganizationId() {
    //     Integer organizationId = getOrganizationId();
    //     return userRepo.findByOrganizationId(organizationId);
    // }

	public List<User> getUsersByOrganizationId(Integer organizationId) {
        return userRepo.findByOrganizationId(organizationId);
    }

    public Integer getPositionId() {
        User currentUser = getCurrentUser();
        // Assuming the position ID is a field in the User entity, replace this with your actual field name
        return currentUser.getPositionId();
    }

	public void delete(Integer id) {
		User x = userRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Customer", "id", id));

		List<Customer> customers = customerRepo.findByCreatedBy(x);

		if (!customers.isEmpty())
			throw new BadRequestException("This User has " + customers.size() + " customers and cannot be deleted");

		x.getUserRoles().forEach(ur -> {
			userRoleRepo.delete(ur);
		});

		userRepo.delete(x);
	}

}
