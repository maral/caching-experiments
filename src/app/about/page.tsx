import Image from "next/image";

export default function About() {
  console.log("About");
  return (
    <article className="flex-grow container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About Us</h1>
        <p className="text-gray-500 mb-8">
          Learn more about our journey and mission.
        </p>
        <div className="prose lg:prose-xl">
          <p>
            Welcome to our corner of the web! We are passionate about creating
            innovative solutions that empower developers and businesses to
            succeed. Our team is dedicated to exploring cutting-edge
            technologies and sharing knowledge with the community.
          </p>
          <p>
            From humble beginnings to where we are today, our journey has been
            fueled by curiosity, collaboration, and a commitment to excellence.
            We believe in the power of technology to transform lives and
            industries, and we strive to make a positive impact through our
            work.
          </p>
          <Image
            src="/team-photo.jpeg"
            alt="Our team collaborating in the office"
            width={800}
            height={450}
            className="rounded-lg my-8"
          />
          <p>
            Whether it&apos;s building scalable applications, contributing to
            open source, or mentoring the next generation of developers, we are
            driven by a shared vision of innovation and growth. Thank you for
            being part of our story—we&apos;re excited to continue this journey
            together.
          </p>
        </div>
      </div>
    </article>
  );
}
