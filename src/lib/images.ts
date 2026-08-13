export function optimizeCloudinaryImage(
  url: string | undefined,
  width: number,
) {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  if (/\/upload\/(?:[^/]*,)?(?:f_|q_|w_|c_)/.test(url)) {
    return url;
  }

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto:eco,w_${width},c_limit/`,
  );
}
