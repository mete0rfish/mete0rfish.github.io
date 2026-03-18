import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// 스키마 정의: 제목, 설명, 발행일, 태그 등
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.string().default('Uncategorized'),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).default([]),
	}),
});

export const collections = { blog };
