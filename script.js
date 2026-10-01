const btn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
if (btn && nav) {
	btn.addEventListener("click", () => nav.classList.toggle("open"));
}
const form = document.querySelector("#contact-form");
if (form) {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const name = form.querySelector("[name=name]").value.trim();
		const email = form.querySelector("[name=email]").value.trim();
		const message = form.querySelector("[name=message]").value.trim();
		if (!name || !email || !message) {
			alert("Please complete your name, email and message.");
			return;
		}
		const subject = encodeURIComponent("Website enquiry from " + name);
		const body = encodeURIComponent(
			`Name: ${name}\nEmail: ${email}\nPhone: ${form.querySelector("[name=phone]").value}\n\n${message}`,
		);
		window.location.href = `mailto:andycpowell67@gmail.com?subject=${subject}&body=${body}`;
	});
}

// Gallery lightbox
const galleryLinks = [...document.querySelectorAll("[data-lightbox]")];
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
let galleryIndex = 0;

if (galleryLinks.length && lightbox && lightboxImage) {
	const showGalleryImage = (index) => {
		galleryIndex = (index + galleryLinks.length) % galleryLinks.length;

		const link = galleryLinks[galleryIndex];
		const img = link.querySelector("img");

		lightboxImage.src = link.href;
		lightboxImage.alt = img?.alt || "City Stone Masonry work";
		lightbox.hidden = false;
		document.body.style.overflow = "hidden";
	};

	const closeLightbox = () => {
		lightbox.hidden = true;
		document.body.style.overflow = "";
	};

	// Normal gallery clicks
	galleryLinks.forEach((link, index) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			showGalleryImage(index);
		});
	});

	// Close button
	document
		.querySelector(".lightbox-close")
		?.addEventListener("click", closeLightbox);

	// Previous / next buttons
	document
		.querySelector(".lightbox-prev")
		?.addEventListener("click", () => showGalleryImage(galleryIndex - 1));

	document
		.querySelector(".lightbox-next")
		?.addEventListener("click", () => showGalleryImage(galleryIndex + 1));

	// Click outside image to close
	lightbox.addEventListener("click", (e) => {
		if (e.target === lightbox) {
			closeLightbox();
		}
	});

	// Keyboard controls
	document.addEventListener("keydown", (e) => {
		if (lightbox.hidden) return;

		if (e.key === "Escape") closeLightbox();
		if (e.key === "ArrowLeft") showGalleryImage(galleryIndex - 1);
		if (e.key === "ArrowRight") showGalleryImage(galleryIndex + 1);
	});

	// Open a specific gallery image from a URL hash
	const openFromHash = () => {
		const hash = window.location.hash.substring(1);

		if (!hash) return;

		const index = galleryLinks.findIndex((link) => link.id === hash);

		if (index !== -1) {
			showGalleryImage(index);
		}
	};

	// Check hash when gallery page loads
	openFromHash();
}
