param(
  [string]$OutputPath = "patched-files-combined.md"
)

$files = @(
  "public/robots.txt",
  "public/sitemap.xml",
  "src/app/available-cars/[slug]/page.tsx",
  "src/app/available-cars/page.tsx",
  "src/app/blogs/BlogsContent.tsx",
  "src/app/blogs/[slug]/page.tsx",
  "src/app/blogs/page.tsx",
  "src/app/browse-cars/BrowseCarsClient.tsx",
  "src/app/browse-cars/page.tsx",
  "src/app/compliance-and-customs-handling-australia/page.tsx",
  "src/app/layout.tsx",
  "src/app/sitemap.ts",
  "src/app/sold-cars/[slug]/page.tsx",
  "src/app/sold-cars/page.tsx",
  "src/components/Hero3.tsx",
  "src/data/blogs.ts",
  "src/lib/structuredData.ts"
)

$root = (Get-Location).Path
$builder = New-Object System.Text.StringBuilder

[void]$builder.AppendLine("# Combined Patched Files")
[void]$builder.AppendLine()
[void]$builder.AppendLine("Generated from the SEO / routing patch set in this repository.")
[void]$builder.AppendLine()

foreach ($file in $files) {
  $path = Join-Path $root $file
  if (-not (Test-Path -LiteralPath $path)) {
    [void]$builder.AppendLine("## $file")
    [void]$builder.AppendLine()
    [void]$builder.AppendLine("_Missing file_")
    [void]$builder.AppendLine()
    continue
  }

  $content = Get-Content -LiteralPath $path -Raw
  [void]$builder.AppendLine("## $file")
  [void]$builder.AppendLine()
  [void]$builder.AppendLine('```')
  [void]$builder.Append($content)
  [void]$builder.AppendLine()
  [void]$builder.AppendLine('```')
  [void]$builder.AppendLine()
}

Set-Content -LiteralPath $OutputPath -Value $builder.ToString() -NoNewline
