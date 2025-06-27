
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-foreground mb-8 font-playfair">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg mb-8 font-inter">
              Last updated: June 13, 2025
            </p>

            <div className="space-y-8 font-inter">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">Interpretation and Definitions</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
                  <li><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party.</li>
                  <li><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to HALOUL AL-DHAKAA AL-HADEETH LLC, King Abdulaziz Rd, Al Aarid, Riyadh 13341, Saudi Arabia.</li>
                  <li><strong>Cookies</strong> are small files placed on Your device.</li>
                  <li><strong>Country</strong> refers to: Saudi Arabia</li>
                  <li><strong>Device</strong> means any device that can access the Service.</li>
                  <li><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
                  <li><strong>Service</strong> refers to the mobile application and related website.</li>
                  <li><strong>Service Provider</strong> refers to any third party who processes data on behalf of the Company.</li>
                  <li><strong>Usage Data</strong> refers to data collected automatically when using the Service.</li>
                  <li><strong>Website</strong> refers to Cals., accessible from <a href="https://mycals.io" className="text-blue-600 underline">mycals.io</a></li>
                  <li><strong>You</strong> means the individual using the Service, or the entity they represent.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">Collecting and Using Your Personal Data</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may collect:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>Email, Name, Phone number</li>
                  <li>Usage Data (IP, browser info, timestamps, etc.)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Tracking technologies used include cookies, web beacons, and scripts for performance analysis and feature support.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Cookies used:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Session Cookies (Essential)</li>
                  <li>Persistent Cookies (Functionality, Notice Acceptance)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">Use of Your Personal Data</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use your data to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>Provide, maintain, and improve the Service</li>
                  <li>Manage user accounts and contact you</li>
                  <li>Send updates and marketing (if opted in)</li>
                  <li>Analyze usage and performance</li>
                  <li>Comply with legal obligations</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  We may share data with service providers, affiliates, or during business transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">Retention and Transfer</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We retain your data only as long as necessary and may store or process it outside your region with proper safeguards.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You may request deletion of your data by contacting us at support@mycals.io.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may disclose data:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>For legal compliance</li>
                  <li>To protect rights or safety</li>
                  <li>During a business transfer</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Children under 13 are not targeted, and data will be deleted if collected without consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use appropriate measures but cannot guarantee 100% security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">Changes to Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Updates will be posted on this page with the new date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4 font-playfair">Contact</h2>
                <div className="mt-4 p-4 bg-secondary/10 rounded-lg">
                  <p className="text-foreground font-semibold">Email: support@mycals.io</p>
                  <p className="text-muted-foreground">
                    Address: King Abdulaziz Rd, Al Aarid, Riyadh 13341, Saudi Arabia
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
