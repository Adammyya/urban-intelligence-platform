import os

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content.strip() + "\n")

# 1. auth-service pom.xml
auth_pom = """
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.synapse</groupId>
        <artifactId>backend</artifactId>
        <version>1.0.0-SNAPSHOT</version>
    </parent>

    <artifactId>auth-service</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId> 
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
    </dependencies>
</project>
"""
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\auth-service\pom.xml", auth_pom)

# 2. auth-service application.yml
auth_yml = """
server:
  port: 8083

spring:
  application:
    name: auth-service

jwt:
  # Base64 encoded secret key for signing tokens (minimum 256-bit)
  secret: Y29tcGxleC1zdXBlci1zZWNyZXQta2V5LXRoYXQtbXVzdC1iZS1hdC1sZWFzdC0yNTYtYml0cy1sb25n
  expiration: 86400000 # 24 hours
"""
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\auth-service\src\main\resources\application.yml", auth_yml)

# 3. AuthApplication.java
auth_app = """
package com.synapse.authservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AuthApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }
}
"""
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\auth-service\src\main\java\com\synapse\authservice\AuthApplication.java", auth_app)

# 4. AuthController.java
auth_controller = """
package com.synapse.authservice;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expiration;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        // Hardcoded check for sprint MVP
        if ("admin".equals(username) && "password".equals(password)) {
            Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
            
            String token = Jwts.builder()
                    .setSubject(username)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + expiration))
                    .signWith(key, SignatureAlgorithm.HS256)
                    .compact();
                    
            return ResponseEntity.ok(Map.of("token", token));
        }

        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
"""
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\auth-service\src\main\java\com\synapse\authservice\AuthController.java", auth_controller)

# 5. AuthenticationFilter.java in gateway-service
gateway_filter = """
package com.synapse.gatewayservice.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    // Matches the auth-service secret
    private static final String SECRET = "Y29tcGxleC1zdXBlci1zZWNyZXQta2V5LXRoYXQtbXVzdC1iZS1hdC1sZWFzdC0yNTYtYml0cy1sb25n";

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                authHeader = authHeader.substring(7);
            } else {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            try {
                Key key = Keys.hmacShaKeyFor(SECRET.getBytes());
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(authHeader)
                        .getBody();
                
                // Add username to headers for downstream services
                exchange.getRequest().mutate()
                        .header("X-Auth-User", claims.getSubject())
                        .build();

            } catch (Exception e) {
                System.out.println("Invalid JWT Token: " + e.getMessage());
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }

            return chain.filter(exchange);
        };
    }

    public static class Config {
        // Configuration properties
    }
}
"""
write_file(r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend\gateway-service\src\main\java\com\synapse\gatewayservice\filter\AuthenticationFilter.java", gateway_filter)

print("Sprint 15 Auth files generated successfully.")
