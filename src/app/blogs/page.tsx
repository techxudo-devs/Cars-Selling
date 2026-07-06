import type { Metadata } from "next";
import { Suspense } from "react";

import BlogsContent from "./BlogsContent";
import { buildBreadcrumbListSchema } from "@/lib/structuredData";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Blogs",
    description:
        "Read the latest Elite Motor Cars blogs about imports, compliance, logistics, and premium vehicle buying across Australia.",
    alternates: {
        canonical: "/blogs",
    },
};

export default function BlogsPage() {
    return (
        <>
            <JsonLd
                id="blogs-breadcrumb-schema"
                data={buildBreadcrumbListSchema([
                    { name: "Home", path: "/" },
                    { name: "Blogs", path: "/blogs" },
                ])}
            />
            <Suspense fallback={null}>
                <BlogsContent />
            </Suspense>
        </>
    );
}
