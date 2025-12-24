import fs from "fs";
import path from "path";

// --------- Paths ---------
const PROFILE_PATH = path.join(process.cwd(), "rag/data/profile.json");
const OUTPUT_PATH = path.join(process.cwd(), "rag/chunks/chunks.json");

// --------- Helpers ---------
function toReadableText(value, indent = 0) {
  const pad = "  ".repeat(indent);

  if (Array.isArray(value)) {
    return value
      .map(v => toReadableText(v, indent))
      .join("\n");
  }

  if (typeof value === "object" && value !== null) {
    return Object.entries(value)
      .map(([key, val]) => {
        return `${pad}${key}:\n${toReadableText(val, indent + 1)}`;
      })
      .join("\n");
  }

  return `${pad}${String(value)}`;
}

function createChunk(id, category, content) {
  return {
    id,
    category,
    source: category,
    content: content.trim()
  };
}

// --------- Main ---------
const profile = JSON.parse(fs.readFileSync(PROFILE_PATH, "utf-8"));
const chunks = [];

// --------- ABOUT ---------
if (profile.about) {
  chunks.push(
    createChunk(
      "about",
      "about",
      toReadableText(profile.about)
    )
  );
}

// --------- BELIEFS ---------
if (profile.beliefs) {
  chunks.push(
    createChunk(
      "beliefs",
      "philosophy",
      toReadableText(profile.beliefs)
    )
  );
}

// --------- EDUCATION ---------
(profile.education || []).forEach((edu, i) => {
  chunks.push(
    createChunk(
      `education_${i}`,
      "education",
      toReadableText(edu)
    )
  );
});

// --------- SKILLS ---------
if (profile.skills) {
  chunks.push(
    createChunk(
      "skills",
      "skills",
      toReadableText(profile.skills)
    )
  );
}

// --------- PROJECTS ---------
(profile.projects || []).forEach((project, i) => {
  const idSafeName = project.name
    ? project.name.replace(/\s+/g, "_").toLowerCase()
    : i;

  chunks.push(
    createChunk(
      `project_${i}_${idSafeName}`,
      "project",
      toReadableText(project)
    )
  );
});

// --------- CHALLENGES ---------
(profile.challenges_and_failures || []).forEach((c, i) => {
  chunks.push(
    createChunk(
      `challenge_${i}`,
      "challenge",
      toReadableText(c)
    )
  );
});

// --------- JOURNEY ---------
if (profile.journey) {
  chunks.push(
    createChunk(
      "journey",
      "journey",
      toReadableText(profile.journey)
    )
  );
}

// --------- INTERESTS ---------
if (profile.interests) {
  chunks.push(
    createChunk(
      "interests",
      "interests",
      toReadableText(profile.interests)
    )
  );
}

// --------- ACHIEVEMENTS ---------
if (profile.achievements?.achievements) {
  Object.entries(profile.achievements.achievements).forEach(
    ([key, val], i) => {
      chunks.push(
        createChunk(
          `achievement_${i}`,
          "achievement",
          toReadableText(val)
        )
      );
    }
  );
}

// --------- CURRENT FOCUS ---------
if (profile.current_focus) {
  chunks.push(
    createChunk(
      "current_focus",
      "current_focus",
      toReadableText(profile.current_focus)
    )
  );
}

// --------- FUTURE GOALS ---------
if (profile.future_goals) {
  chunks.push(
    createChunk(
      "future_goals",
      "future_goals",
      toReadableText(profile.future_goals)
    )
  );
}

// --------- WHY HIRE ME ---------
if (profile.why_hire_me) {
  chunks.push(
    createChunk(
      "why_hire_me",
      "why_hire_me",
      toReadableText(profile.why_hire_me)
    )
  );
}

// --------- WORK PREFERENCES ---------
if (profile.work_preferences) {
  chunks.push(
    createChunk(
      "work_preferences",
      "work_preferences",
      toReadableText(profile.work_preferences)
    )
  );
}

// --------- CONTACT ---------
if (profile.contact) {
  chunks.push(
    createChunk(
      "contact",
      "contact",
      toReadableText(profile.contact)
    )
  );
}

// --------- WRITE OUTPUT ---------
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(chunks, null, 2));
console.log(`✅ Built ${chunks.length} chunks successfully`);
