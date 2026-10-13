# Awonke Philibane — Digital Profile

The portfolio is a single Spring Boot application. Java provides the profile API and optional Gemini-backed assistant; the browser UI is built with semantic HTML, responsive CSS, and vanilla JavaScript. Profile content is served by the API and includes skills, experience, education, certificates, projects, troubleshooting scenarios, contact links, and metrics.

## Requirements

- Java 21 or newer
- Maven 3.6 or newer

## Run locally

```sh
mvn spring-boot:run
```

Open [http://localhost:8080](http://localhost:8080). The frontend requests the complete portfolio from `GET /api/portfolio`. Individual datasets are also available at `/api/profile`, `/api/skills`, `/api/experience`, `/api/education`, `/api/certificates`, `/api/projects`, and `/api/scenarios`.

The profile assistant has a grounded local response mode by default. To enable Gemini responses, provide a server-side API key:

```sh
GEMINI_API_KEY=your-key mvn spring-boot:run
```

The key is only used by the Java server and is never exposed to the browser. Do not commit real API keys.

## Test and package

```sh
mvn test
mvn package
java -jar target/digital-profile-1.0.0.jar
```

## Project structure

```text
src/main/java/com/awonke/profile/       Spring Boot app, portfolio data, and APIs
src/main/resources/static/              HTML, CSS, JavaScript, and profile image
src/test/java/com/awonke/profile/       API and portfolio data tests
```
