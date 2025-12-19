package com.example.ProjectHub.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dg4ngm4lx",
                "api_key", "159518532393919",
                "api_secret", "BdCV0LQjbpn2BjNuAkCP0lSMbVY"
        ));
    }
}
