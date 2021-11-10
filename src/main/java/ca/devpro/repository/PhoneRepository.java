package ca.devpro.repository;

import ca.devpro.entity.Phone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PhoneRepository extends JpaRepository<Phone, UUID> {
    List<Phone> findAllByUserId(UUID userId);

    Optional<Phone> findByUserIdAndPhoneId(UUID userId, UUID phoneId);
}
