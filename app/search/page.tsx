import type { Metadata } from "next";
import { Suspense } from "react";
import SearchExperience from "@/components/SearchExperience";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Vivid Network's articles, episodes, and stories."
};

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchExperience />
    </Suspense>
  );
}
