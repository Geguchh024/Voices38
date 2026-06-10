import { v } from "convex/values";
import { adminMutation, adminQuery } from "../lib/customFunctions";

export const list = adminQuery({
  args: {},
  returns: v.object({
    wallets: v.array(
      v.object({
        _id: v.id("cryptoWallets"),
        symbol: v.string(),
        address: v.string(),
        sortOrder: v.number(),
      })
    ),
    notes: v.string(),
  }),
  handler: async (ctx) => {
    const wallets = await ctx.db.query("cryptoWallets").collect();
    const settings = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();

    return {
      wallets: wallets.map((w) => ({
        _id: w._id,
        symbol: w.symbol,
        address: w.address,
        sortOrder: w.sortOrder,
      })),
      notes: settings?.notes ?? "",
    };
  },
});

export const upsertWallet = adminMutation({
  args: {
    id: v.optional(v.id("cryptoWallets")),
    symbol: v.string(),
    address: v.string(),
  },
  returns: v.id("cryptoWallets"),
  handler: async (ctx, args) => {
    if (args.id) {
      const wallet = await ctx.db.get(args.id);
      if (!wallet) throw new Error("Wallet not found");
      await ctx.db.patch(args.id, {
        symbol: args.symbol,
        address: args.address,
      });
      return args.id;
    }
    const all = await ctx.db.query("cryptoWallets").collect();
    const sortOrder = all.length;
    return await ctx.db.insert("cryptoWallets", {
      symbol: args.symbol,
      address: args.address,
      sortOrder,
    });
  },
});

export const removeWallet = adminMutation({
  args: { id: v.id("cryptoWallets") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return null;
  },
});

export const updateNotes = adminMutation({
  args: { notes: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const settings = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", "main"))
      .unique();

    if (settings) {
      await ctx.db.patch(settings._id, { notes: args.notes });
    } else {
      await ctx.db.insert("siteSettings", {
        key: "main",
        installationSteps: [],
        notes: args.notes,
      });
    }
    return null;
  },
});
