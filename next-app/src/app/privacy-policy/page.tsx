import Footer from "@/components/Footer/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - CodeFramer",
    description: "Learn about how CodeFramer collects, uses, and protects your personal information. View our comprehensive Privacy Policy for details.",
    keywords: ["privacy policy", "data protection", "user information", "CodeFramer"],
}

const PrivacyPolicy = () => {
    const email = "lakshaybabbar0118@outlook.com";
    const siteUrl = process.env.BASE_URL || "";
    return (
        <main className="place-items-center space-y-10">
            <div className="mt-16 prose md:prose-xl px-4 py-8 dark:prose-headings:text-neutral-200 dark:text-neutral-300 dark:prose-a:text-white">
                <h1>Privacy Policy</h1>
                <p>
                    CodeFramer (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) values your privacy and is committed to
                    protecting your personal information. This Privacy Policy explains how
                    we collect, use, and disclose information when you use our website (
                    <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                        {siteUrl}
                    </a>
                    ), services, and products (collectively, the &quot;Services&quot;). By using our
                    Services, you agree to the practices described in this policy.
                </p>

                <h2>1. Information We Collect</h2>

                <h3>1.1 Information You Provide</h3>
                <p>We collect information that you provide directly to us when you:</p>
                <ul>
                    <li>Register for an account</li>
                    <li>Use our online IDE and compiler</li>
                    <li>Interact with Aizen, our AI chatbot</li>
                    <li>Save projects or use the dashboard</li>
                    <li>Contact us for support or inquiries</li>
                </ul>
                <p>This may include:</p>
                <ul>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Username</li>
                    <li>Password</li>
                    <li>Project data (e.g., code files, project names, and descriptions)</li>
                </ul>

                <h3>1.2 Information We Collect Automatically</h3>
                <p>
                    When you use the Services, we may automatically collect:
                </p>
                <ul>
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Device information</li>
                    <li>Usage data (e.g., pages visited, time spent, actions performed)</li>
                    <li>Cookies and similar technologies for tracking activity</li>
                </ul>

                <h3>1.3 Third-Party Information</h3>
                <p>
                    We may collect information about you from third-party services (e.g.,
                    GitHub) if you link your account to these services.
                </p>

                <h2>2. How We Use Your Information</h2>
                <p>We use the information collected for the following purposes:</p>
                <ul>
                    <li>To provide and maintain our Services</li>
                    <li>To personalize your experience</li>
                    <li>To manage user accounts and provide support</li>
                    <li>To analyze and improve our Services</li>
                    <li>To ensure security and prevent fraud</li>
                    <li>To comply with legal obligations</li>
                    <li>To send updates, notifications, and marketing materials (if you opt-in)</li>
                </ul>

                <h2>3. How We Share Your Information</h2>
                <p>We do not sell your personal information. However, we may share your information in the following situations:</p>

                <h3>3.1 Service Providers</h3>
                <p>
                    We may share information with third-party vendors who perform services on our
                    behalf, such as hosting, analytics, and customer support.
                </p>

                <h3>3.2 Legal Compliance</h3>
                <p>
                    We may disclose information to comply with applicable laws, regulations,
                    legal processes, or government requests.
                </p>

                <h3>3.3 Business Transfers</h3>
                <p>
                    In the event of a merger, sale, or transfer of assets, your information may be
                    transferred as part of that transaction.
                </p>

                <h3>3.4 With Your Consent</h3>
                <p>
                    We may share your information with third parties when you explicitly consent.
                </p>

                <h2>4. Your Rights and Choices</h2>

                <h3>4.1 Access and Update</h3>
                <p>You can access and update your personal information through your account settings.</p>

                <h3>4.2 Delete Your Information</h3>
                <p>
                    You may request the deletion of your account and associated data by
                    contacting us at {email} or by manually deleting your account
                    through the dashboard.
                </p>

                <h3>4.3 Opt-Out of Communications</h3>
                <p>You can opt-out of marketing emails by using the unsubscribe link in our messages.</p>

                <h3>4.4 Cookie Preferences</h3>
                <p>You can manage your cookie preferences through your browser settings.</p>

                <h2>5. Data Security</h2>
                <p>
                    We implement industry-standard security measures to protect your information.
                    However, no method of transmission or storage is completely secure. You use our
                    Services at your own risk.
                </p>

                <h2>6. Children&apos;s Privacy</h2>
                <p>
                    CodeFramer is not intended for use by individuals under the age of 13. We do not
                    knowingly collect personal information from children under 13. If we become aware
                    of such information, we will take steps to delete it.
                </p>

                <h2>7. Third-Party Links</h2>
                <p>
                    Our Services may contain links to third-party websites. We are not responsible for
                    their privacy practices or content. Please review their privacy policies before
                    providing any personal information.
                </p>

                <h2>8. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. Any changes will be posted on
                    this page with an updated effective date. Continued use of the Services constitutes
                    acceptance of the updated policy.
                </p>

                <h2>9. Contact Us</h2>
                <p>
                    If you have any questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <p>Email: {email}</p>
                <p>
                    Website: <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                        {siteUrl}
                    </a>
                </p>
            </div>
            <Footer />
        </main>
    );
};

export default PrivacyPolicy;
