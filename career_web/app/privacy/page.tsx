import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/legal-document";

export const metadata: Metadata = {
  title: "Privacy Policy | CareerLink Somalia",
  description:
    "Learn how CareerLink Somalia collects, uses and protects personal information on our career platform.",
};

const SECTIONS = [
  {
    title: "1. Introduction",
    paragraphs: [
      "CareerLink Somalia (“CareerLink”, “we”, “us” or “our”) respects your privacy. This Privacy Policy explains how we collect, use, disclose and safeguard personal information when you use our website, mobile applications and related services (the “Platform”).",
      "This Policy applies to students, graduates, employers, universities and visitors. By using the Platform, you acknowledge that you have read this Privacy Policy.",
    ],
  },
  {
    title: "2. Information We Collect",
    paragraphs: ["We may collect the following categories of information:"],
    list: [
      "Account information such as your name, email address, phone number, password and selected role (student, employer or university).",
      "Profile and career information including education history, skills, CV or resume files, work experience, preferences and application history.",
      "Employer and university information including organization name, description, contact details and opportunity listings.",
      "Usage data such as pages viewed, searches, clicks, device type, browser, IP address, approximate location and referral source.",
      "Communications you send to us, including support requests and feedback.",
      "Information from cookies and similar technologies, as described below.",
    ],
  },
  {
    title: "3. How We Use Information",
    paragraphs: ["We use personal information to:"],
    list: [
      "Provide, maintain and improve the Platform.",
      "Create and manage user accounts and authenticate sign-in.",
      "Display profiles, opportunities, applications and career resources.",
      "Enable employers and universities to review applicants and manage listings.",
      "Send service-related messages, security alerts and product updates.",
      "Analyze usage trends to improve performance, design and user experience.",
      "Detect, prevent and address fraud, abuse and security incidents.",
      "Comply with legal obligations and enforce our Terms of Service.",
    ],
  },
  {
    title: "4. Legal Bases for Processing",
    paragraphs: [
      "Where applicable, we process personal information based on one or more of the following: your consent; performance of a contract with you; our legitimate interests in operating and improving the Platform; and compliance with legal obligations.",
    ],
  },
  {
    title: "5. How We Share Information",
    paragraphs: [
      "We do not sell your personal information. We may share information in the following circumstances:",
    ],
    list: [
      "With other users when you apply to opportunities, publish a profile or post a listing, according to your account settings and Platform functionality.",
      "With service providers who help us host infrastructure, send email, analyze usage or provide customer support, subject to confidentiality obligations.",
      "With your consent or at your direction, such as when you choose to share a profile externally.",
      "When required by law, regulation, legal process or governmental request.",
      "To protect the rights, property or safety of CareerLink, our users or the public.",
      "In connection with a merger, acquisition, financing or sale of assets, subject to appropriate safeguards.",
    ],
  },
  {
    title: "6. Data Retention",
    paragraphs: [
      "We retain personal information for as long as necessary to provide the Platform, fulfill the purposes described in this Policy, comply with legal obligations, resolve disputes and enforce agreements.",
      "When information is no longer needed, we will delete or anonymize it in accordance with our retention practices, unless a longer retention period is required or permitted by law.",
    ],
  },
  {
    title: "7. Security",
    paragraphs: [
      "We implement administrative, technical and organizational measures designed to protect personal information against unauthorized access, loss or misuse. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      "You are responsible for choosing a strong password and keeping your credentials confidential.",
    ],
  },
  {
    title: "8. Your Choices and Rights",
    paragraphs: [
      "Depending on your location and applicable law, you may have rights to access, correct, delete or restrict processing of your personal information, to object to certain processing, or to request portability of your data.",
      "You may update profile information in your account settings where available, or contact us at hello@careerlink.so to exercise your rights. We may need to verify your identity before responding.",
      "You may opt out of non-essential marketing emails by using the unsubscribe link in those messages. Service-related communications may still be sent.",
    ],
  },
  {
    title: "9. Cookies and Similar Technologies",
    paragraphs: [
      "We use cookies and similar technologies to remember preferences, keep you signed in, understand usage and improve the Platform. You can control cookies through your browser settings. Disabling cookies may affect certain features.",
      "We may use analytics tools that collect aggregated or pseudonymous usage data to help us understand how the Platform is used.",
    ],
  },
  {
    title: "10. Children’s Privacy",
    paragraphs: [
      "The Platform is not directed to children under 16. We do not knowingly collect personal information from children under 16 without appropriate consent. If you believe a child has provided us personal information, contact us and we will take appropriate steps to delete it.",
    ],
  },
  {
    title: "11. International Users",
    paragraphs: [
      "CareerLink is based in Somalia and may process information in Somalia and other countries where we or our service providers operate. By using the Platform, you understand that your information may be transferred to and processed in locations that may have different data protection laws than your country of residence.",
    ],
  },
  {
    title: "12. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. When we make material changes, we will post the updated Policy on this page and update the “Last updated” date. We encourage you to review this Policy periodically.",
    ],
  },
  {
    title: "13. Contact Us",
    paragraphs: [
      "For privacy questions or requests, contact us at hello@careerlink.so or write to CareerLink Somalia, Mogadishu, Somalia.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      label="Legal"
      title="Privacy Policy"
      subtitle="How CareerLink Somalia collects, uses and protects your personal information."
      lastUpdated="July 28, 2026"
      sections={SECTIONS}
    />
  );
}
