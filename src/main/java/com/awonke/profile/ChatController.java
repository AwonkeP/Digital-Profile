package com.awonke.profile;

import java.util.List;

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
    private static final int MAX_HISTORY_MESSAGES = 10;
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
        List<ProfileChatService.ChatMessage> history = request.history() == null ? List.of() : request.history();
        if (history.size() > MAX_HISTORY_MESSAGES) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chat history must contain 10 messages or fewer.");
        }
        for (ProfileChatService.ChatMessage chatMessage : history) {
            if (chatMessage == null
                || chatMessage.content() == null
                || chatMessage.content().isBlank()
                || chatMessage.content().length() > MAX_MESSAGE_LENGTH
                || chatMessage.role() == null
                || !List.of("user", "assistant").contains(chatMessage.role())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Chat history contains an invalid message.");
            }
        }
        return chatService.answer(message, history);
    }

    public record ChatRequest(String message, List<ProfileChatService.ChatMessage> history) {}
}
