package com.awonke.profile;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PortfolioController {
    @GetMapping("/api/portfolio")
    public PortfolioData.Portfolio portfolio() {
        return new PortfolioData.Portfolio(
            PortfolioData.PROFILE,
            PortfolioData.METRICS,
            PortfolioData.SKILLS,
            PortfolioData.EXPERIENCE,
            PortfolioData.EDUCATION,
            PortfolioData.CERTIFICATES,
            PortfolioData.SCENARIOS,
            PortfolioData.PROJECTS
        );
    }

    @GetMapping("/api/profile")
    public PortfolioData.Profile profile() {
        return PortfolioData.PROFILE;
    }

    @GetMapping("/api/skills")
    public List<PortfolioData.Skill> skills() {
        return PortfolioData.SKILLS;
    }

    @GetMapping("/api/experience")
    public List<PortfolioData.Experience> experience() {
        return PortfolioData.EXPERIENCE;
    }

    @GetMapping("/api/education")
    public List<PortfolioData.Education> education() {
        return PortfolioData.EDUCATION;
    }

    @GetMapping("/api/certificates")
    public List<PortfolioData.Certificate> certificates() {
        return PortfolioData.CERTIFICATES;
    }

    @GetMapping("/api/scenarios")
    public List<PortfolioData.Scenario> scenarios() {
        return PortfolioData.SCENARIOS;
    }

    @GetMapping("/api/projects")
    public List<PortfolioData.Project> projects() {
        return PortfolioData.PROJECTS;
    }
}
