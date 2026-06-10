import { v } from "convex/values";
import { adminMutation, adminQuery } from "../lib/customFunctions";

export const get = adminQuery({
  args: {},
  returns: v.object({
    installationSteps: v.array(v.string()),
    notes: v.string(),
    contactEmail: v.optional(v.string()),
  }),
  handler: async (ctx) => {
    const settings = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();

    return {
      installationSteps: settings?.installationSteps ?? [],
      notes: settings?.notes ?? "",
      contactEmail: settings?.contactEmail,
    };
  },
});

export const updateInstallationSteps = adminMutation({
  args: { steps: v.array(v.string()) },
  returns: v.null(),
  handler: async (ctx, args) => {
    const settings = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();

    if (settings) {
      await ctx.db.patch(settings._id, { installationSteps: args.steps });
    } else {
      await ctx.db.insert("siteSettings", {
        key: "main",
        installationSteps: args.steps,
        notes: "",
      });
    }
    return null;
  },
});

export const updateContactEmail = adminMutation({
  args: { contactEmail: v.optional(v.string()) },
  returns: v.null(),
  handler: async (ctx, args) => {
    const settings = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();

    const contactEmail = args.contactEmail?.trim() || undefined;

    if (settings) {
      await ctx.db.patch(settings._id, { contactEmail });
    } else {
      await ctx.db.insert("siteSettings", {
        key: "main",
        installationSteps: [],
        notes: "",
        contactEmail,
      });
    }
    return null;
  },
});
