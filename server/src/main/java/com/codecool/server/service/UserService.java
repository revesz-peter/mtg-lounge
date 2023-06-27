package com.codecool.server.service;

import com.codecool.server.dto.UserDTO;
import com.codecool.server.model.User;
import com.codecool.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public UserDTO saveUser(UserDTO userDTO){
        User existingUser = userRepository.findByUsername(userDTO.username()).orElse((null));
        if(existingUser!=null){
            throw new RuntimeException("Username already taken");
        }

        User user = new User();
        user.setUsername(userDTO.username());
        user.setPassword(userDTO.password());
        userRepository.save(user);
        return userDTO;
    }
}

