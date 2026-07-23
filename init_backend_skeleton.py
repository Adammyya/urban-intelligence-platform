import os

base_dir = r"C:\Users\Dell\Desktop\Adamya\Projects\SYNAPSE\backend"

# Modules
modules = [
    "common", "gateway-service", "auth-service", "user-service",
    "sensor-service", "traffic-service", "incident-service",
    "prediction-service", "recommendation-service", "notification-service", "analytics-service"
]

# Standard packages
packages = [
    "controller", "service", "repository", "dto", "entity", "config", "exception", "security"
]

parent_pom = """<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.synapse</groupId>
    <artifactId>synapse-parent</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>pom</packaging>

    <properties>
        <java.version>21</java.version>
        <spring-boot.version>3.2.3</spring-boot.version>
        <spring-cloud.version>2023.0.0</spring-cloud.version>
    </properties>

    <modules>
"""
for m in modules:
    parent_pom += f"        <module>{m}</module>\n"
parent_pom += """    </modules>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
</project>
"""

def create_child_pom(module_name):
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>synapse-parent</artifactId>
        <groupId>com.synapse</groupId>
        <version>1.0.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>{module_name}</artifactId>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
    </dependencies>
</project>
"""

# Write Parent POM
os.makedirs(base_dir, exist_ok=True)
with open(os.path.join(base_dir, "pom.xml"), "w") as f:
    f.write(parent_pom)

# Scaffold modules
for m in modules:
    mod_path = os.path.join(base_dir, m)
    os.makedirs(mod_path, exist_ok=True)
    
    # Write child POM
    with open(os.path.join(mod_path, "pom.xml"), "w") as f:
        f.write(create_child_pom(m))
    
    # Base package name
    base_pkg_name = m.replace("-service", "").replace("-", "")
    
    # Create src/main/java and src/test/java
    src_main = os.path.join(mod_path, "src", "main", "java", "com", "synapse", base_pkg_name)
    src_test = os.path.join(mod_path, "src", "test", "java", "com", "synapse", base_pkg_name)
    resources = os.path.join(mod_path, "src", "main", "resources")
    
    os.makedirs(src_test, exist_ok=True)
    os.makedirs(resources, exist_ok=True)
    
    with open(os.path.join(resources, "application.yml"), "w") as f:
        f.write(f"spring:\n  application:\n    name: {m}\n")
    
    if m != "common":
        for pkg in packages:
            os.makedirs(os.path.join(src_main, pkg), exist_ok=True)
            
        # Entry point
        class_name = m.replace("-service", "").title() + "Application"
        with open(os.path.join(src_main, f"{class_name}.java"), "w") as f:
            f.write(f"""package com.synapse.{base_pkg_name};

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class {class_name} {{
    public static void main(String[] args) {{
        SpringApplication.run({class_name}.class, args);
    }}
}}
""")
    else:
        # For common, just create the packages directly
        for pkg in packages:
            os.makedirs(os.path.join(src_main, pkg), exist_ok=True)

print("Backend Maven skeleton generated successfully.")
