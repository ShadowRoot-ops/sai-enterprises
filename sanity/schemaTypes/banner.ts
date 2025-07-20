// sanity/schemas/banner.ts
const bannerSchema = {
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            { name: "alt", title: "Alt Text", type: "string" },
            { name: "title", title: "Image Title", type: "string" },
            { name: "order", title: "Display Order", type: "number" },
          ],
        },
      ],
    },
    {
      name: "autoSlideInterval",
      title: "Auto Slide Interval",
      type: "number",
      description: "Slide interval in seconds",
    },
    {
      name: "settings",
      title: "Settings",
      type: "object",
      fields: [
        {
          name: "showDots",
          title: "Show Dots",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "showArrows",
          title: "Show Arrows",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "enableAutoPlay",
          title: "Enable AutoPlay",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "pauseOnHover",
          title: "Pause On Hover",
          type: "boolean",
          initialValue: true,
        },
      ],
    },
  ],
};

export default bannerSchema;
