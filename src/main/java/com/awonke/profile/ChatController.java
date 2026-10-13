package com.awonke.profile;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private static final int MAX_MESSAGE_LENGTH = 1000;
    private final ProfileChatService chatService;

    public ChatController(ProfileChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ProfileChatService.ChatReply chat(@RequestBody ChatRequest request) {
        if (request == null || request.message() == null || request.message().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Enter a question for the profile assistant.");
        }
        String message = request.message().trim();
        if (message.length() > MAX_MESSAGE_LENGTH) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Questions must be 1,000 characters or fewer.");
        }
        return chatService.answer(message);
    }

    public record ChatRequest(String message) {}
}
