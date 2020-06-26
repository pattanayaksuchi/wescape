const products = [
  {
    id: 1,
    name: "iPhone X",
    description:
      "The iPhone X was Apple's flagship 10th anniversary iPhone featuring a 5.8-inch OLED display, facial recognition and 3D camera functionality, a glass body, and an A11 Bionic processor. Launched November 3, 2017, discontinued with the launch of the iPhone XR, XS, and XS Max.",
    category: "Mobiles",
    slug: "iphone-x",
  },
  {
    id: 2,
    name: "Samsung Galaxy Note 10 Plus",
    description:
      "Samsung Galaxy Note 10 Plus (Galaxy Note 10 Pro) smartphone has a Dynamic AMOLED display. It measures 162.3 mm x 77.2 mm x 7.9 mm and weighs 196 grams. The screen has a resolution of 1440 x 3040 pixels and 495 ppi pixel density. It has an aspect ratio of 19:9 and screen-to-body ratio of 91.66 %.",
    category: "Mobiles",
    slug: "samsung-galaxy-note-10-plus",
  },
  {
    id: 3,
    name: "One Plus 7T",
    description:
      "The OnePlus 7T offers three rear cameras - a standard 48-megapixel one, a wide-angle one, and a 2X optical zoom one - along with the brand new Qualcomm Snapdragon 855 processor, a 90Hz screen, and frosted glass rear panel.",
    category: "Mobiles",
    slug: "one-plus-7t",
  },
  {
    id: 4,
    name: "Pringles",
    description:
      "Pringles is a brand of potato and wheat-based stackable snack chips, owned by the Kellogg Company. The snack was originally developed by Procter & Gamble (P&G), who first sold the product in 1967 - creating the stackable chips product category.",
    category: "FMCG",
    slug: "pringles",
  },
  {
    id: 5,
    name: "Lays",
    description:
      "Always fresh tasting, crispy and delicious, each bag of Lay's Classic® potato chips is made with specially selected potatoes and to the highest quality standards. Crispy and light tasting, Lay's Classic® potato chips were designed to put a smile on everyone's face, which makes them the perfect snack to share.",
    category: "FMCG",
    slug: "lays",
  },
];

const newProduct = {
  id: null,
  name: "",
  category: "",
};

module.exports = {
  newProduct,
  products,
};
