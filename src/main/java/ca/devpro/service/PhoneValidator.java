package ca.devpro.service;

import ca.devpro.api.PhoneDto;
import ca.devpro.exception.ValidationException;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class PhoneValidator {

    public static final String PHONE_NUMBER_REQUIRED = "PHONE_NUMBER_REQUIRED";
    public static final String PHONE_TYPE_REQUIRED = "PHONE_TYPE_REQUIRED";

    public static final String PHONE_NUMBER_EXCEEDS_MAX_LENGTH = "PHONE_NUMBER_EXCEEDS_MAX_LENGTH";
    public static final String PHONE_NUMBER_TOO_SHORT = "PHONE_NUMBER_EXCEEDS_TOO_SHORT";
    public static final String PHONE_NUMBER_INVALID = "PHONE_NUMBER_INVALID";

    public void validateAndThrow(PhoneDto dto) {
        Map<String, String> errors = validate(dto);
        if (!errors.isEmpty()) {
            throw new ValidationException(errors);
        }
    }

    public Map<String, String> validate(PhoneDto dto) {
        Map<String, String> errors = new LinkedHashMap<>();

        validatePhoneNumber(errors, dto);
        validatePhoneType(errors, dto);

        return errors;
    }

    private void validatePhoneNumber(Map<String, String> errors, PhoneDto dto) {
        if (StringUtils.isBlank(dto.getPhoneNumber())) {
            errors.put("phoneNumber", PHONE_NUMBER_REQUIRED);
        } else if (dto.getPhoneNumber().length() > 10) {
            errors.put("phoneNumber", PHONE_NUMBER_EXCEEDS_MAX_LENGTH);
        } else if (dto.getPhoneNumber().length() < 10) {
            errors.put("phoneNumber", PHONE_NUMBER_TOO_SHORT);
        } else if (!NumberUtils.isCreatable(dto.getPhoneNumber())) {
            errors.put("phoneNumber", PHONE_NUMBER_INVALID);
        }
    }

    private void validatePhoneType(Map<String, String> errors, PhoneDto dto) {
        if (StringUtils.isBlank(dto.getPhoneType())) {
            errors.put("phoneType", PHONE_TYPE_REQUIRED);
        }
    }
}
