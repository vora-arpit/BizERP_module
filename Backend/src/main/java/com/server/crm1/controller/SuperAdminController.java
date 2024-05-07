package com.server.crm1.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.server.crm1.exception.BadRequestException;
import com.server.crm1.exception.ResourceNotFoundException;
import com.server.crm1.model.sales.Product;
import com.server.crm1.model.users.AuthProvider;
import com.server.crm1.model.users.Organizations;
import com.server.crm1.model.users.User;
import com.server.crm1.payload.ApiResponse;
import com.server.crm1.payload.SignUpRequest;
import com.server.crm1.repository.OrganizationsRepository;
import com.server.crm1.repository.user.UserRepository;
import com.server.crm1.service.SuperAdminService;
import com.server.crm1.service.UserService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@RequestMapping("/superadmin")
public class SuperAdminController {

    @Autowired
    private SuperAdminService superAdminService;

    @Autowired
    private OrganizationsRepository organizationsRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
	private UserService userService;


    @Autowired
	private PasswordEncoder passwordEncoder;
    
    @GetMapping("/org")
    public List<Organizations> getAllOrganizations() {
        return superAdminService.getAllOrganizations();
    }
    
    @GetMapping("org/{orgid}")
    public Organizations getOrganizationById(@PathVariable(value = "orgid") Long id) {
        return superAdminService.getOrganizationById(id);
    }

    @PostMapping("org")
    public Organizations create(@RequestBody Organizations organization) {
        
        return organizationsRepo.save(organization);
    }

    @PutMapping("org/{orgid}")
    public Organizations update(@PathVariable(value="orgid") Long id, @Valid @RequestBody Organizations organization) {
        organization.setId(id);
        
        return organizationsRepo.save(organization);
    }

    @DeleteMapping("org/{orgid}")
        public ApiResponse delete(@PathVariable(value="orgid") Long id){
            superAdminService.deleteOrganization(id);
            return new ApiResponse(true, "Organization Deleted Successfully");
    }
    
    @PostMapping("/makeuser")
	public ResponseEntity<?> makeUser(@Valid @RequestBody SignUpRequest MakeUserRequest) {
		if (userRepo.existsByEmail(MakeUserRequest.getEmail())) {
			throw new BadRequestException("Email address already in use.");
		}

		// Creating user's account
		User user = new User();
		user.setName(MakeUserRequest.getName());
		user.setEmail(MakeUserRequest.getEmail());
		user.setPassword(MakeUserRequest.getPassword());
        user.setOrganizationId(MakeUserRequest.getOrganizationId());


		user.setProvider(AuthProvider.local);
        
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		User result = userService.create(user);

		URI location = ServletUriComponentsBuilder
				.fromCurrentContextPath().path("/user/me")
				.buildAndExpand(result.getId()).toUri();

		return ResponseEntity.created(location)
				.body(new ApiResponse(true, "User created successfully!"));
	}

    @GetMapping("/allUsers")
	public List<User> search(@RequestParam("filter") String filter) {
		// Long organizationId = userService.getOrganizationId();
		return userRepo.search(filter);
	}

    @GetMapping("/allUsers/{id}")
	public User findById(@PathVariable Integer id) {
		return userRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
	}


}
