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
