/** Преобразует ссылку YouTube в формат для iframe embed. */
export function toYoutubeEmbed(url: string): string {
  if (!url) return url;

  if (url.includes("/embed/")) return url;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  return url;
}
