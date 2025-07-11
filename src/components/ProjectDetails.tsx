// import { unstable_cacheLife as cacheLife } from "next/cache";

export async function ProjectDetails({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolved = await params;
  console.log("ProjectDetails", resolved.projectId);
  return (
    <div className="project-details">
      <h1 className="text-2xl font-bold mb-4">
        Project <code>{resolved.projectId}</code>
      </h1>
      <p className="text-gray-700">This is a detailed view of the project.</p>
    </div>
  );
}
