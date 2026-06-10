import { v } from "convex/values";

export const releaseFieldsValidator = v.object({
  id: v.string(),
  title: v.string(),
  format: v.string(),
  releaseDate: v.string(),
  shopReleaseDate: v.optional(v.string()),
  releaseType: v.optional(v.string()),
  genre: v.string(),
  protection: v.string(),
  developer: v.optional(v.string()),
  installNote: v.optional(v.string()),
  releaseSupporters: v.optional(v.array(v.string())),
  testers: v.optional(v.array(v.string())),
  downloadUrl: v.optional(v.string()),
});

export function mapReleaseToPortfolio(release: {
  slug: string;
  title: string;
  format: string;
  releaseDate: string;
  shopReleaseDate?: string;
  releaseType?: string;
  genre: string;
  protection: string;
  developer?: string;
  installNote?: string;
  releaseSupporters?: string[];
  testers?: string[];
  downloadUrl?: string;
}) {
  return {
    id: release.slug,
    title: release.title,
    format: release.format,
    releaseDate: release.releaseDate,
    shopReleaseDate: release.shopReleaseDate,
    releaseType: release.releaseType,
    genre: release.genre,
    protection: release.protection,
    developer: release.developer,
    installNote: release.installNote,
    releaseSupporters: release.releaseSupporters,
    testers: release.testers,
    downloadUrl: release.downloadUrl,
  };
}
