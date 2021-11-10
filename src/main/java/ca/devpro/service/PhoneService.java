package ca.devpro.service;

import ca.devpro.api.PhoneDto;
import ca.devpro.assembler.PhoneAssembler;
import ca.devpro.entity.Phone;
import ca.devpro.exception.NotFoundException;
import ca.devpro.repository.PhoneRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PhoneService {

    private final PhoneAssembler phoneAssembler;
    private final PhoneRepository phoneRepository;
    private final PhoneValidator phoneValidator;

    public List<PhoneDto> findAll(UUID userId) {
        return phoneRepository
                .findAllByUserId(userId)
                .stream()
                .map(phoneAssembler::assemble)
                .collect(Collectors.toList());
    }

    public PhoneDto create(PhoneDto dto) {
        phoneValidator.validateAndThrow(dto);
        Phone entity = phoneAssembler.disassemble(dto);
        phoneRepository.save(entity);

        return phoneAssembler.assemble(entity);
    }

    public PhoneDto get(UUID userId, UUID phoneId) {
        return phoneRepository.findByUserIdAndPhoneId(userId, phoneId)
                .map(phoneAssembler::assemble)
                .orElseThrow(NotFoundException::new);
    }

    public PhoneDto update(PhoneDto dto) {
        phoneValidator.validateAndThrow(dto);

        return phoneRepository.findByUserIdAndPhoneId(dto.getUserId(), dto.getPhoneId())
                .map(entity -> phoneAssembler.disassembleInto(dto, entity))
                .map(phoneRepository::save)
                .map(phoneAssembler::assemble)
                .orElseThrow(NotFoundException::new);
    }

    public void delete(UUID userId, UUID phoneId) {
        phoneRepository.findByUserIdAndPhoneId(userId, phoneId).ifPresentOrElse(phoneRepository::delete, () -> {
            throw new NotFoundException();
        });
    }
}
