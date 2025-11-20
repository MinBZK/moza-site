import { Container } from "../components/layout/Container.tsx";

const Contact = () => {
  return (
    <Container>
      <div className="mx-auto max-w-3xl py-8">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">Contact Us</h1>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <p className="mb-4 text-lg text-gray-700">
            We're here to help you navigate through government services and
            digital solutions. Our dedicated team is committed to providing the
            support you need for MijnOverheid Zakelijk services.
          </p>

          <p className="mb-4 text-lg text-gray-700">
            Whether you have questions about our portal, need technical
            assistance, or want to learn more about our services, we're just an
            email away.
          </p>

          <div className="mt-8 rounded-md bg-sky-50 p-6 text-center">
            <p className="mb-2 text-sm text-sky-900">Reach out to us at</p>
            <a
              href="mailto:contact@mijnoverheid-zakelijk.nl"
              className="inline-block text-2xl font-semibold text-sky-700 hover:text-sky-800 hover:underline"
            >
              contact@mijnoverheid-zakelijk.nl
            </a>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Response Time
          </h2>
          <p className="text-gray-700">
            We strive to respond to all inquiries within 1-2 business days. For
            urgent matters, please indicate this in your email subject line.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
