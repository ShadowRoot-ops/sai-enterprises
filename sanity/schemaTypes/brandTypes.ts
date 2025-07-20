import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const brandType = defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Brand Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    // Add category reference field
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      description: "Select which categories this brand belongs to",
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "image",
      categories: "categories",
    },
    prepare(selection) {
      const { title, subtitle, media, categories } = selection;
      const categoryCount = categories?.length || 0;
      return {
        title: title,
        subtitle:
          subtitle ||
          `${categoryCount} categor${categoryCount === 1 ? "y" : "ies"}`,
        media: media,
      };
    },
  },
});
