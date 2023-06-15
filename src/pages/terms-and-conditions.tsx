import PublicLayout from "@/components/layouts/PublicLayout";

const TermsAndConditions = () => {
  return (
    <PublicLayout>
      <div className="py-16">
        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Terms & Conditions
        </h1>

        <div className="mx-auto mt-4 max-w-2xl">
          <ol className="mb-4 list-outside list-decimal">
            <li className="mb-2">
              By using our services, you agree to abide by these terms and
              conditions.
            </li>
            <li className="mb-2">
              We reserve the right to modify or update these terms at any time
              without prior notice.
            </li>
            <li className="mb-2">
              You are solely responsible for any content or information that you
              share with us.
            </li>
            <li className="mb-2">
              We respect your privacy and will not share your personal
              information with any third-party without your consent.
            </li>
            <li className="mb-2">
              You agree to use our services for lawful purposes only and not
              engage in any illegal activities.
            </li>
            <li className="mb-2">
              We are not liable for any damages or losses that may occur from
              your use of our services.
            </li>
            <li className="mb-2">
              We reserve the right to terminate your access to our services at
              any time for any reason.
            </li>
          </ol>
          <p>
            If you have any questions or concerns about these terms, please
            don&apos;t hesitate to contact us. Thanks for choosing us, and we
            look forward to working with you!
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default TermsAndConditions;
