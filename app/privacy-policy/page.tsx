"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6 leading-tight md:text-5xl text-white">Privacy Policy</h1>
          <p className="text-lg text-gray-300 leading-relaxed">Data Protection Notice</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-6 border-b border-gray-700 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white p-0 h-auto font-normal"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </section>

      {/* Company Information */}
      <section className="py-8 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center text-gray-300 text-sm leading-relaxed">
            <p className="mb-2">
              <strong>KW SINGAPORE REAL ESTATE PTE. LTD.</strong> with Estate Agent License Number{" "}
              <strong>L3011034Z</strong>, is the licensed and independently owned and operated franchisee of KW
              Singapore, Keller Williams.
            </p>
            <p>1 Paya Lebar Link, #04-01 Paya Lebar Quarter, Singapore 408533, Singapore | www.kwsingapore.com</p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-invert max-w-none">
            {/* Purpose */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#B40101]">Purpose</h2>
              <p className="text-gray-300 leading-relaxed">
                This Data Protection Notice ("Notice") sets out the basis on which KW Singapore Real Estate Pte. Ltd.
                ("KW Singapore", "we", "us", or "our"), may collect, use, disclose or otherwise process personal data of
                our customers in accordance with the Personal Data Protection Act ("PDPA"). This Notice applies to
                personal data in our possession or under our control, including personal data in the possession of
                organisations which we have engaged to collect, use, disclose or process personal data for our purposes.
              </p>
            </div>

            {/* Personal Data */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#B40101]">Personal Data</h2>

              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong>1.</strong> As used in this Notice:
                </p>
                <div className="pl-6 text-gray-300 leading-relaxed">
                  <p className="mb-4">
                    <strong>"customer"</strong> means an individual who (a) has contacted us through any means to find
                    out more about any goods or services we provide, or (b) may, or has, entered into a contract with us
                    for the supply of any goods or services by us; and
                  </p>
                  <p>
                    <strong>"personal data"</strong> means data, whether true or not, about a customer who can be
                    identified: (a) from that data; or (b) from that data and other information to which we have or are
                    likely to have access.
                  </p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>2.</strong> Depending on the nature of your interaction with us, some examples of personal data
                which we may collect from you include name, email address and telephone number.
              </p>

              <p className="text-gray-300 leading-relaxed">
                <strong>3.</strong> Other terms used in this Notice shall have the meanings given to them in the PDPA
                (where the context so permits).
              </p>
            </div>

            {/* Collection, Use and Disclosure */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#B40101]">
                Collection, Use and Disclosure of Personal Data
              </h2>

              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>4.</strong> We generally do not collect your personal data unless (a) it is provided to us
                voluntarily by you directly or via a third party who has been duly authorised by you to disclose your
                personal data to us (your "authorised representative") after (i) you (or your authorised representative)
                have been notified of the purposes for which the data is collected, and (ii) you (or your authorised
                representative) have provided written consent to the collection and usage of your personal data for
                those purposes, or (b) collection and use of personal data without consent is permitted or required by
                the PDPA or other laws. We shall seek your consent before collecting any additional personal data and
                before using your personal data for a purpose which has not been notified to you (except where permitted
                or authorised by law).
              </p>

              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong>5.</strong> We may collect and use your personal data for any or all of the following
                  purposes:
                </p>
                <div className="pl-6 text-gray-300 leading-relaxed space-y-2">
                  <p>
                    <strong>a.</strong> performing obligations in the course of or in connection with our provision of
                    the goods and/or services requested by you;
                  </p>
                  <p>
                    <strong>b.</strong> verifying your identity;
                  </p>
                  <p>
                    <strong>c.</strong> responding to, handling, and processing queries, requests, applications,
                    complaints, and feedback from you;
                  </p>
                  <p>
                    <strong>d.</strong> managing your relationship with us; and
                  </p>
                  <p>
                    <strong>e.</strong> enabling KW Singapore Real Estate Pte. Ltd., our affiliated real estate entity,
                    to contact and assist you in relation to property-related events or services that you have
                    registered interest in with KW Singapore;
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong>6.</strong> We may disclose your personal data:
                </p>
                <div className="pl-6 text-gray-300 leading-relaxed">
                  <p>
                    <strong>a.</strong> where such disclosure is required for performing obligations in the course of or
                    in connection with our provision of the goods and services requested by you;
                  </p>
                </div>
              </div>
            </div>

            {/* Retention */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#B40101]">Retention of Personal Data</h2>

              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>7.</strong> We may retain your personal data for as long as it is necessary to fulfil the
                purpose for which it was collected, or as required or permitted by applicable laws.
              </p>

              <p className="text-gray-300 leading-relaxed">
                <strong>8.</strong> We will cease to retain your personal data or remove the means by which the data can
                be associated with you, as soon as it is reasonable to assume that such retention no longer serves the
                purpose for which the personal data was collected, and is no longer necessary for legal or business
                purposes.
              </p>
            </div>

            {/* Withdrawing Consent */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#B40101]">Withdrawing Your Consent</h2>

              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>9.</strong> The consent that you provide for the collection, use and disclosure of your personal
                data will remain valid until such time it is being withdrawn by you in writing. You may withdraw consent
                and request us to stop collecting, using and/or disclosing your personal data for any or all of the
                purposes listed above by submitting your request in writing or via email to our Data Protection Officer
                at the contact details provided below.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>10.</strong> Upon receipt of your written request to withdraw your consent, we may require
                reasonable time (depending on the complexity of the request and its impact on our relationship with you)
                for your request to be processed and for us to notify you of the consequences of us acceding to the
                same, including any legal consequences which may affect your rights and liabilities to us. In general,
                we shall seek to process your request within ten (10) business days of receiving it.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>11.</strong> Whilst we respect your decision to withdraw your consent, please note that
                depending on the nature and scope of your request, we may not be in a position to continue providing our
                goods or services to you and we shall, in such circumstances, notify you before completing the
                processing of your request. Should you decide to cancel your withdrawal of consent, please inform us in
                writing in the manner described in clause 9 above.
              </p>

              <p className="text-gray-300 leading-relaxed">
                <strong>12.</strong> Please note that withdrawing consent does not affect our right to continue to
                collect, use and disclose personal data where such collection, use and disclose without consent is
                permitted or required under applicable laws.
              </p>
            </div>

            {/* Access and Correction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#B40101]">Access to and Correction of Personal Data</h2>

              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>13.</strong> If you wish to make (a) an access request for access to a copy of the personal data
                which we hold about you or information about the ways in which we use or disclose your personal data, or
                (b) a correction request to correct or update any of your personal data which we hold about you, you may
                submit your request in writing or via email to our Data Protection Officer at the contact details
                provided below.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>14.</strong> Please note that a reasonable fee may be charged for an access request. If so, we
                will inform you of the fee before processing your request.
              </p>

              <p className="text-gray-300 leading-relaxed">
                <strong>15.</strong> We will respond to your request as soon as reasonably possible. In general, our
                response will be within thirty (30) business days. Should we not be able to respond to your request
                within thirty (30) days after receiving your request, we will inform you in writing within thirty (30)
                days of the time by which we will be able to respond to your request. If we are unable to provide you
                with any personal data or to make a correction requested by you, we shall generally inform you of the
                reasons why we are unable to do so (except where we are not required to do so under the PDPA).
              </p>
            </div>

            {/* Protection */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#B40101]">Protection of Personal Data</h2>

              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>16.</strong> To safeguard your personal data from unauthorised access, collection, use,
                disclosure, copying, modification, disposal or similar risks, we have introduced appropriate
                administrative, physical and technical measures such as minimised collection of personal data, regular
                patching of operating system and other software, and security review and testing performed regularly.
              </p>

              <p className="text-gray-300 leading-relaxed">
                <strong>17.</strong> You should be aware, however, that no method of transmission over the Internet or
                method of electronic storage is completely secure. While security cannot be guaranteed, we strive to
                protect the security of your information and are constantly reviewing and enhancing our information
                security measures.
              </p>
            </div>

            {/* Accuracy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#B40101]">Accuracy of Personal Data</h2>

              <p className="text-gray-300 leading-relaxed">
                <strong>18.</strong> We generally rely on personal data provided by you (or your authorised
                representative). In order to ensure that your personal data is current, complete and accurate, please
                update us if there are changes to your personal data by informing our Data Protection Officer in writing
                or via email at the contact details provided below.
              </p>
            </div>

            {/* Transfers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#B40101]">
                Transfers of Personal Data Outside of Singapore
              </h2>

              <p className="text-gray-300 leading-relaxed">
                <strong>19.</strong> We generally do not transfer your personal data to countries outside of Singapore.
                However, if we do so, we will obtain your consent for the transfer to be made and we will take steps to
                ensure that your personal data continues to receive a standard of protection that is at least comparable
                to that provided under the PDPA.
              </p>
            </div>

            {/* Data Protection Officer */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#B40101]">Data Protection Officer</h2>

              <p className="text-gray-300 leading-relaxed mb-4">
                <strong>20.</strong> You may contact our Data Protection Officer if you have any enquiries or feedback
                on our personal data protection policies and procedures, or if you wish to make any request, in the
                following manner:
              </p>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <p className="text-gray-300">
                  <strong>Email Address:</strong> hello@kwsingapore.com
                </p>
              </div>
            </div>

            {/* Miscellaneous */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#B40101]">Miscellaneous</h2>

              <p className="text-gray-300 leading-relaxed mb-4">
                This Notice applies in conjunction with any other notices, contractual clauses and consent clauses that
                apply in relation to the collection, use and disclosure of your personal data by us.
              </p>

              <p className="text-gray-300 leading-relaxed mb-4">
                We may revise this Notice from time to time without any prior notice. You may determine if any such
                revision has taken place by referring to the date on which this Notice was last updated. Your continued
                use of our services constitutes your acknowledgement and acceptance of such changes.
              </p>

              <p className="text-gray-300 leading-relaxed font-semibold">Effective date: 01/07/2025</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-gray-700">
            <Button
              className="bg-[#B40101] hover:bg-[#B40101]/90 text-white px-8 py-3 font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => (window.location.href = "/contact")}
            >
              Contact Us
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-3 font-semibold transition-all duration-300 bg-transparent"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      </section>
    </>
  );
} 