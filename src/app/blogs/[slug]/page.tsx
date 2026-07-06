import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import BlogsContent from "../BlogsContent";
import { blogs, findBlogBySlug, findBlogByTitle, slugifyBlogSlug } from "@/data/blogs";

type Params = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const blog = findBlogBySlug(slug) ?? findBlogByTitle(slug);

  if (!blog) {
    return {};
  }

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.description,
    alternates: {
      canonical: `/blogs/${slugifyBlogSlug(slug)}`,
    },
  };
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: slugifyBlogSlug(blog.slug ?? blog.title),
  }));
}

export default async function BlogDetailPage({ params }: Params) {
  const { slug } = await params;

  if (!findBlogBySlug(slug) && !findBlogByTitle(slug)) {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <BlogsContent />
    </Suspense>
  );
}
