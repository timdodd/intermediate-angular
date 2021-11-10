package ca.devpro.assembler;

import ca.devpro.api.PhoneDto;
import ca.devpro.entity.Phone;
import ca.devpro.entity.PhoneType;
import ca.devpro.entity.User;
import ca.devpro.util.CollectionComparator;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PhoneAssembler {

    public PhoneDto assemble(Phone entity) {
        return new PhoneDto()
                .setPhoneId(entity.getPhoneId())
                .setUserId(entity.getUserId())
                .setPhoneNumber(entity.getPhoneNumber())
                .setPhoneType(entity.getPhoneType().name());
    }

    public Phone disassemble(PhoneDto dto) {
        Phone entity = Phone.newInstance(dto.getUserId());

        return disassembleInto(dto, entity);
    }

    public Phone disassembleInto(PhoneDto dto, Phone entity) {
        return entity.setPhoneNumber(dto.getPhoneNumber())
                .setPhoneType(PhoneType.valueOf(dto.getPhoneType()));
    }

    public List<Phone> disassembleIntoParent(List<PhoneDto> dtos, User parentEntity) {
        CollectionComparator.of(parentEntity.getPhones(), dtos)
                .compareWith((entity, dto) -> entity.getPhoneId().equals(dto.getPhoneId()))
                .ifExists((entity, dto) -> disassembleInto(dto, entity))
                .ifRemoved(entity -> parentEntity.getPhones().remove(entity))
                .ifAdded(dto -> parentEntity.getPhones().add(disassemble(dto.setUserId(parentEntity.getUserId()))));

        return parentEntity.getPhones();
    }
}
