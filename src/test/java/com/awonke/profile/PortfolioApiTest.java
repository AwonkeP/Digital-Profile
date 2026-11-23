package com.awonke.profile;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
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
            .andExpect(jsonPath("$.education.length()").value(2))
            .andExpect(jsonPath("$.education[0].institution").value("Cape Peninsula University of Technology (CPUT)"))
            .andExpect(jsonPath("$.education[1].degree").value("National Senior Certificate"))
            .andExpect(jsonPath("$.education[1].institution").value("Iingcinga Zethu Secondary School"))
            .andExpect(jsonPath("$.education[1].details").value("South Africa’s official high school-leaving qualification. It is registered at NQF Level 4 on the National Qualifications Framework and quality-assured by the statutory council Umalusi."))
            .andExpect(jsonPath("$.certificates.length()").value(6))
            .andExpect(jsonPath("$.certificates[0].name").value("IT Support"))
            .andExpect(jsonPath("$.certificates[0].credentialId").value("a1JLNeeJS3mSSzXniat5yQ"))
            .andExpect(jsonPath("$.certificates[3].url").value("https://coursera.org/share/f45589bfefa83b5d0b98dc593d5df731"))
            .andExpect(jsonPath("$.certificates[5].name").value("Artificial Intelligence Bootcamp (AI)"))
            .andExpect(jsonPath("$.certificates[5].url").value("https://coursera.org/share/3dee4f5d85f4d324b3bb5c6cc71753c1"))
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
            .andExpect(content().string(containsString("id=\"certifications\"")))
            .andExpect(content().string(not(containsString("chat-launcher"))));

        mockMvc.perform(get("/styles.css")).andExpect(status().isOk());
        mockMvc.perform(get("/app.js"))
            .andExpect(status().isOk())
            .andExpect(content().string(not(containsString("/api/chat"))));
        mockMvc.perform(get("/assets/profile.jpg")).andExpect(status().isOk());
    }

    @Test
    void chatbotEndpointIsRemoved() throws Exception {
        mockMvc.perform(post("/api/chat"))
                .andExpect(status().is4xxClientError());
    }
}
