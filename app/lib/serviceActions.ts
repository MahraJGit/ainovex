"use server";

import { revalidatePath } from "next/cache";

export async function revalidateServicePages() {
  revalidatePath("/");
  revalidatePath("/about-us");
  revalidatePath("/services");
  revalidatePath("/services/[slug]", "page");
  revalidatePath("/sitemap.xml");
}
