export type TSiteInformations =
  | {
      id: number;
      phone1: string | undefined;
      phone2: string | undefined;
      infoEmail: string | undefined;
      salesEmail: string | undefined;
      supportEmail: string | undefined;
      address: string | undefined;
      city: string | undefined;
      state: string | undefined;
      country: string | undefined;
      zipCode: string | undefined;
      logo: string | undefined;
      darkLogo: string | undefined;
      favicon: string | undefined;
      banner: string | undefined;
      bannerTitle: string | undefined;
      bannerDescription: string | undefined;
      bannerKeys: string | undefined;
      aboutUs: string | undefined;
      createdAt: string;
      updatedAt: string | undefined;
    }
  | undefined;

export type TCategory =
  | {
      id: number;
      name: string | undefined;
      description: string | undefined;
      slug: string;
      createdAt: string;
      image: string | undefined;
      tags: TTag[];
      seo: TSeo | undefined;
      posts: TPost[];
    }
  | undefined;
export type TTag = {};
export type TPost =
  | {
      id: number;
      title: string | null;
      slug: string;
      description: string | null;
      status: string | null;
      h1: string | null;
      userId: number | null;
      categoryId: number;
      createdAt: string;
      content: string | null;
      seo: TSeo | undefined;
      user: TUser | undefined;
      images: TImage[];
      specialSections: TSection[];
      comments: TComment[];
      tags: TTag[];
    }
  | undefined;
export type TUser = {
  id: number;
  name: string | undefined;
  email: string | undefined;
  role: string | undefined;
  image: string | undefined;
  createdAt: string;
};
export type TImage = {
  id: number;
  url: string;
  alt: string;
  postId: number;
  createdAt: string;
};
export type TSection = {
  id: number;
  title: string | null;
  content: string | null;
  type: string;
  postId: number;
  createdAt: string;
};
export type TComment = {
  id: number;
  comment: string | null;
  postId: number;
  userId: number;
  createdAt: string;
  user: TUser | undefined;
};
export type TSeo = {
  id: number;
  postId: number | undefined;
  categoryId: number | undefined;
  tagId: number | undefined;
  metaTitle: string | undefined;
  metaDescription: string | undefined;
  metaKeywords: string | undefined;
  canonical: string | undefined;
  schema: string | undefined;
  ogTitle: string | undefined;
  ogDescription: string | undefined;
  ogImage: string | null | File | undefined;
  createdAt: string;
  updatedAt: string | undefined;
};
