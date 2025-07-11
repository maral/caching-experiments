import { revalidateTag } from "next/cache";

export async function revalidateConfig() {
  "use server";
  revalidateTag("config");
}
