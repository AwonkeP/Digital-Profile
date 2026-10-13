const state = {
  portfolio: null,
  category: "All",
  search: "",
};

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);

async function requestJson(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: { Accept: "application/json", ...options.headers },
  });
  if (!response.ok) {
    const details = await response.json().catch(() => null);
    throw new Error(details?.detail || details?.message || `Request failed (${response.status}).`);
  }
  return response.json();
}

function bindProfile(profile) {
  document.querySelectorAll("[data-profile]").forEach((element) => {
    const value = profile[element.dataset.profile];
    if (value) element.textContent = value;
  });
  document.querySelectorAll("[data-profile-image]").forEach((image) => {
    image.src = profile.profileImage;
    image.alt = `Portrait of ${profile.name}`;
  });

  document.querySelectorAll(".contact-email").forEach((link) => {
    link.href = `mailto:${profile.email}`;
  });
  document.querySelectorAll(".contact-linkedin").forEach((link) => { link.href = profile.linkedin; });
  document.querySelectorAll(".contact-github, .profile-github").forEach((link) => { link.href = profile.github; });
  document.querySelectorAll("[data-metric]").forEach((element) => {
    const value = state.portfolio.metrics[element.dataset.metric];
    if (value) element.textContent = value;
  });
  document.querySelector('[data-count="skills"]').textContent = state.portfolio.skills.length;
  document.querySelector('[data-count="certificates"]').textContent = state.portfolio.certificates.length;
}

function renderSkills(skills) {
  document.querySelector("#skills-grid").innerHTML = skills.map((skill, index) => `
    <article class="skill-card" style="--card-index:${index}">
      <span class="skill-index">${String(index + 1).padStart(2, "0")}</span>
      <div class="skill-symbol" aria-hidden="true">${["⌘", "◈", "⌁", "↗"][index % 4]}</div>
      <h3>${escapeHtml(skill.name)}</h3><p>${escapeHtml(skill.description)}</p>
      <ul>${skill.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
      <div class="skill-proficiency"><span>Proficiency</span><strong>Active / Verified</strong></div>
    </article>`).join("");
}

function renderExperience(experience) {
  document.querySelector("#experience-list").innerHTML = experience.map((item, index) => `
    <article class="timeline-item" style="--item-index:${index}">
      <div class="timeline-marker" aria-hidden="true"><span></span></div>
      <div class="timeline-content"><div class="timeline-topline"><span>${escapeHtml(item.period)}</span><span>${String(index + 1).padStart(2, "0")}</span></div>
        <h3>${escapeHtml(item.role)}</h3><p class="timeline-company">${escapeHtml(item.company)} · ${escapeHtml(item.type)}</p>
        <p class="timeline-summary">${escapeHtml(item.summary)}</p>
        <ul class="experience-highlights">${item.highlights.map((highlight) => `<li><strong>${escapeHtml(highlight.title)}</strong><span>${escapeHtml(highlight.desc)}</span></li>`).join("")}</ul>
      </div>
    </article>`).join("");
}

function renderEducation(education) {
  document.querySelector("#education-grid").innerHTML = education.map((item, index) => `
    <article class="education-card" style="--card-index:${index}"><div class="education-card-top"><span class="education-symbol" aria-hidden="true">${["✳", "⌁", "◈"][index % 3]}</span><span class="education-tag">${escapeHtml(item.tag)}</span></div>
      <h3>${escapeHtml(item.degree)}</h3><p class="education-institution">${escapeHtml(item.institution)}</p><p>${escapeHtml(item.details)}</p><div class="education-badge">✦ ${escapeHtml(item.badge)}</div>
    </article>`).join("");
}

