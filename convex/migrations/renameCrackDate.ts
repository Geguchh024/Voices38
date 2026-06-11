import { v } from "convex/values";
import { internalMutation } from "../_generated/server";

/** One-time migration: copy legacy shopReleaseDate into crackDate. */
export const migrateShopReleaseDateToCrackDate = internalMutation({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    const releases = await ctx.db.query("releases").collect();
    let migrated = 0;

    for (const release of releases) {
      const legacy = release as typeof release & { shopReleaseDate?: string };
      if (legacy.shopReleaseDate && !release.crackDate) {
        await ctx.db.patch("releases", release._id, {
          crackDate: legacy.shopReleaseDate,
        });
        migrated += 1;
      }
    }

    return migrated;
  },
});
