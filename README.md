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

## Deploy to Vercel

Vercel does not run this as a conventional long-lived Spring Boot server. This repository includes a root `Dockerfile.vercel`, which uses Vercel's Container Runtime to build the Spring Boot JAR and run it as an HTTP container. Spring Boot listens on Vercel's injected `PORT` (defaulting to port 80 in the container).

1. Import this repository into Vercel and use the repository root as the project root.
2. The root `vercel.json` selects Vercel's **Container** preset and clears any stale dashboard Build Command such as `vite build`. Ensure the project has Vercel's **Container Runtime** enabled (currently beta).
3. Add `GEMINI_API_KEY` in the Vercel project's environment variables if Gemini chat responses are wanted. The assistant works in local profile-response mode if it is not set.
4. Deploy. Vercel detects `Dockerfile.vercel`; no Node.js build command or output directory is required.

The production container runs the same Spring Boot application and serves both the HTML/CSS/JavaScript frontend and `/api/*` endpoints.

## Project structure

```text
Dockerfile.vercel                       Vercel Container Runtime build and launch
src/main/java/com/awonke/profile/       Spring Boot app, portfolio data, and APIs
src/main/resources/static/              HTML, CSS, JavaScript, and profile image
src/test/java/com/awonke/profile/       API and portfolio data tests
```
