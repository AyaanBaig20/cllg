
const esc = (v) => (v ?? "").toString(); // swap for a real escaper later if you accept untrusted input

const list = (arr, mapFn) => (arr?.length ? arr.map(mapFn).join("") : "");

// ============================================================
// TEMPLATE 1 — "Classic" (your original, unchanged design)
// ============================================================
function buildClassicHtml(data) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Resume</title>
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family: Arial, sans-serif; padding:30px; color:#333; }
      .header { text-align:center; margin-bottom:30px; border-bottom:2px solid #ddd; padding-bottom:15px; }
      .header h1 { font-size:32px; }
      .header p { margin-top:5px; }
      .section { margin-top:25px; }
      .section h2 { border-bottom:1px solid #ddd; margin-bottom:10px; padding-bottom:5px; }
      .item { margin-bottom:15px; }
      .item-title { font-weight:bold; font-size:16px; }
      ul { margin-left:20px; margin-top:5px; }
      .skills { display:flex; flex-wrap:wrap; gap:8px; }
      .skill { background:#eee; padding:6px 10px; border-radius:4px; }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>${esc(data.fullName)}</h1>
      <p>${esc(data.jobTitle)}</p>
      <p>${esc(data.email)} | ${esc(data.phone)} | ${esc(data.location)}</p>
      <p>${esc(data.githubUrl)} | ${esc(data.linkedinUrl)}</p>
    </div>

    <div class="section">
      <h2>Professional Summary</h2>
      <p>${esc(data.summary)}</p>
    </div>

    ${data.experience?.length ? `
    <div class="section">
      <h2>Experience</h2>
      ${list(data.experience, (exp) => `
        <div class="item">
          <div class="item-title">${esc(exp.role)}</div>
          <div>${esc(exp.company)} (${esc(exp.startDate)} - ${esc(exp.endDate)})</div>
          <ul>${list(exp.points, (p) => `<li>${esc(p)}</li>`)}</ul>
        </div>
      `)}
    </div>` : ""}

    <div class="section">
      <h2>Projects</h2>
      ${list(data.projects, (project) => `
        <div class="item">
          <div class="item-title">${esc(project.title)}</div>
          <ul>${list(project.points, (p) => `<li>${esc(p)}</li>`)}</ul>
        </div>
      `)}
    </div>

    <div class="section">
      <h2>Education</h2>
      ${list(data.education, (edu) => `
        <div class="item">
          <div class="item-title">${esc(edu.degree)}</div>
          <div>${esc(edu.institution)}</div>
          <div>${esc(edu.year)}</div>
        </div>
      `)}
    </div>

    <div class="section">
      <h2>Skills</h2>
      <div class="skills">${list(data.skills, (s) => `<span class="skill">${esc(s)}</span>`)}</div>
    </div>

    ${data.certifications?.length ? `
    <div class="section"><h2>Certifications</h2><ul>${list(data.certifications, (c) => `<li>${esc(c)}</li>`)}</ul></div>` : ""}

    ${data.achievements?.length ? `
    <div class="section"><h2>Achievements</h2><ul>${list(data.achievements, (a) => `<li>${esc(a)}</li>`)}</ul></div>` : ""}

    ${data.languages?.length ? `
    <div class="section"><h2>Languages</h2><ul>${list(data.languages, (l) => `<li>${esc(l)}</li>`)}</ul></div>` : ""}

    ${data.interests?.length ? `
    <div class="section"><h2>Interests</h2><ul>${list(data.interests, (i) => `<li>${esc(i)}</li>`)}</ul></div>` : ""}
  </body>
  </html>`;
}

// ============================================================
// TEMPLATE 2 — "Slate Sidebar"
// Two-column layout, dark slate sidebar with contact/skills,
// teal accent, sans-serif. Good for tech/product roles.
// ============================================================
function buildSlateSidebarHtml(data) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Resume</title>
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family: 'Helvetica Neue', Arial, sans-serif; color:#1f2937; }
      .page { display:flex; min-height:100vh; }

      .sidebar {
        width:34%;
        background:#1f2937;
        color:#e5e7eb;
        padding:32px 24px;
      }
      .sidebar h1 { font-size:24px; line-height:1.25; color:#ffffff; }
      .sidebar .role { color:#5eead4; font-size:13px; margin-top:6px; letter-spacing:.02em; }

      .sidebar h3 {
        font-size:12px;
        color:#5eead4;
        margin-top:28px;
        margin-bottom:10px;
        text-transform:uppercase;
        letter-spacing:.08em;
      }
      .sidebar .contact-line { font-size:12.5px; margin-bottom:6px; word-break:break-word; color:#cbd5e1; }

      .skill-pill {
        display:inline-block;
        background:#334155;
        color:#e2e8f0;
        font-size:11.5px;
        padding:4px 9px;
        border-radius:3px;
        margin:0 6px 6px 0;
      }

      .main { width:66%; padding:32px 30px; }
      .main .section { margin-bottom:24px; }
      .main .section h2 {
        font-size:15px;
        color:#0f766e;
        border-bottom:2px solid #0f766e;
        display:inline-block;
        padding-bottom:3px;
        margin-bottom:12px;
      }
      .item { margin-bottom:14px; }
      .item-title { font-weight:700; font-size:15px; }
      .item-sub { font-size:12.5px; color:#64748b; margin-bottom:4px; }
      ul { margin-left:18px; }
      li { font-size:13px; margin-bottom:3px; line-height:1.45; }
      p { font-size:13px; line-height:1.5; }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="sidebar">
        <h1>${esc(data.fullName)}</h1>
        <div class="role">${esc(data.jobTitle)}</div>

        <h3>Contact</h3>
        <div class="contact-line">${esc(data.email)}</div>
        <div class="contact-line">${esc(data.phone)}</div>
        <div class="contact-line">${esc(data.location)}</div>
        <div class="contact-line">${esc(data.githubUrl)}</div>
        <div class="contact-line">${esc(data.linkedinUrl)}</div>

        ${data.skills?.length ? `
        <h3>Skills</h3>
        <div>${list(data.skills, (s) => `<span class="skill-pill">${esc(s)}</span>`)}</div>` : ""}

        ${data.languages?.length ? `
        <h3>Languages</h3>
        <div>${list(data.languages, (l) => `<span class="skill-pill">${esc(l)}</span>`)}</div>` : ""}

        ${data.certifications?.length ? `
        <h3>Certifications</h3>
        ${list(data.certifications, (c) => `<div class="contact-line">${esc(c)}</div>`)}` : ""}
      </div>

      <div class="main">
        ${data.summary ? `
        <div class="section">
          <h2>Summary</h2>
          <p>${esc(data.summary)}</p>
        </div>` : ""}

        ${data.experience?.length ? `
        <div class="section">
          <h2>Experience</h2>
          ${list(data.experience, (exp) => `
            <div class="item">
              <div class="item-title">${esc(exp.role)}</div>
              <div class="item-sub">${esc(exp.company)} &bull; ${esc(exp.startDate)} - ${esc(exp.endDate)}</div>
              <ul>${list(exp.points, (p) => `<li>${esc(p)}</li>`)}</ul>
            </div>
          `)}
        </div>` : ""}

        ${data.projects?.length ? `
        <div class="section">
          <h2>Projects</h2>
          ${list(data.projects, (project) => `
            <div class="item">
              <div class="item-title">${esc(project.title)}</div>
              <ul>${list(project.points, (p) => `<li>${esc(p)}</li>`)}</ul>
            </div>
          `)}
        </div>` : ""}

        ${data.education?.length ? `
        <div class="section">
          <h2>Education</h2>
          ${list(data.education, (edu) => `
            <div class="item">
              <div class="item-title">${esc(edu.degree)}</div>
              <div class="item-sub">${esc(edu.institution)} &bull; ${esc(edu.year)}</div>
            </div>
          `)}
        </div>` : ""}

        ${data.achievements?.length ? `
        <div class="section">
          <h2>Achievements</h2>
          <ul>${list(data.achievements, (a) => `<li>${esc(a)}</li>`)}</ul>
        </div>` : ""}

        ${data.interests?.length ? `
        <div class="section">
          <h2>Interests</h2>
          <ul>${list(data.interests, (i) => `<li>${esc(i)}</li>`)}</ul>
        </div>` : ""}
      </div>
    </div>
  </body>
  </html>`;
}

// ============================================================
// TEMPLATE 3 — "Editorial Serif"
// Single column, off-white paper, navy + goldenrod rule under
// headings, serif type. Good for formal / academic / legal roles.
// ============================================================
function buildEditorialSerifHtml(data) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Resume</title>
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family: Georgia, 'Times New Roman', serif; color:#20242c; background:#fdfcf9; padding:44px 52px; }

      .header { margin-bottom:26px; }
      .header h1 { font-size:30px; color:#1e3a5f; letter-spacing:.01em; }
      .header .role { font-size:14px; color:#4b5563; margin-top:4px; font-style:italic; }
      .header .contact {
        margin-top:12px;
        font-size:12px;
        color:#374151;
        border-top:1px solid #d8d2c4;
        border-bottom:3px double #b8860b;
        padding:7px 0;
      }

      .section { margin-top:22px; }
      .section h2 {
        font-size:14px;
        color:#1e3a5f;
        letter-spacing:.04em;
        border-bottom:1px solid #b8860b;
        padding-bottom:4px;
        margin-bottom:10px;
      }

      .item { margin-bottom:13px; }
      .item-title { font-weight:bold; font-size:14.5px; }
      .item-sub { font-size:12px; color:#5b6472; font-style:italic; margin-bottom:3px; }
      ul { margin-left:20px; }
      li { font-size:13px; line-height:1.55; margin-bottom:3px; }
      p { font-size:13px; line-height:1.6; }

      .skills-line { font-size:13px; line-height:1.7; }
      .skills-line span:not(:last-child)::after { content: " \\2022 "; color:#b8860b; }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>${esc(data.fullName)}</h1>
      <div class="role">${esc(data.jobTitle)}</div>
      <div class="contact">
        ${esc(data.email)} &nbsp;|&nbsp; ${esc(data.phone)} &nbsp;|&nbsp; ${esc(data.location)}
        ${data.githubUrl || data.linkedinUrl ? `<br/>${esc(data.githubUrl)} &nbsp;|&nbsp; ${esc(data.linkedinUrl)}` : ""}
      </div>
    </div>

    ${data.summary ? `
    <div class="section">
      <h2>Professional Summary</h2>
      <p>${esc(data.summary)}</p>
    </div>` : ""}

    ${data.experience?.length ? `
    <div class="section">
      <h2>Experience</h2>
      ${list(data.experience, (exp) => `
        <div class="item">
          <div class="item-title">${esc(exp.role)}</div>
          <div class="item-sub">${esc(exp.company)} — ${esc(exp.startDate)} to ${esc(exp.endDate)}</div>
          <ul>${list(exp.points, (p) => `<li>${esc(p)}</li>`)}</ul>
        </div>
      `)}
    </div>` : ""}

    ${data.projects?.length ? `
    <div class="section">
      <h2>Projects</h2>
      ${list(data.projects, (project) => `
        <div class="item">
          <div class="item-title">${esc(project.title)}</div>
          <ul>${list(project.points, (p) => `<li>${esc(p)}</li>`)}</ul>
        </div>
      `)}
    </div>` : ""}

    ${data.education?.length ? `
    <div class="section">
      <h2>Education</h2>
      ${list(data.education, (edu) => `
        <div class="item">
          <div class="item-title">${esc(edu.degree)}</div>
          <div class="item-sub">${esc(edu.institution)} — ${esc(edu.year)}</div>
        </div>
      `)}
    </div>` : ""}

    ${data.skills?.length ? `
    <div class="section">
      <h2>Skills</h2>
      <div class="skills-line">${list(data.skills, (s) => `<span>${esc(s)}</span>`)}</div>
    </div>` : ""}

    ${data.certifications?.length ? `
    <div class="section"><h2>Certifications</h2><ul>${list(data.certifications, (c) => `<li>${esc(c)}</li>`)}</ul></div>` : ""}

    ${data.achievements?.length ? `
    <div class="section"><h2>Achievements</h2><ul>${list(data.achievements, (a) => `<li>${esc(a)}</li>`)}</ul></div>` : ""}

    ${data.languages?.length ? `
    <div class="section"><h2>Languages</h2><div class="skills-line">${list(data.languages, (l) => `<span>${esc(l)}</span>`)}</div></div>` : ""}

    ${data.interests?.length ? `
    <div class="section"><h2>Interests</h2><div class="skills-line">${list(data.interests, (i) => `<span>${esc(i)}</span>`)}</div></div>` : ""}
  </body>
  </html>`;
}

// ---------- registry: add future templates here ----------
const TEMPLATES = {
  classic: buildClassicHtml,
  "slate-sidebar": buildSlateSidebarHtml,
  "editorial-serif": buildEditorialSerifHtml,
};

// data.template will be a string like "classic" | "slate-sidebar" | "editorial-serif"
function buildResumeHtml(templateId, data) {
  const build = TEMPLATES[templateId] || TEMPLATES.classic; // fallback so bad/missing id never breaks the request
  return build(data);
}
export { buildResumeHtml, TEMPLATES };