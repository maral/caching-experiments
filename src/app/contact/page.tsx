import React from "react";

export default function Contact() {
  console.log("Contact");
  return (
    <article className="flex-grow container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-500 mb-8">
          We&apos;d love to hear from you! Reach out to us using the information
          below.
        </p>
        <div className="prose lg:prose-xl">
          <p>
            Whether you have questions, feedback, or just want to say hello, our
            team is here to help. Feel free to get in touch with us through any
            of the following methods:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:contact@ourcompany.com">contact@ourcompany.com</a>
            </li>
            <li>
              <strong>Phone:</strong> +1 (123) 456-7890
            </li>
            <li>
              <strong>Address:</strong> 123 Innovation Drive, Tech City, TX
              75001
            </li>
          </ul>

          <p>
            You can also follow us on social media to stay updated with our
            latest news and projects:
          </p>
          <ul>
            <li>
              <a
                href="https://twitter.com/ourcompany"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/company/ourcompany"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/ourcompany"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
          <p>
            Thank you for reaching out—we look forward to connecting with you!
          </p>
        </div>
      </div>
    </article>
  );
}
