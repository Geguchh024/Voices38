import { query } from "./_generated/server";
import { v } from "convex/values";
import {
  mapReleaseToPortfolio,
  releaseFieldsValidator,
} from "./lib/releaseValidator";

export const get = query({
  args: {},
  returns: v.object({
    releases: v.array(releaseFieldsValidator),
    archiveReleases: v.array(releaseFieldsValidator),
    projects: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        version: v.string(),
        progress: v.number(),
        eta: v.string(),
      })
    ),
    supporters: v.array(v.object({ name: v.string() })),
    cryptoWallets: v.array(
      v.object({ symbol: v.string(), address: v.string() })
    ),
    installationSteps: v.array(v.string()),
    notes: v.string(),
    contactEmail: v.optional(v.string()),
  }),
  handler: async (ctx) => {
    const featuredReleases = await ctx.db
      .query("releases")
      .withIndex("by_featured_and_order", (q) => q.eq("featured", true))
      .collect();

    const allReleases = await ctx.db
      .query("releases")
      .withIndex("by_featured_and_order")
      .collect();

    const projects = await ctx.db.query("projects").collect();
    const supporters = await ctx.db.query("supporters").collect();
    const cryptoWallets = await ctx.db.query("cryptoWallets").collect();

    const settings = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();

    return {
      releases: featuredReleases.map(mapReleaseToPortfolio),
      archiveReleases: allReleases.map(mapReleaseToPortfolio),
      projects: projects.map((p) => ({
        id: p.slug,
        name: p.name,
        version: p.version,
        progress: p.progress,
        eta: p.eta,
      })),
      supporters: supporters.map((s) => ({ name: s.name })),
      cryptoWallets: cryptoWallets.map((w) => ({
        symbol: w.symbol,
        address: w.address,
      })),
      installationSteps: settings?.installationSteps ?? [],
      notes: settings?.notes ?? "",
      contactEmail: settings?.contactEmail,
    };
  },
});

export const getStats = query({
  args: {},
  returns: v.object({
    totalReleases: v.number(),
    featuredReleases: v.number(),
    activeProjects: v.number(),
    supporters: v.number(),
    wallets: v.number(),
  }),
  handler: async (ctx) => {
    const allReleases = await ctx.db.query("releases").collect();
    const featured = allReleases.filter((r) => r.featured);
    const projects = await ctx.db.query("projects").collect();
    const supporters = await ctx.db.query("supporters").collect();
    const wallets = await ctx.db.query("cryptoWallets").collect();

    return {
      totalReleases: allReleases.length,
      featuredReleases: featured.length,
      activeProjects: projects.length,
      supporters: supporters.length,
      wallets: wallets.length,
    };
  },
});
