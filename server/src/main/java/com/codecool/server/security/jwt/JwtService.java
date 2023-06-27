package com.codecool.server.security.jwt;

import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;

@Service
public interface JwtService {
    String generateToken(String subject);
    String readTokenBodySubject(String token) throws AuthenticationException;
}