function renderCertificates(certificates) {
  document.querySelector("#certificates-grid").innerHTML = certificates.map((certificate, index) => `
    <article class="certificate-card" style="--card-index:${index}">
      <div class="certificate-top"><span class="issuer-mark issuer-${escapeHtml(certificate.issuerLogo)}">${escapeHtml(certificate.issuer === "DeepLearning.AI" ? "DL" : certificate.issuer)}</span><span class="verified-badge"><span>✓</span> Verified</span></div>
      <a class="certificate-name" href="${escapeHtml(certificate.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(certificate.name)}</a>
      <p class="certificate-issuer">${escapeHtml(certificate.issuer)}</p><p class="certificate-date">${escapeHtml(certificate.issueDate)}</p>
      <div class="credential-id"><span>Credential ID&nbsp; <code>${escapeHtml(certificate.credentialId)}</code></span><button type="button" data-copy="${escapeHtml(certificate.credentialId)}">Copy ID</button></div>
      <p class="certificate-skills">${escapeHtml(certificate.skills)}</p>
      <a class="certificate-link" href="${escapeHtml(certificate.url)}" target="_blank" rel="noopener noreferrer">Show credential <span aria-hidden="true">↗</span></a>
    </article>`).join("");
}

function renderFilters(projects) {
  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  document.querySelector("#project-filters").innerHTML = categories.map((category) => `
    <button class="filter-chip${state.category === category ? " is-active" : ""}" type="button" data-category="${escapeHtml(category)}" aria-pressed="${state.category === category}">${escapeHtml(category)}</button>`
  ).join("");
}

function renderProjects() {
  const projects = state.portfolio.projects.filter((project) => {
    const matchesCategory = state.category === "All" || project.category === state.category;
    const searchableText = [project.title, project.category, project.summary, project.description, ...project.technologies].join(" ").toLowerCase();
    return matchesCategory && searchableText.includes(state.search.trim().toLowerCase());
  });

  document.querySelector("#projects-grid").innerHTML = projects.map((project, index) => `
    <article class="project-card${project.featured ? " is-featured" : ""}" style="--card-index:${index}">
      <div class="project-card-top"><span class="project-icon" aria-hidden="true">${["◉", "⌘", "✳"][index % 3]}</span><span class="project-status"><span></span>${escapeHtml(project.status)}</span></div>
      <p class="project-category">${escapeHtml(project.category)}</p><h3>${escapeHtml(project.title)}</h3><p class="project-summary">${escapeHtml(project.summary)}</p><p class="project-description">${escapeHtml(project.description)}</p>
      <div class="project-outcomes"><strong>Key outcomes & technical scope</strong><ul>${project.highlights.map((highlight) => `<li>${escapeHtml(highlight)}</li>`).join("")}</ul></div>
      <div class="tech-list">${project.technologies.map((technology) => `<span>${escapeHtml(technology)}</span>`).join("")}</div>
      <div class="project-footer"><span class="project-badge">${escapeHtml(project.badge || "")}</span><a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer">Repository <span aria-hidden="true">↗</span></a></div>
    </article>`).join("");
  document.querySelector("#empty-state").hidden = projects.length !== 0;
}

function renderScenarios(scenarios) {
  document.querySelector("#scenarios-grid").innerHTML = scenarios.map((scenario, index) => `
    <details class="scenario-card" style="--card-index:${index}"><summary><span class="scenario-number">0${index + 1}</span><span><small>${escapeHtml(scenario.category)} · ${escapeHtml(scenario.resolutionTime)}</small><strong>${escapeHtml(scenario.title)}</strong></span><span class="scenario-expand" aria-hidden="true">+</span></summary>
      <p>${escapeHtml(scenario.description)}</p><ol>${scenario.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
    </details>`).join("");
}

function showStatus(message, isError = false) {
  const status = document.querySelector("#api-status");
  status.textContent = message;
  status.classList.toggle("is-error", isError);
  status.classList.add("is-visible");
  window.clearTimeout(showStatus.timeout);
  showStatus.timeout = window.setTimeout(() => status.classList.remove("is-visible"), 4000);
}

function enableRevealAnimations() {
  const sections = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  sections.forEach((section) => observer.observe(section));
}

function enableNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });
  navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  }));

  const themeButton = document.querySelector(".theme-toggle");
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light") document.documentElement.dataset.theme = "light";
  themeButton.addEventListener("click", () => {
    const isLight = document.documentElement.dataset.theme !== "light";
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
  document.addEventListener("keydown", (event) => {
    const target = event.target;
    if ((event.key === "d" || event.key === "D") && !["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) {
      themeButton.click();
    }
    if (event.key === "Escape") closeChat();
  });
}

function enableProjectControls() {
  document.querySelector("#project-filters").addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.category = button.dataset.category;
    renderFilters(state.portfolio.projects);
    renderProjects();
  });
  document.querySelector("#project-search").addEventListener("input", (event) => {
    state.search = event.target.value;
    renderProjects();
  });
}

