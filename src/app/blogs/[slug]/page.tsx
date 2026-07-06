import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogsContent from "../BlogsContent";
import { blogs, findBlogBySlug, findBlogByTitle, slugifyBlogSlug } from "@/data/blogs";
import JsonLd from "@/components/JsonLd";
import { buildBlogPostingSchema, buildBreadcrumbListSchema } from "@/lib/structuredData";

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

  const blog = findBlogBySlug(slug) ?? findBlogByTitle(slug);

  return (
    <>
      {blog ? (
        <>
          <JsonLd id={`blog-posting-schema-${slug}`} data={buildBlogPostingSchema(blog)} />
          <JsonLd
            id={`blog-breadcrumb-schema-${slug}`}
            data={buildBreadcrumbListSchema([
              { name: "Home", path: "/" },
              { name: "Blogs", path: "/blogs" },
              { name: blog.title, path: `/blogs/${slugifyBlogSlug(slug)}` },
            ])}
          />
        </>
      ) : null}
      <BlogsContent slug={slug} />
    </>
  );
}
