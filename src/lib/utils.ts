export function formatSlug(text: string): string {
  return text
    .toLowerCase()
    // Normalize accented characters to their ASCII equivalents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Remove the word "slug" if it exists
    .replace(/\bslug\b/g, '')
    // Remove special characters except letters, numbers, spaces and hyphens
    .replace(/[^\w\s-]/g, '')
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove hyphens from start and end
    .replace(/^-+|-+$/g, '')
    // Trim any whitespace
    .trim();
} 