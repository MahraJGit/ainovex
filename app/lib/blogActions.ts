"use server";

import { revalidatePath } from "next/cache";

export async function revalidateBlogPages() {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
}
