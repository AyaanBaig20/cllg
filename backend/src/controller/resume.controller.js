import puppeteer from "puppeteer";
import User from "../model/user.model.js";
import Resume from "../model/resume.model.js";
import { buildResumeHtml } from "../templete/buildResumeHtml.js";

export const generateResume = async (req, res) => {
  try {
    const data = req.body;
const phone = String(data.phone);

if (phone.length !== 10) {
  return res.status(400).json({
  success: false,
  message: "Phone number should be 10 digits"
});
}
    const resume = await Resume.create({
      ...data,
      user: req.user.id,
    });

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $inc: { resumeCreated: 1 },
        $push: { resumes: resume._id },
      },
      { new: true },
    );

    // data.template comes from the frontend, e.g. "classic" | "slate-sidebar" | "editorial-serif"
    const html = buildResumeHtml(data.template, data);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=resume.pdf",
    });

    return res.send(pdf);
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find({}).select("-password").populate("resumes");

    return res.status(200).json({
      success: true,
      allUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
