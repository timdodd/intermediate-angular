package ca.devpro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.MessageSourceAccessor;

@SpringBootApplication
public class IntermediateAngularApplication {

    public static void main(String[] args) {
        SpringApplication.run(IntermediateAngularApplication.class, args);
    }

    @Bean
    public MessageSourceAccessor messageSourceAccessor(MessageSource messageSource) {
        return new MessageSourceAccessor(messageSource);
    }
}
