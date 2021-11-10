package ca.devpro.controller;

import ca.devpro.api.UserDto;
import ca.devpro.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto create(@RequestBody UserDto dto) {
        return userService.create(dto);
    }

    @PutMapping("/{userId}")
    public UserDto update(@PathVariable("userId") UUID userId, @RequestBody UserDto dto) {
        dto.setUserId(userId);
        return userService.update(dto);
    }

    @GetMapping()
    public List<UserDto> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{userId}")
    public UserDto get(@PathVariable("userId") UUID userId) {
        return userService.get(userId);
    }

    @DeleteMapping("/{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("userId") UUID userId) {
        userService.delete(userId);
    }
}
