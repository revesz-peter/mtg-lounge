package com.codecool.server.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;

import javax.naming.AuthenticationException;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

public class JwtServiceImpl implements JwtService{
    private final byte[] secretKey;

    @Autowired
    public JwtServiceImpl(byte[] secretKey) {
        this.secretKey = secretKey;
    }

    @Override
    public String generateToken(String subject) {
        Key key = Keys.hmacShaKeyFor(secretKey);
        return Jwts.builder()
                .setSubject(subject)
                .signWith(key)
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(3L, ChronoUnit.HOURS)))
                .compact();
    }

    @Override
    public String readTokenBodySubject(String token) throws AuthenticationException {
        try {
            Jws<Claims> jws = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
            return jws.getBody().getSubject();
        } catch (JwtException e) {
            throw new AuthenticationException("JWT '" + token + "' cannot be trusted.");
        }
    }
}
