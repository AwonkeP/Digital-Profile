package com.awonke.profile;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest(properties = "GEMINI_API_KEY=")
@AutoConfigureMockMvc
class PortfolioApiTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void portfolioEndpointIncludesEveryOriginalSectionAndRequestedProject() throws Exception {
        mockMvc.perform(get("/api/portfolio"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.profile.name").value("Awonke Philibane"))
            .andExpect(jsonPath("$.skills.length()").value(4))
            .andExpect(jsonPath("$.experience.length()").value(4))
            .andExpect(jsonPath("$.education.length()").value(3))
            .andExpect(jsonPath("$.certificates.length()").value(6))
            .andExpect(jsonPath("$.scenarios.length()").value(4))
            .andExpect(jsonPath("$.projects.length()").value(3))
            .andExpect(jsonPath("$.projects[2].githubUrl").value("https://github.com/MRMUGERI/Ubuntu-Innovations-CAPACITI"));
    }

    @Test
    void springServesTheCompleteInteractiveFrontendAndProfileImage() throws Exception {
        mockMvc.perform(get("/"))
            .andExpect(status().isOk());
        mockMvc.perform(get("/index.html"))
            .andExpect(status().isOk())
            .andExpect(content().string(containsString("Licenses &")))
            .andExpect(content().string(containsString("id=\"certifications\"")));

        mockMvc.perform(get("/styles.css")).andExpect(status().isOk());
        mockMvc.perform(get("/app.js")).andExpect(status().isOk());
        mockMvc.perform(get("/assets/profile.jpg")).andExpect(status().isOk());
    }

    @Test
    void profileAssistantAnswersLocallyWhenGeminiKeyIsNotConfigured() throws Exception {
        mockMvc.perform(post("/api/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"message\":\"Tell me about his certificates\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.engine").value("profile"))
            .andExpect(jsonPath("$.answer").value(org.hamcrest.Matchers.containsString("DeepLearning.AI")));
    }

    @Test
    void chatRejectsBlankAndOversizedMessages() throws Exception {
        mockMvc.perform(post("/api/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"message\":\"  \"}"))
            .andExpect(status().isBadRequest());

        String oversizedMessage = "a".repeat(1001);
        mockMvc.perform(post("/api/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"message\":\"" + oversizedMessage + "\"}"))
            .andExpect(status().isBadRequest());
    }
}
