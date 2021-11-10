package ca.devpro.service;

import ca.devpro.api.PhoneDto;
import ca.devpro.api.UserDto;
import ca.devpro.exception.ValidationException;
import ca.devpro.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.IntStream;

@Component
@AllArgsConstructor
public class UserValidator {

    public static final String FIRST_NAME_REQUIRED = "FIRST_NAME_REQUIRED";
    public static final String LAST_NAME_REQUIRED = "LAST_NAME_REQUIRED";
    public static final String USERNAME_REQUIRED = "USERNAME_REQUIRED";
    public static final String USERNAME_TAKEN = "USERNAME_TAKEN";
    public static final String FIRST_NAME_EXCEEDS_MAX_LENGTH = "FIRST_NAME_EXCEEDS_MAX_LENGTH";
    public static final String LAST_NAME_EXCEEDS_MAX_LENGTH = "LAST_NAME_EXCEEDS_MAX_LENGTH";
    public static final String USERNAME_EXCEEDS_MAX_LENGTH = "USERNAME_EXCEEDS_MAX_LENGTH";

    private final UserRepository userRepository;
    private final PhoneValidator phoneValidator;

    public void validateAndThrow(UserDto dto) {
        Map<String, String> errors = validate(dto);
        if (!errors.isEmpty()) {
            throw new ValidationException(errors);
        }
    }

    public Map<String, String> validate(UserDto dto) {
        Map<String, String> errors = new LinkedHashMap<>();
        validateFirstName(errors, dto);
        validateLastName(errors, dto);
        validateUsername(errors, dto);
        validatePhones(errors, dto);
        return errors;
    }

    private void validateFirstName(Map<String, String> errors, UserDto dto) {
        if (StringUtils.isBlank(dto.getFirstName())) {
            errors.put("firstName", FIRST_NAME_REQUIRED);
        } else if (dto.getFirstName().length() > 30) {
            errors.put("firstName", FIRST_NAME_EXCEEDS_MAX_LENGTH);
        }
    }

    private void validateLastName(Map<String, String> errors, UserDto dto) {
        if (StringUtils.isBlank(dto.getLastName())) {
            errors.put("lastName", LAST_NAME_REQUIRED);
        } else if (dto.getLastName().length() > 30) {
            errors.put("lastName", LAST_NAME_EXCEEDS_MAX_LENGTH);
        }
    }

    private void validateUsername(Map<String, String> errors, UserDto dto) {
        if (StringUtils.isBlank(dto.getUsername())) {
            errors.put("username", USERNAME_REQUIRED);
        } else if (isCreate(dto) && userRepository.existsByUsernameIgnoreCase(dto.getUsername())) {
            errors.put("username", USERNAME_TAKEN);
        } else if (dto.getUsername().length() > 20) {
            errors.put("username", USERNAME_EXCEEDS_MAX_LENGTH);
        }
    }

    private void validatePhones(Map<String, String> errors, UserDto dto) {
        if(dto.getPhones() == null) {
            return;
        }
        IntStream.range(0, dto.getPhones().size())
                .forEach(i -> validatePhone(errors, dto.getPhones().get(i), i));
    }

    private void validatePhone(Map<String, String> errors, PhoneDto dto, int index) {
        Map<String, String> phoneErrors = phoneValidator.validate(dto);
        phoneErrors.entrySet()
                .forEach(e -> errors.put(String.format("phones[%s].%s", index, e.getKey()), e.getValue()));
    }

    private boolean isCreate(UserDto dto) {
        return dto.getUserId() == null;
    }
}
