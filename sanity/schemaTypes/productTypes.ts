import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "price",
      title: "Price (₹)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "discount",
      title: "Discount (%)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      description: "Select categories from your category schema",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: { type: "brand" },
    }),
    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Hot", value: "hot" },
          { title: "Sale", value: "sale" },
          { title: "Featured", value: "featured" },
          { title: "Limited Edition", value: "limited" },
        ],
      },
    }),
    defineField({
      name: "productType",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          // Stationery Items
          { title: "Pen", value: "pen" },
          { title: "Pencil", value: "pencil" },
          { title: "Marker", value: "marker" },
          { title: "Highlighter", value: "highlighter" },
          { title: "Notebook", value: "notebook" },
          { title: "Diary", value: "diary" },
          { title: "Planner", value: "planner" },
          { title: "Sticky Notes", value: "sticky_notes" },
          { title: "Eraser", value: "eraser" },
          { title: "Ruler", value: "ruler" },
          { title: "Stapler", value: "stapler" },
          { title: "Paper Clips", value: "paper_clips" },
          { title: "Binder", value: "binder" },
          { title: "File Folder", value: "file_folder" },
          { title: "Calculator", value: "calculator" },
          { title: "Scissors", value: "scissors" },
          { title: "Glue", value: "glue" },
          { title: "Tape", value: "tape" },

          // Sports Items
          { title: "Ball", value: "ball" },
          { title: "Bat", value: "bat" },
          { title: "Racket", value: "racket" },
          { title: "Sports Shoes", value: "sports_shoes" },
          { title: "Jersey", value: "jersey" },
          { title: "Shorts", value: "shorts" },
          { title: "Gloves", value: "gloves" },
          { title: "Helmet", value: "helmet" },
          { title: "Knee Pads", value: "knee_pads" },
          { title: "Water Bottle", value: "water_bottle" },
          { title: "Gym Bag", value: "gym_bag" },
          { title: "Whistle", value: "whistle" },
          { title: "Stopwatch", value: "stopwatch" },
          { title: "Jump Rope", value: "jump_rope" },
          { title: "Yoga Mat", value: "yoga_mat" },

          // Gifts
          { title: "Gift Card", value: "gift_card" },
          { title: "Gift Box", value: "gift_box" },
          { title: "Greeting Card", value: "greeting_card" },
          { title: "Photo Frame", value: "photo_frame" },
          { title: "Keychain", value: "keychain" },
          { title: "Mug", value: "mug" },
          { title: "T-Shirt", value: "t_shirt" },
          { title: "Cushion", value: "cushion" },
          { title: "Wall Art", value: "wall_art" },
          { title: "Candle", value: "candle" },
          { title: "Jewelry", value: "jewelry" },
          { title: "Watch", value: "watch" },
          { title: "Toy", value: "toy" },
          { title: "Puzzle", value: "puzzle" },
          { title: "Board Game", value: "board_game" },

          // Cosmetics
          { title: "Face Cream", value: "face_cream" },
          { title: "Face Wash", value: "face_wash" },
          { title: "Moisturizer", value: "moisturizer" },
          { title: "Sunscreen", value: "sunscreen" },
          { title: "Serum", value: "serum" },
          { title: "Toner", value: "toner" },
          { title: "Cleanser", value: "cleanser" },
          { title: "Face Mask", value: "face_mask" },
          { title: "Foundation", value: "foundation" },
          { title: "Concealer", value: "concealer" },
          { title: "Lipstick", value: "lipstick" },
          { title: "Lip Balm", value: "lip_balm" },
          { title: "Mascara", value: "mascara" },
          { title: "Eyeliner", value: "eyeliner" },
          { title: "Eyeshadow", value: "eyeshadow" },
          { title: "Blush", value: "blush" },
          { title: "Nail Polish", value: "nail_polish" },
          { title: "Perfume", value: "perfume" },
          { title: "Body Lotion", value: "body_lotion" },
          { title: "Shampoo", value: "shampoo" },
          { title: "Conditioner", value: "conditioner" },
          { title: "Hair Oil", value: "hair_oil" },
          { title: "Hair Mask", value: "hair_mask" },

          // General
          { title: "Others", value: "others" },
        ],
      },
      description: "Select the specific type of product",
    }),
    defineField({
      name: "subcategory",
      title: "Subcategory",
      type: "string",
      description: "Optional subcategory for more specific classification",
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Product",
      type: "boolean",
      description: "Toggle to Featured on or off",
      initialValue: false,
    }),
    defineField({
      name: "weight",
      title: "Weight (grams)",
      type: "number",
      description: "Product weight for shipping calculations",
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "object",
      fields: [
        defineField({
          name: "length",
          title: "Length (cm)",
          type: "number",
        }),
        defineField({
          name: "width",
          title: "Width (cm)",
          type: "number",
        }),
        defineField({
          name: "height",
          title: "Height (cm)",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string", name: "tag", title: "Tag" }],
      description: "Add tags for better searchability",
      options: {
        layout: "tags",
      },
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "images",
      subtitle: "price",
      productType: "productType",
      categories: "categories",
    },
    prepare(selection) {
      const { title, subtitle, media, productType, categories } = selection;
      const image = media && media[0];
      const categoryCount = categories?.length || 0;
      return {
        title,
        subtitle: `₹${subtitle} • ${productType || "No type"} • ${categoryCount} categor${categoryCount === 1 ? "y" : "ies"}`,
        media: image,
      };
    },
  },
});
