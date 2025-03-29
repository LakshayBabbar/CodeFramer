import Footer from "@/components/Footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - CodeFramer",
    description: "Read the Terms of Service for CodeFramer to understand the rules and conditions for using our platform.",
    keywords: ["terms of service", "CodeFramer", "terms", "service", "agreement"],
}

const TermsOfService = () => {
    const email = "lakshaybabbar0118@outlook.com";
    const siteUrl = process.env.BASE_URL || "";
    return (
        <main className="w-full place-items-center space-y-10">
            <div className="mt-16 prose md:prose-xl px-4 py-8 dark:prose-headings:text-neutral-200 dark:text-neutral-300 dark:prose-a:text-white dark:prose-strong:text-neutral-200">
                <h1>Terms of Service</h1>

                <p><strong>Effective Date:</strong> 09/01/2025</p>

                <p>
                    Welcome to CodeFramer! By using our website (
                    <a
                        href={siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {siteUrl}
                    </a>
                    ) and services (collectively, the &quot;Services&quot;), you agree to comply with
                    and be bound by these Terms of Service. Please read them carefully.
                </p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using the Services, you agree to these terms, as well as
                    our Privacy Policy. If you do not agree, you must not use our Services.
                </p>

                <h2>2. Changes to Terms</h2>
                <p>
                    We may update these Terms of Service from time to time. Any changes will
                    be posted on this page with an updated effective date. Continued use of
                    the Services constitutes acceptance of the revised terms.
                </p>

                <h2>3. Use of the Services</h2>
                <ul>
                    <li>You must be at least 13 years old to use CodeFramer.</li>
                    <li>
                        You are responsible for maintaining the confidentiality of your
                        account and password.
                    </li>
                    <li>
                        You agree not to misuse the Services, including engaging in illegal
                        activities, attempting to harm the platform, or infringing on others
                        rights.
                    </li>
                </ul>

                <h2>4. Intellectual Property</h2>
                <p>
                    All content, trademarks, and intellectual property on the platform are
                    owned by CodeFramer or its licensors. You may not use, reproduce, or
                    distribute them without permission.
                </p>

                <h2>5. User Content</h2>
                <p>
                    You retain ownership of any content you create or upload to CodeFramer.
                    However, by uploading, you grant us a license to store, display, and
                    process the content as needed to provide our Services.
                </p>

                <h2>6. Termination</h2>
                <p>
                    We reserve the right to suspend or terminate your account if you violate
                    these terms or engage in activities harmful to the platform or its users.
                </p>

                <h2>7. Limitation of Liability</h2>
                <p>
                    CodeFramer is provided &quot;as is&quot; without warranties of any kind. We are
                    not responsible for any damages or losses resulting from your use of the
                    platform.
                </p>
                <h2>8. Contact Us</h2>
                <p>
                    If you have any questions about these Terms of Service, please contact
                    us at:
                </p>
                <p>Email: {email}</p>
                <p>
                    Website: <a href={siteUrl}>{siteUrl}</a>
                </p>
            </div>
            <Footer />
        </main>
    )
};

export default TermsOfService;
