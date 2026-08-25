import puppeteer from "puppeteer";

export const generateResume = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      return res.status(400).json({
      success: false,
      message: "all field is required",
    });
    }

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>Resume</title>

      <style>
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          font-family: Arial, sans-serif;
          padding:30px;
          color:#333;
        }

        .header{
          text-align:center;
          margin-bottom:30px;
          border-bottom:2px solid #ddd;
          padding-bottom:15px;
        }

        .header h1{
          font-size:32px;
        }

        .header p{
          margin-top:5px;
        }

        .section{
          margin-top:25px;
        }

        .section h2{
          border-bottom:1px solid #ddd;
          margin-bottom:10px;
          padding-bottom:5px;
        }

        .item{
          margin-bottom:15px;
        }

        .item-title{
          font-weight:bold;
          font-size:16px;
        }

        ul{
          margin-left:20px;
          margin-top:5px;
        }

        .skills{
          display:flex;
          flex-wrap:wrap;
          gap:8px;
        }

        .skill{
          background:#eee;
          padding:6px 10px;
          border-radius:4px;
        }
      </style>
    </head>

    <body>

      <div class="header">
        <h1>${data.fullName}</h1>

        <p>${data.jobTitle}</p>

        <p>
          ${data.email} |
          ${data.phone} |
          ${data.location}
        </p>

        <p>
          ${data.githubUrl} |
          ${data.linkedinUrl}
        </p>
      </div>

      <div class="section">
        <h2>Professional Summary</h2>
        <p>${data.summary}</p>
      </div>

      ${
        data.experience?.length
          ? `
      <div class="section">
        <h2>Experience</h2>

        ${data.experience
          .map(
            (exp) => `
            <div class="item">
              <div class="item-title">${exp.role}</div>

              <div>
                ${exp.company}
                (${exp.startDate} - ${exp.endDate})
              </div>

              <ul>
                ${exp.points
                  ?.map((point) => `<li>${point}</li>`)
                  .join("")}
              </ul>
            </div>
          `
          )
          .join("")}
      </div>
      `
          : ""
      }

      <div class="section">
        <h2>Projects</h2>

        ${data.projects
          ?.map(
            (project) => `
            <div class="item">
              <div class="item-title">${project.title}</div>

              <ul>
                ${project.points
                  ?.map((point) => `<li>${point}</li>`)
                  .join("")}
              </ul>
            </div>
          `
          )
          .join("")}
      </div>

      <div class="section">
        <h2>Education</h2>

        ${data.education
          ?.map(
            (edu) => `
            <div class="item">
              <div class="item-title">${edu.degree}</div>

              <div>${edu.institution}</div>

              <div>${edu.year}</div>
            </div>
          `
          )
          .join("")}
      </div>

      <div class="section">
        <h2>Skills</h2>

        <div class="skills">
          ${data.skills
            ?.map(
              (skill) =>
                `<span class="skill">${skill}</span>`
            )
            .join("")}
        </div>
      </div>

      ${
        data.certifications?.length
          ? `
      <div class="section">
        <h2>Certifications</h2>

        <ul>
          ${data.certifications
            .map((cert) => `<li>${cert}</li>`)
            .join("")}
        </ul>
      </div>
      `
          : ""
      }

      ${
        data.achievements?.length
          ? `
      <div class="section">
        <h2>Achievements</h2>

        <ul>
          ${data.achievements
            .map(
              (achievement) =>
                `<li>${achievement}</li>`
            )
            .join("")}
        </ul>
      </div>
      `
          : ""
      }

      ${
        data.languages?.length
          ? `
      <div class="section">
        <h2>Languages</h2>

        <ul>
          ${data.languages
            .map(
              (language) =>
                `<li>${language}</li>`
            )
            .join("")}
        </ul>
      </div>
      `
          : ""
      }

      ${
        data.interests?.length
          ? `
      <div class="section">
        <h2>Interests</h2>

        <ul>
          ${data.interests
            .map(
              (interest) =>
                `<li>${interest}</li>`
            )
            .join("")}
        </ul>
      </div>
      `
          : ""
      }

    </body>
    </html>
    `;

    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition":
        "attachment; filename=resume.pdf",
    });

    return res.send(pdf);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};