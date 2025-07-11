import Image from "next/image";

export function Article() {
  console.log("Article");
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Understanding Caching in Next.js
      </h1>
      <p className="text-gray-500 mb-8">Posted on July 26, 2023 by Jane Doe</p>
      <div className="prose lg:prose-xl">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
          quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
          mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        </p>
        <p>
          Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Curabitur
          sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur
          tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.
          Maecenas mattis.
        </p>
        <Image
          src="/photo-1517694712202-14dd9538aa97.jpeg"
          alt="A laptop with code on the screen"
          width={800}
          height={450}
          className="rounded-lg my-8"
          priority={true}
        />
        <p>
          Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in
          lacus. Curabitur sit amet mauris. Morbi in dui quis est pulvinar
          ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras
          metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque
          nisl felis, venenatis tristique, dignissim in, ultrices sit amet,
          augue.
        </p>
      </div>
    </div>
  );
}
