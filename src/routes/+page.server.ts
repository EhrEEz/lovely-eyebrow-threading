export function load({ params }) {
	return {
		status: 200,
		page: {
			name: "Lovely Eyebrow Threading",
			address: {
				address_1: "1260 Woodforest Blvd Ste 110",
				address_2: "Houston, TX 77015",
			},
			title: "Brows Flawless",
			subtitle: "Confidence Oozing",
			description:
				"We specialize in threading, waxing, and henna. We also offer eyelash extensions and facials. We are located in the Woodforest Shopping Center.",
			hero_image1: "header-1.png",
			hero_image2: "header-2.png",
		},
		services: {
			title: "Services beyond your expectations",
			items: [
				{
					name: "Eyebrow Threading",
					image: "eyebrow-threading.png",
					slug: "eyebrow-threading",
				},
				{
					name: "Henna Tattoo",
					image: "henna-tattoo.png",
					slug: "henna-tattoo",
				},
				{
					name: "Facial Therapy",
					image: "facial-therapy.png",
					slug: "Facial Therapy",
				},
				{
					name: "Eyelash Extensions",
					image: "eyelash-extensions.png",
					slug: "eyelash-extensions",
				},
			],
		},
		testimonials: {
			title: "Our client’s words",
			items: [
				{
					author: "Sarah M.",
					description:
						"I’ve never trusted anyone with my brows until I found this place! The attention to detail is amazing, and I always leave with perfect arches. Highly recommend!",
				},
				{
					author: "Cynthia L.",
					description:
						"I had single lashes done for a wedding, and I’ve never felt more beautiful! They looked so natural yet added the perfect touch of glam. Amazing work!",
				},
				{
					author: "James H.",
					description:
						"As a guy, I was nervous about getting my brows done, but the team here made it so easy. My brows look clean and natural—not overdone. I’ll be back for sure.",
				},

				{
					author: "Emily R.",
					description:
						"Quick, professional, and painless! Their waxing services are fantastic, and the results last longer than anywhere else I’ve been.",
				},
				{
					author: "Jessica T.",
					description:
						"This was the most relaxing facial I’ve ever had! My skin feels so refreshed and glowing. The staff made me feel so comfortable throughout the process.",
				},
				{
					author: "Aisha K.",
					description:
						"The henna designs here are absolutely stunning! I came in for a special event, and the artist created a beautiful custom design that got so many compliments. I'll definitely be back.",
				},
			],
		},
		blogs: {
			title: "Latest Articles",
			articles: [
				{
					title: "Do Something beautiful this holi",
					date: "December 01, 2025 | Monday",
					tag: "Festive",
					short_description:
						"I had single lashes done for a wedding, and I’ve never felt more beautiful! They looked so natural yet added the perfect touch of glam. Amazing work!",
					slug: "article-1",
					image: "/images/blogs/article-1.png",
				},

				{
					title: "Daily eyebrow makeup",
					date: "November 28, 2025 | Thursday",
					tag: "Tutorial",
					short_description:
						"I had single lashes done for a wedding, and I’ve never felt more beautiful! They looked so natural yet added the perfect touch of glam. Amazing work!",
					slug: "article-3",
					image: "/images/blogs/article-3.png",
				},
				{
					title: "Facial health with makeup",
					date: "November 24, 2025 | Sunday",
					tag: "Informational",
					short_description:
						"I had single lashes done for a wedding, and I’ve never felt more beautiful! They looked so natural yet added the perfect touch of glam. Amazing work!",
					slug: "article-2",
					image: "/images/blogs/article-2.png",
				},
			],
		},
		message: {
			text: "Have Questions? Ready to Book an Appointment?",
			image: "message.png",
			link: {
				text: "Leave a message",
				slug: "/contact",
			},
		},
	};
}
