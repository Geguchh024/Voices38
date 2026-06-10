import { internalMutation, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { portfolioSeedData } from "./seedData";

const releaseValidator = v.object({
  id: v.string(),
  title: v.string(),
  format: v.string(),
  releaseDate: v.string(),
  genre: v.string(),
  protection: v.string(),
  downloadUrl: v.optional(v.string()),
});

const projectValidator = v.object({
  id: v.string(),
  name: v.string(),
  version: v.string(),
  progress: v.number(),
  eta: v.string(),
});

async function seedPortfolio(
  ctx: MutationCtx,
  args: {
    releases: Array<{
      id: string;
      title: string;
      format: string;
      releaseDate: string;
      genre: string;
      protection: string;
      downloadUrl?: string;
    }>;
    archiveReleases: Array<{
      id: string;
      title: string;
      format: string;
      releaseDate: string;
      genre: string;
      protection: string;
      downloadUrl?: string;
    }>;
    projects: Array<{
      id: string;
      name: string;
      version: string;
      progress: number;
      eta: string;
    }>;
    supporters: Array<{ name: string }>;
    cryptoWallets: Array<{ symbol: string; address: string }>;
    installationSteps: string[];
    notes: string;
  }
) {
  const featuredSlugs = new Set(args.releases.map((r) => r.id));

  const seenSlugs = new Set<string>();
  let order = 0;

  for (const release of args.archiveReleases) {
    if (seenSlugs.has(release.id)) continue;
    seenSlugs.add(release.id);

    await ctx.db.insert("releases", {
      slug: release.id,
      title: release.title,
      format: release.format,
      releaseDate: release.releaseDate,
      genre: release.genre,
      protection: release.protection,
      downloadUrl: release.downloadUrl,
      featured: featuredSlugs.has(release.id),
      sortOrder: order++,
    });
  }

  for (const release of args.releases) {
    if (seenSlugs.has(release.id)) continue;
    seenSlugs.add(release.id);

    await ctx.db.insert("releases", {
      slug: release.id,
      title: release.title,
      format: release.format,
      releaseDate: release.releaseDate,
      genre: release.genre,
      protection: release.protection,
      downloadUrl: release.downloadUrl,
      featured: true,
      sortOrder: order++,
    });
  }

  for (let i = 0; i < args.projects.length; i++) {
    const p = args.projects[i];
    await ctx.db.insert("projects", {
      slug: p.id,
      name: p.name,
      version: p.version,
      progress: p.progress,
      eta: p.eta,
      sortOrder: i,
    });
  }

  for (let i = 0; i < args.supporters.length; i++) {
    await ctx.db.insert("supporters", {
      name: args.supporters[i].name,
      sortOrder: i,
    });
  }

  for (let i = 0; i < args.cryptoWallets.length; i++) {
    const w = args.cryptoWallets[i];
    await ctx.db.insert("cryptoWallets", {
      symbol: w.symbol,
      address: w.address,
      sortOrder: i,
    });
  }

  await ctx.db.insert("siteSettings", {
    key: "main",
    installationSteps: args.installationSteps,
    notes: args.notes,
  });
}

export const seedDefault = internalMutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    await seedPortfolio(ctx, {
      releases: [...portfolioSeedData.releases],
      archiveReleases: [...portfolioSeedData.archiveReleases],
      projects: [...portfolioSeedData.projects],
      supporters: [...portfolioSeedData.supporters],
      cryptoWallets: [...portfolioSeedData.cryptoWallets],
      installationSteps: [...portfolioSeedData.installationSteps],
      notes: portfolioSeedData.notes,
    });
    return null;
  },
});

export const seedFromJson = internalMutation({
  args: {
    releases: v.array(releaseValidator),
    archiveReleases: v.array(releaseValidator),
    projects: v.array(projectValidator),
    supporters: v.array(v.object({ name: v.string() })),
    cryptoWallets: v.array(
      v.object({ symbol: v.string(), address: v.string() })
    ),
    installationSteps: v.array(v.string()),
    notes: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await seedPortfolio(ctx, args);
    return null;
  },
});
