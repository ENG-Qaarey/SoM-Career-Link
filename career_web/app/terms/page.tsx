import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";

export const metadata: Metadata = {
  title: "Terms of Service | CareerLink Somalia",
  description:
    "Read the Terms of Service for using CareerLink Somalia — our career platform for students, graduates, employers and universities.",
};

const SECTIONS = [
  {
    title: "1. Agreement to These Terms",
    paragraphs: [
      "These Terms of Service (“Terms”) govern your access to and use of the CareerLink Somalia website, mobile applications and related services (collectively, the “Platform”), operated by CareerLink Somalia (“CareerLink”, “we”, “us” or “our”).",
      "By creating an account, browsing opportunities or otherwise using the Platform, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must not use the Platform.",
    ],
  },
  {
    title: "2. Who May Use CareerLink",
    paragraphs: [
      "The Platform is designed for students, graduates, job seekers, employers, universities and other organizations supporting career development in Somalia and the wider region.",
      "You must be at least 16 years old to create an account. If you are under 18, you represent that you have permission from a parent or legal guardian. Employers and university representatives must have authority to act on behalf of their organization.",
    ],
  },
  {
    title: "3. Accounts and Registration",
    paragraphs: [
      "When you register, you agree to provide accurate, current and complete information and to keep your account details up to date. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.",
      "You must notify us promptly at hello@careerlink.so if you suspect unauthorized access to your account. We may suspend or terminate accounts that contain false information, violate these Terms or pose a security risk.",
    ],
  },
  {
    title: "4. User Roles and Responsibilities",
    paragraphs: ["Depending on your account type, additional responsibilities apply:"],
    list: [
      "Students and graduates must provide truthful profile, education and CV information and apply only to opportunities they genuinely intend to pursue.",
      "Employers must post accurate job, internship, graduate program and event listings and comply with applicable employment and advertising laws.",
      "Universities must use the Platform to support legitimate student career services and may not misrepresent partnerships or institutional authority.",
      "All users must treat others respectfully and must not harass, discriminate against or mislead other users.",
    ],
  },
  {
    title: "5. Opportunities, Applications and Content",
    paragraphs: [
      "CareerLink provides tools to discover, publish and manage career opportunities. We do not guarantee that any listing will result in employment, admission to a program or a successful hire.",
      "Employers and event organizers are solely responsible for the content of their listings, hiring decisions and communications with applicants. CareerLink may review, edit, reject or remove content that violates these Terms or applicable law, but we are not obligated to monitor all user content.",
      "By submitting content to the Platform—including profiles, CVs, company descriptions and opportunity listings—you grant CareerLink a non-exclusive, worldwide, royalty-free license to host, display, reproduce and distribute that content for the purpose of operating and promoting the Platform.",
    ],
  },
  {
    title: "6. Acceptable Use",
    paragraphs: ["You agree not to:"],
    list: [
      "Use the Platform for unlawful, fraudulent or harmful purposes.",
      "Scrape, copy or resell Platform data without written permission.",
      "Upload malware, spam or misleading application materials.",
      "Impersonate another person or organization.",
      "Circumvent security features or attempt unauthorized access to systems or accounts.",
      "Post discriminatory, defamatory, obscene or otherwise objectionable material.",
    ],
  },
  {
    title: "7. Intellectual Property",
    paragraphs: [
      "The CareerLink name, logo, software, design and other Platform materials are owned by CareerLink or its licensors and are protected by intellectual property laws. Except as expressly permitted, you may not copy, modify, distribute or create derivative works from our materials without prior written consent.",
      "Trademarks and content belonging to employers, universities or other third parties remain the property of their respective owners.",
    ],
  },
  {
    title: "8. Third-Party Services and Links",
    paragraphs: [
      "The Platform may link to third-party websites, app stores or services. CareerLink is not responsible for the content, policies or practices of third parties. Your use of third-party services is at your own risk and subject to their terms.",
    ],
  },
  {
    title: "9. Disclaimers",
    paragraphs: [
      "The Platform is provided on an “as is” and “as available” basis. To the fullest extent permitted by law, CareerLink disclaims all warranties, whether express or implied, including warranties of merchantability, fitness for a particular purpose and non-infringement.",
      "We do not warrant that the Platform will be uninterrupted, error-free or free of harmful components. CareerLink does not verify every listing, employer or applicant and does not guarantee the accuracy of user-provided information.",
    ],
  },
  {
    title: "10. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by applicable law, CareerLink and its officers, employees and partners will not be liable for any indirect, incidental, special, consequential or punitive damages, or for loss of profits, data, goodwill or business opportunities arising from your use of the Platform.",
      "Our total liability for any claim relating to the Platform will not exceed the greater of (a) the amount you paid to CareerLink in the twelve months before the claim or (b) one hundred United States dollars (USD $100), except where such limitation is prohibited by law.",
    ],
  },
  {
    title: "11. Indemnification",
    paragraphs: [
      "You agree to indemnify and hold harmless CareerLink from claims, damages, losses and expenses (including reasonable legal fees) arising from your use of the Platform, your content, your listings or your violation of these Terms or applicable law.",
    ],
  },
  {
    title: "12. Suspension and Termination",
    paragraphs: [
      "We may suspend or terminate your access to the Platform at any time if we reasonably believe you have violated these Terms or if continued access could harm users or CareerLink. You may close your account at any time by contacting us.",
      "Sections that by their nature should survive termination—including intellectual property, disclaimers, limitation of liability and governing law—will remain in effect.",
    ],
  },
  {
    title: "13. Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. When we make material changes, we will post the updated Terms on this page and update the “Last updated” date. Continued use of the Platform after changes become effective constitutes acceptance of the revised Terms.",
    ],
  },
  {
    title: "14. Governing Law and Disputes",
    paragraphs: [
      "These Terms are governed by the laws of the Federal Republic of Somalia, without regard to conflict-of-law principles. Parties agree to attempt good-faith resolution of disputes before pursuing formal remedies. Courts located in Mogadishu, Somalia shall have exclusive jurisdiction, unless mandatory local law requires otherwise.",
    ],
  },
  {
    title: "15. Contact Us",
    paragraphs: [
      "If you have questions about these Terms, contact us at hello@careerlink.so or write to CareerLink Somalia, Mogadishu, Somalia.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      label="Legal"
      title="Terms of Service"
      subtitle="Please read these terms carefully before using CareerLink Somalia."
      lastUpdated="July 28, 2026"
      sections={SECTIONS}
    />
  );
}
