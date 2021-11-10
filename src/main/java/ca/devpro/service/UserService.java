package ca.devpro.service;

import ca.devpro.api.UserDto;
import ca.devpro.assembler.UserAssembler;
import ca.devpro.entity.User;
import ca.devpro.exception.NotFoundException;
import ca.devpro.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserAssembler userAssembler;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserValidator userValidator;

    public List<UserDto> findAll() {
        return userRepository
                .findAll()
                .stream()
                .map(entity -> userAssembler.assemble(entity))
                .collect(Collectors.toList());
    }

    public UserDto create(UserDto dto) {
        // Validate the dto.
        // Disassemble the dto into an entity.
        // Use the repository to save the entity.
        // Reassemble the entity back into a dto and return it.

        userValidator.validateAndThrow(dto);
        User entity = userAssembler.disassemble(dto);
        userRepository.save(entity);
        return userAssembler.assemble(entity);
    }

    public UserDto get(UUID userId) {
        // Find the user from the database (using repository).
        // Assemble the entity into a dto.

        return userRepository.findById(userId)
                //.map(entity -> userAssembler.assemble(entity))
                .map(userAssembler::assemble)
                .orElseThrow(() -> new NotFoundException());
    }

    public UserDto update(UserDto dto) {
        // Find the record (entity) in the database.
        // Update the fields.
        // Save it.
        // Assemble it and return it.

        userValidator.validateAndThrow(dto);
        return userRepository.findById(dto.getUserId())
                .map(entity -> userAssembler.disassembleInto(dto, entity))
                .map(userRepository::save)
                .map(userAssembler::assemble)
                .orElseThrow(() -> new NotFoundException());
    }

    public void delete(UUID userId) {
        // Find the record.
        // If it exists, delete it.
        // If it doesn't exist, 404 (NotFoundException).

        userRepository.findById(userId).ifPresentOrElse(userRepository::delete, () -> {
            throw new NotFoundException();
        });
    }

}
