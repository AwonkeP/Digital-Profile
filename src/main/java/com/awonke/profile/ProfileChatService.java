package com.awonke.profile;

import java.util.List;
import java.util.Locale;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class ProfileChatService {
    private final String apiKey;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    public ProfileChatService(
        @Value("${GEMINI_API_KEY:}") String apiKey,
        RestClient.Builder restClientBuilder,
        ObjectMapper objectMapper
    ) {
        this.apiKey = apiKey;
        this.restClient = restClientBuilder.baseUrl("https://generativelanguage.googleapis.com").build();
        this.objectMapper = objectMapper;
    }

    public ChatReply answer(String question) {
        if (apiKey.isBlank()) {
            return new ChatReply(localAnswer(question), "profile");
        }
        return new ChatReply(geminiAnswer(question), "gemini");
    }

    private String geminiAnswer(String question) {
        String context = """
            You are the profile assistant for %s. Answer only using the verified portfolio facts below.
            If a fact is not present, say you do not have that information and offer the contact email.
            Keep responses concise, friendly, and professional.
            Role: %s at %s. Location: %s. Email: %s. Education: %s.
            Summary: %s
            Skills: %s
            Experience: %s
            Education and training: %s
            Certificates: %s
            Projects: %s
            """.formatted(
                PortfolioData.PROFILE.name(),
                PortfolioData.PROFILE.role(),
                PortfolioData.PROFILE.currentCompany(),
                PortfolioData.PROFILE.location(),
                PortfolioData.PROFILE.email(),
                PortfolioData.PROFILE.degree(),
                PortfolioData.PROFILE.summary(),
                PortfolioData.SKILLS.stream().map(skill -> skill.name() + ": " + String.join(", ", skill.bullets())).reduce((a, b) -> a + "; " + b).orElse(""),
                PortfolioData.EXPERIENCE.stream().map(job -> job.role() + " at " + job.company() + ": " + job.summary()).reduce((a, b) -> a + "; " + b).orElse(""),
                PortfolioData.EDUCATION.stream().map(education -> education.degree() + " — " + education.institution()).reduce((a, b) -> a + "; " + b).orElse(""),
                PortfolioData.CERTIFICATES.stream().map(PortfolioData.Certificate::name).reduce((a, b) -> a + "; " + b).orElse(""),
                PortfolioData.PROJECTS.stream().map(project -> project.title() + ": " + project.summary()).reduce((a, b) -> a + "; " + b).orElse("")
            );

        Map<String, Object> requestBody = Map.of(
            "system_instruction", Map.of("parts", List.of(Map.of("text", context))),
            "contents", List.of(Map.of("parts", List.of(Map.of("text", question))))
        );
        JsonNode response = restClient.post()
            .uri("/v1beta/models/gemini-2.5-flash:generateContent")
            .header("x-goog-api-key", apiKey)
            .contentType(MediaType.APPLICATION_JSON)
            .body(requestBody)
            .retrieve()
            .body(JsonNode.class);

        JsonNode text = response == null ? null : response.at("/candidates/0/content/parts/0/text");
        if (text == null || !text.isTextual() || text.asText().isBlank()) {
            throw new IllegalStateException("Gemini returned no assistant response.");
        }
        return text.asText();
    }

    private String localAnswer(String question) {
        String query = question.toLowerCase(Locale.ROOT);
        if (containsAny(query, "project", "built", "portfolio", "repository", "github")) {
            return "Awonke's featured work includes TechnoResolve Desk, the Ubuntu Innovations IT infrastructure capstone, and this interactive digital profile. You can explore the project cards and their repositories in the Projects section.";
        }
        if (containsAny(query, "certificate", "certification", "credential", "course")) {
            return "Awonke's credentials include DeepLearning.AI courses in machine learning and generative AI, IBM certificates in Python and prompt engineering, and Coursera's Artificial Intelligence Bootcamp. Each certificate card links to its verification.";
        }
        if (containsAny(query, "skill", "technical", "technology", "network", "support")) {
            return "Awonke's skills cover infrastructure and networking, Microsoft 365 and identity administration, hardware diagnostics, enterprise tools and ITSM, data operations, and workflow improvement. The Skills section has the full details.";
        }
        if (containsAny(query, "experience", "work", "career", "job", "capaciti")) {
            return "Awonke currently works in IT Technical Support at CAPACITI. Previous experience includes PRASA, the Western Cape Department of Education, and Innovate Technology. See the Experience section for responsibilities and highlights.";
        }
        if (containsAny(query, "education", "study", "degree", "cput")) {
            return "Awonke holds a Diploma in Business & Information Administration from CPUT, with additional training in networking and Microsoft 365 systems administration. More detail is in Education & Training.";
        }
        if (containsAny(query, "contact", "email", "hire", "reach", "linkedin")) {
            return "You can reach Awonke at " + PortfolioData.PROFILE.email() + " or use the LinkedIn link in the Contact section. He is based in " + PortfolioData.PROFILE.location() + ".";
        }
        return PortfolioData.PROFILE.name() + " is an " + PortfolioData.PROFILE.role() + " at " + PortfolioData.PROFILE.currentCompany() + " in " + PortfolioData.PROFILE.location() + ". Ask me about projects, experience, skills, education, certificates, or contact details.";
    }

    private boolean containsAny(String value, String... terms) {
        for (String term : terms) {
            if (value.contains(term)) return true;
        }
        return false;
    }

    public record ChatReply(String answer, String engine) {}
}
