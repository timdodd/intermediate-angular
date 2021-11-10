package ca.devpro.assembler;

import ca.devpro.api.UserDto;
import ca.devpro.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class UserAssembler {

    private final PhoneAssembler phoneAssembler;

    public UserDto assemble(User entity) {
        return new UserDto()
                .setUserId(entity.getUserId())
                .setFirstName(entity.getFirstName())
                .setLastName(entity.getLastName())
                .setUsername(entity.getUsername())
                .setPhones(entity.getPhones()
                        .stream()
                        .map(phoneAssembler::assemble)
                        .collect(Collectors.toList()));
    }

    public User disassemble(UserDto dto) {
        User entity = User.newInstance(dto.getUsername());
        return disassembleInto(dto, entity);
    }

    public User disassembleInto(UserDto dto, User entity) {
        return entity
                .setFirstName(dto.getFirstName())
                .setLastName(dto.getLastName())
                .setPhones(dto.getPhones() == null ? Collections.emptyList() : phoneAssembler.disassembleIntoParent(dto.getPhones(), entity));
    }
}
