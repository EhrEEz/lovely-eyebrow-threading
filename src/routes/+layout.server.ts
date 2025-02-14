export function load() {
	return {
		status: 200,
		settings: {
			name: "Lovely Eyebrow Threading",
			socials: [
				{
					name: "Facebook",
					url: "https://www.facebook.com/lovelyeyebrowthreading",
					icon: "facebook",
				},
				{
					name: "Instagram",
					url: "https://www.instagram.com/lovelyeyebrowthreading",
					icon: "instagram",
				},
				{
					name: "Yelp",
					url: "https://www.yelp.com/biz/lovely-eyebrow-threading-houston",
					icon: "yelp",
				},
			],
			header_mini: true,
			cta: "contact-us",
			address: {
				address_1: "1260 Woodforest Blvd Ste 110",
				address_2: "Houston, TX 77015",
				map_link: "https://maps.app.goo.gl/K3VEFbNLu16DTe8Y8",
			},
			contact: {
				phone: "281-836-1318",
				email: "lovelyeyebrowthreading@gmail.com",
				hours: {
					weekdays: {
						timing: "10:00 AM - 7:30 PM",
						days: "Mondays - Saturdays",
					},
					weekends: { timing: "11:00 AM - 5:00 PM", days: "Sundays" },
				},
			},
			description:
				"We specialize in threading, waxing, and henna. We also offer eyelash extensions and facials. We are located in the Woodforest Shopping Center.",
		},
	};
}