function enableContact() {
  document.querySelector(".copy-summary").addEventListener("click", async () => {
    const profile = state.portfolio.profile;
    const summary = `${profile.name} | ${profile.headline}\nLocation: ${profile.location}\nCurrent Role: ${profile.role} @ ${profile.currentCompany}\nEmail: ${profile.email}\nLinkedIn: ${profile.linkedin}\nGitHub: ${profile.github}\nEducation: ${profile.degree}\nTechnical Domains: ${state.portfolio.skills.map((skill) => skill.name).join(", ")}.`;
    try {
      await navigator.clipboard.writeText(summary);
      showStatus("Profile summary and links copied.");
    } catch {
      showStatus("Could not copy the summary. Check clipboard permissions and try again.", true);
    }
  });

  document.querySelector("#contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`IT Inquiry from ${form.get("name")}`);
    const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\nMessage:\n${form.get("message")}`);
    window.location.href = `mailto:${state.portfolio.profile.email}?subject=${subject}&body=${body}`;
    document.querySelector("#contact-feedback").textContent = "Your email app should open with the message ready to send.";
  });

  document.querySelector(".print-button").addEventListener("click", () => window.print());
  document.querySelector("#year").textContent = new Date().getFullYear();
}

function addChatMessage(message, role) {
  const bubble = document.createElement("p");
  bubble.className = role === "user" ? "user-message" : "assistant-message";
  bubble.textContent = message;
  document.querySelector("#chat-messages").append(bubble);
  bubble.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

function closeChat() {
  const panel = document.querySelector("#chat-panel");
  const launcher = document.querySelector(".chat-launcher");
  if (!panel || panel.hidden) return;
  panel.hidden = true;
  launcher.setAttribute("aria-expanded", "false");
}

function enableChat() {
  const launcher = document.querySelector(".chat-launcher");
  const panel = document.querySelector("#chat-panel");
  launcher.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    launcher.setAttribute("aria-expanded", String(!panel.hidden));
    if (!panel.hidden) document.querySelector("#chat-input").focus();
  });
  document.querySelector(".chat-close").addEventListener("click", closeChat);
  document.querySelector("#chat-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.message;
    const message = input.value.trim();
    if (!message) return;
    addChatMessage(message, "user");
    input.value = "";
    const submit = form.querySelector("button");
    submit.disabled = true;
    try {
      const reply = await requestJson("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      document.querySelector("#chat-mode").textContent = reply.engine === "gemini" ? "Gemini · grounded in Awonke's profile" : "Profile assistant";
      addChatMessage(reply.answer, "assistant");
    } catch (error) {
      addChatMessage(`I couldn't answer just now: ${error.message}`, "assistant");
    } finally {
      submit.disabled = false;
      input.focus();
    }
  });
}

async function initialize() {
  enableNavigation();
  enableRevealAnimations();
  enableProjectControls();
  enableContact();
  enableChat();
  try {
    state.portfolio = await requestJson("/api/portfolio");
    bindProfile(state.portfolio.profile);
    renderSkills(state.portfolio.skills);
    renderExperience(state.portfolio.experience);
    renderEducation(state.portfolio.education);
    renderCertificates(state.portfolio.certificates);
    renderFilters(state.portfolio.projects);
    renderProjects();
    renderScenarios(state.portfolio.scenarios);
  } catch (error) {
    console.error("Unable to load portfolio content:", error);
    showStatus(`Portfolio data couldn't load. ${error.message}`, true);
    document.querySelectorAll(".loading-card").forEach((card) => { card.textContent = "This section could not load. Please refresh the page."; });
  }
}

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy]");
  if (!button) return;
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    button.textContent = "Copied";
    window.setTimeout(() => { button.textContent = "Copy ID"; }, 1800);
  } catch {
    showStatus("Could not copy the credential ID. Check clipboard permissions and try again.", true);
  }
});

initialize();
