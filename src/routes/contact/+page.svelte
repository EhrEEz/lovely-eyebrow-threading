<script lang="ts">
	import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";
	import { Turnstile } from "svelte-turnstile";
	import Modal from "$lib/components/modal/Modal.svelte";
	import { z } from "zod";
	import "$lib/scss/components/_input.scss";

	import Button from "$lib/components/buttons/Button.svelte";
	import Social from "$lib/components/social/Social.svelte";
	import Seo from "$lib/components/seo/SEO.svelte";
	import { error } from "@sveltejs/kit";
	const { data } = $props();
	const siteSettings = $state(data.siteSettings);
	const page_data = $state(data.page_data);
	const media_url = $derived(data.media_url);
	const addresses = $derived(siteSettings.contact.address);
	const phoneNumbers = $derived(siteSettings.contact.phone_numbers);
	const emails = $derived(siteSettings.contact.emails);
	let backendErrors = $state<
		{
			message: string;
			path: [];
			name: string;
		}[]
	>([]);
	type ErrorType = {
		name?: string;
		email?: string;
		phone?: string;
		title?: string;
		request_phonecall?: string;
		message?: string;
	};
	let formLoading = $state(false);
	let fullName = $state("");
	let phone = $state("");
	let message = $state("");
	let email = $state("");
	let requestPhoneCall = $state(false);
	let title = $state("");
	let errors: ErrorType = $state({});
	const formData = $derived({
		name: fullName,
		email: email,
		title: title,
		phone_number: phone,
		message: message,
		requestPhoneCall: requestPhoneCall,
	});
	let showSuccessModal = $state(false);
	let showErrorModal = $state(false);
	let token_error = $state(false);
	let token_error_details = $state("");
	const stripHTML = (str: string) => str.replace(/<[^>]*>?/gm, "").trim();
	const schema = z.object({
		name: z.string().trim().min(1, "Full Name is required"),
		title: z.string().trim().min(1, "Title is required"),
		email: z.string().trim().min(1, "Email is required").email("Invalid Email"),
		phone: z.optional(
			z
				.string()
				.trim()
				.regex(/^[\+]?([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/ig, {
					message: "Invalid Phone Number",
				})
		),
		message: z
			.string()
			.trim()
			.min(1, "Message is required")
			.max(1000, {
				message: "Please keep your message shorter than 1000 characters",
			})
			.transform((val) => stripHTML(val)),
	});
	const handleSubmit = async (event: SubmitEvent) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement | null;
		const token = form ? (form.elements.namedItem("cf-turnstile-response") as HTMLInputElement)?.value : "";
		const result = schema.safeParse(formData);
		if (!result.success) {
			errors = result.error.flatten().fieldErrors as ErrorType;
		} else {
			errors = {};
			formLoading = true;
			const res = await fetch("/ep/submitContact", {
				method: "post",
				body: JSON.stringify({ token: token, ...result.data }),
				headers: {
					Accept: "application/json",
					"Content-type": "application/json",
				},
			});
			const json = await res.json();

			if (json.token_error) {
				token_error = true;
				token_error_details = json.error;
				showErrorModal = true;
				formLoading = false;
			} else {
				console.log(json.error);
				if (json.error) {
					backendErrors = json.error.error.details.errors;
					formLoading = false;
					showErrorModal = true;
				}
				if (json.data) {
					showSuccessModal = true;
					formLoading = false;
				}
			}
		}
	};
	$inspect(backendErrors);
</script>

<Seo pageSettings={page_data.page_info} {siteSettings} {media_url} />
<main>
	<section class="contact__section pt-48 lg:pt-64 lg:pb-24">
		<h1 class="sr-only">
			{page_data.page_info.page_title}
		</h1>
		<div class="container">
			<div class="lg:grid lg:grid-cols-12 lg:gap-16 2xl:gap-32">
				<div class="message__section lg:col-span-6 mb-24 lg:mb-0">
					<h2 class="text-6xl md:text-7xl mb-8 md:mb-16">
						{page_data.greeting_text}
					</h2>
					<form method="post" onsubmit={handleSubmit}>
						<div class="form-group xl:my-10" class:error={errors.name}>
							<label for="fullName">
								<input
									type="text"
									placeholder="Your Full Name"
									class="form-control"
									name="fullName"
									bind:value={fullName}
									data-input-value={fullName}
								/>
								<div class="form-label required mb-2">Full Name</div>

								<div class="error-message">{errors.name}</div>
							</label>
						</div>
						<div class="form-group xl:my-10" class:error={errors.email}>
							<label for="email">
								<input
									type="email"
									placeholder="Your Email Address"
									class="form-control"
									bind:value={email}
									data-input-value={email}
								/>
								<div class="form-label required mb-2">Email Address</div>
								<div class="error-message">{errors.email}</div>
							</label>
						</div>
						<div class="form-group xl:my-10" class:error={errors.phone}>
							<label for="phone">
								<input
									type="text"
									placeholder="Your Phone Number"
									class="form-control"
									name="phone"
									bind:value={phone}
									data-input-value={phone}
								/>
								<div class="form-label required mb-2">Phone Number</div>
								<div class="error-message">{errors.phone}</div>
							</label>
						</div>
						<div class="form-group xl:my-10" class:error={errors.title}>
							<label for="title">
								<input placeholder="Title" class="form-control" bind:value={title} data-input-value={title} />
								<div class="form-label required mb-2">Topic</div>
								<div class="error-message">{errors.title}</div>
							</label>
						</div>
						<div class="form-group text-area--2 xl:my-10" class:error={errors.message}>
							<label for="message">
								<textarea
									placeholder="Message"
									class="form-control"
									bind:value={message}
									rows={5}
									data-input-value={message}
								></textarea>
								<div class="form-label required mb-2">Message</div>
								<div class="error-message">{errors.message}</div>
							</label>
						</div>
						<div class="mb-3">
							<Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} theme="light" />
						</div>
						<div class="form-group">
							<Button disabled={formLoading} size="lg" type="submit">Send Message</Button>
						</div>
					</form>
					{#if siteSettings.booking_link}
						<div class="mt-32">
							<div class="uppercase text-lg">Or are you looking to book an appointment?</div>
							<Button variant="link" href={siteSettings.booking_link}>Book an Appointment</Button>
						</div>
					{/if}
				</div>
				<div class="details__section lg:col-span-6">
					<div class="lg:grid lg:grid-cols-2 gap-4 md:gap-8 lg:gap-0 mb-16">
						<div class="details__left mb-16 lg:mb-0">
							<div class="group nav__contacts mb-16">
								<h3 class="mb-2 underline decoration-2 decoration-primary underline-offset-4">Find us at</h3>
								{#if addresses && addresses.length > 0}
									{#each addresses as address}
										<address class="not-italic">
											{#if address.map_link}
												<a href={address.map_link} class="text-xl uppercase">
													{address.street} <br />{address.city}
													{address.zip_code}
												</a>
											{:else}
												<div class="text-xl uppercase">
													{address.street} <br />{address.city}
													{address.zip_code}
												</div>
											{/if}
										</address>
									{/each}
								{/if}
							</div>
							<div class="group nav__contacts">
								<h3 class="mb-2 underline decoration-2 decoration-primary underline-offset-4">Contact Us</h3>
								{#if phoneNumbers && phoneNumbers.length > 0}
									{#each phoneNumbers as phoneNumber}
										<div>
											<a
												href={`tel:${phoneNumber.phone_number}`}
												class="text-xl uppercase inline-flex items-center gap-4"
											>
												📞 {phoneNumber.phone_number}
											</a>
										</div>
									{/each}
								{/if}
								{#if emails && emails.length > 0}
									{#each emails as email}
										<div>
											<a href={`mailto:${email.email}`} class="text-xl uppercase inline-flex items-center gap-4">
												📧 {email.email}
											</a>
										</div>
									{/each}
								{/if}
								{#if !emails.length || !phoneNumbers.length || !addresses.length}
									<Button href="/contact">Contact Us</Button>
								{/if}
							</div>
						</div>
						<div class="details__right">
							{#if siteSettings.opening_hours && siteSettings.opening_hours.length > 0}
								<div class="group nav__contacts" style="--delay:{0.45}s;">
									<h3 class="mb-4 underline decoration-2 decoration-primary underline-offset-4">Our Hours</h3>
									<ul class="flex flex-col gap-2">
										{#each siteSettings.opening_hours as openingHour}
											<li class="uppercase mb-0">
												<div class="text-lg">
													{openingHour.day_range}
												</div>
												<div class="text-xl font-medium">
													{openingHour.opening_timing}
												</div>
											</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					</div>
					{#if siteSettings.social_media}
						<div class="socials__wrapper flex flex-col gap-3 mb-16 lg:mb-28">
							<div class="uppercase text-xl">Find us on Social Media</div>
							<div class="flex gap-12 items-center flex-grow basis-0 justify-start">
								{#if siteSettings.social_media.instagram}
									<a
										class="social__link hover:opacity-80"
										href={siteSettings.social_media.instagram}
										title={`${siteSettings.name}'s Instagram Page`}
										target="_blank"
									>
										<Social name={"instagram"} height={24} width={24} color="hsl(316, 89%, 83%)" />
									</a>
								{/if}
								{#if siteSettings.social_media.facebook}
									<a
										class="social__link hover:opacity-80"
										href={siteSettings.social_media.facebook}
										title={`${siteSettings.name}'s facebook Page`}
										target="_blank"
									>
										<Social name={"facebook"} height={24} width={24} color="hsl(316, 89%, 83%)" />
									</a>
								{/if}
								{#if siteSettings.social_media.yelp}
									<a
										class="social__link hover:opacity-80"
										href={siteSettings.social_media.yelp}
										title={`${siteSettings.name}'s yelp Page`}
										target="_blank"
									>
										<Social name={"yelp"} height={24} width={24} color="hsl(316, 89%, 83%)" />
									</a>
								{/if}
								{#if siteSettings.social_media.youtube}
									<a
										class="social__link hover:opacity-80"
										href={siteSettings.social_media.youtube}
										title={`${siteSettings.name}'s youtube Page`}
										target="_blank"
									>
										<Social name={"youtube"} height={24} width={24} color="hsl(316, 89%, 83%)" />
									</a>
								{/if}
								{#if siteSettings.social_media.x}
									<a
										class="social__link hover:opacity-80"
										href={siteSettings.social_media.x}
										title={`${siteSettings.name}'s x Page`}
										target="_blank"
									>
										<Social name={"x"} height={24} width={24} color="hsl(316, 89%, 83%)" />
									</a>
								{/if}
								{#if siteSettings.social_media.tiktok}
									<a
										class="social__link hover:opacity-80"
										href={siteSettings.social_media.tiktok}
										title={`${siteSettings.name}'s tiktok Page`}
										target="_blank"
									>
										<Social name={"tiktok"} height={24} width={24} color="hsl(316, 89%, 83%)" />
									</a>
								{/if}
								{#if siteSettings.social_media.linkedin}
									<a
										class="social__link hover:opacity-80"
										href={siteSettings.social_media.linkedin}
										title={`${siteSettings.name}'s linkedin Page`}
										target="_blank"
									>
										<Social name={"linkedin"} height={24} width={24} color="hsl(316, 89%, 83%)" />
									</a>
								{/if}
								{#if siteSettings.social_media.pinterest}
									<a
										class="social__link hover:opacity-80"
										href={siteSettings.social_media.pinterest}
										title={`${siteSettings.name}'s pinterest Page`}
										target="_blank"
									>
										<Social name={"pinterest"} height={24} width={24} color="hsl(316, 89%, 83%)" />
									</a>
								{/if}
								{#if siteSettings.social_media.threads}
									<a
										class="social__link hover:opacity-80"
										href={siteSettings.social_media.threads}
										title={`${siteSettings.name}'s threads Page`}
										target="_blank"
									>
										<Social name={"threads"} height={24} width={24} color="hsl(316, 89%, 83%)" />
									</a>
								{/if}
							</div>
						</div>
					{/if}
					<div class="contact__image w-full">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9514.944083615488!2d-95.19691652095952!3d29.78877851806751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640a525274086ab%3A0x49da3ffb50c9bb69!2sLovely%20Eyebrow%20Threading!5e0!3m2!1sen!2snp!4v1750850746357!5m2!1sen!2snp"
							width="100%"
							height="100%"
							style="border:0;"
							loading="lazy"
							class="aspect-[5/6]"
							referrerpolicy="no-referrer-when-downgrade"
							title="Lovely Eyebrow Threading"
						></iframe>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<Modal bind:showModal={showSuccessModal}>
	{#snippet header()}
		<h5 class="heading-4 pe-lg-4 font-sans text-2xl">Message Successfully Sent</h5>
	{/snippet}
	{#snippet children()}
		<div class="text-xl text-text-light">
			<p>We will get back to you as soon as possible.</p>
		</div>
	{/snippet}
</Modal>
<Modal bind:showModal={showErrorModal}>
	{#snippet header()}
		<h5 class="heading-5 pe-16 error-300 font-sans text-2xl">Error Sending Message</h5>
	{/snippet}
	{#snippet children()}
		<div class="text-lg mb-4">
			<p>Please Try again</p>
		</div>
		{#if token_error}
			<div class="regular-16 error-300 bg-error-100 py-2 px-3 mt-lg-1 rounded-1">
				<p>Error detail: {token_error_details ? token_error_details : "Token Error"}</p>
			</div>
		{:else if backendErrors.length > 0}
			<div class="text-md text-red-950 bg-red-100 py-2 px-3 mt-lg-1 rounded-1">
				<p>Error details:</p>
				{#each backendErrors as error}
					<p>{error.message}</p>
					<p>{error.path.toString()}</p>
				{/each}
			</div>
		{/if}
	{/snippet}
</Modal>
