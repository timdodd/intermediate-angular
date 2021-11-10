package ca.devpro.api;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.UUID;

@Data
@Accessors(chain = true)
public class PhoneDto {
    private UUID phoneId;
    private UUID userId;
    private String phoneNumber;
    private String phoneType;
}
