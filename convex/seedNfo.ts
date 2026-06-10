import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import {
  nfoCryptoWallets,
  nfoGames,
  nfoSiteSettings,
  nfoSupporters,
} from "./nfoReleases";

export const importNfoGames = internalMutation({
  args: {},
  returns: v.object({
    inserted: v.number(),
    updatedFeatured: v.number(),
  }),
  handler: async (ctx) => {
    const slugs = new Set<string>(nfoGames.map((g) => g.slug));
    let inserted = 0;
    let updatedFeatured = 0;

    const existing = await ctx.db.query("releases").collect();
    for (const release of existing) {
      if (slugs.has(release.slug)) {
        await ctx.db.delete("releases", release._id);
      } else if (release.featured) {
        await ctx.db.patch("releases", release._id, { featured: false });
        updatedFeatured++;
      }
    }

    for (const game of nfoGames) {
      await ctx.db.insert("releases", {
        slug: game.slug,
        title: game.title,
        format: game.format,
        releaseDate: game.releaseDate,
        crackDate: game.crackDate,
        releaseType: game.releaseType,
        genre: game.genre,
        protection: game.protection,
        description: game.description,
        developer: game.developer,
        isoHash: game.isoHash,
        installNote: "installNote" in game ? game.installNote : undefined,
        releaseSupporters: [...game.releaseSupporters],
        testers: "testers" in game ? [...game.testers] : undefined,
        downloadUrl: "#",
        featured: game.featured,
        sortOrder: game.sortOrder,
      });
      inserted++;
    }

    const existingSupporters = await ctx.db.query("supporters").collect();
    for (const supporter of existingSupporters) {
      await ctx.db.delete("supporters", supporter._id);
    }
    for (let i = 0; i < nfoSupporters.length; i++) {
      await ctx.db.insert("supporters", {
        name: nfoSupporters[i],
        sortOrder: i,
      });
    }

    const existingWallets = await ctx.db.query("cryptoWallets").collect();
    for (const wallet of existingWallets) {
      await ctx.db.delete("cryptoWallets", wallet._id);
    }
    for (let i = 0; i < nfoCryptoWallets.length; i++) {
      const wallet = nfoCryptoWallets[i];
      await ctx.db.insert("cryptoWallets", {
        symbol: wallet.symbol,
        address: wallet.address,
        sortOrder: i,
      });
    }

    const settings = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();

    if (settings) {
      await ctx.db.patch("siteSettings", settings._id, {
        installationSteps: [...nfoSiteSettings.installationSteps],
        notes: nfoSiteSettings.notes,
        contactEmail: nfoSiteSettings.contactEmail,
      });
    } else {
      await ctx.db.insert("siteSettings", {
        key: "main",
        installationSteps: [...nfoSiteSettings.installationSteps],
        notes: nfoSiteSettings.notes,
        contactEmail: nfoSiteSettings.contactEmail,
      });
    }

    return { inserted, updatedFeatured };
  },
});
