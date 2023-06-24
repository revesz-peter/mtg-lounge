package com.codecool.server.service;

import com.codecool.server.dto.UserDTO;
import com.codecool.server.model.User;
import com.codecool.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void saveUser(UserDTO userDTO){
        User user = new User();
        user.setUsername(userDTO.username());
        user.setPassword(userDTO.password());
        userRepository.save(user);
    }
}

