package com.projects.tipshare.service;

import com.projects.tipshare.model.SecurityUser;
import com.projects.tipshare.model.User;
import com.projects.tipshare.repository.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserSecurityService implements UserDetailsService {

    private final UserRepo userRepo;

    public UserSecurityService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> user = userRepo.findByUsername(username);

        return user.map(SecurityUser::new).orElse(null);
    }
}
