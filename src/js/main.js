const nav = document.querySelector(".nav");
const burgerBtn = document.querySelector(".nav__btn-mobile-burger");
const closeBtn = document.querySelector(".nav__btn-mobile-close");
const ulMobile = document.querySelector(".nav__mobile-list");
const mobileMenuItem = document.querySelectorAll(".nav__mobile-item");
const accordionBox = document.querySelectorAll(".faq__accordion-box");
const footerYear = document.querySelector('.footer__year')

// ========= NAVIGATION =============
const navDesktop = document.querySelectorAll(".nav__desktop-link");
const sections = document.querySelectorAll("section");

const options = {
	threshold: [0.7],
};

const handleScrollspy = (entries) => {
	entries.forEach((entry) => {
		const activeNav = document.querySelector(`a[href='#${entry.target.id}']`);

		if (entry.isIntersecting) {
			navDesktop.forEach((item) =>
				item.classList.remove("nav__desktop-link--active")
			);
			activeNav.classList.add("nav__desktop-link--active");
		}
	});
};

const observer = new IntersectionObserver(handleScrollspy, options);

sections.forEach((section) => {
	observer.observe(section);
});
// ===================================

const handleMenu = () => {
	if (ulMobile.classList.contains("nav__mobile-list--active")) {
		burgerBtn.classList.remove("hide");
		closeBtn.classList.add("hide");
		ulMobile.classList.remove("nav__mobile-list--active");
	} else {
		ulMobile.classList.add("nav__mobile-list--active");
		burgerBtn.classList.add("hide");
		closeBtn.classList.remove("hide");
	}
};

const resizeMenu = () => {
	if (window.innerWidth >= 992) {
		ulMobile.classList.remove("nav__mobile-list--active");
		burgerBtn.classList.remove("hide");
		closeBtn.classList.add("hide");
	}
};

const navBorderBottom = () => {
	if (window.scrollY > 10) {
		nav.classList.add("scroll-menu");
	} else {
		nav.classList.remove("scroll-menu");
	}
};

mobileMenuItem.forEach((li) => {
	li.addEventListener("click", () => {
		handleMenu();
		ulMobile.classList.remove("nav__mobile-list--active");
	});
});

const accordion = () => {
	accordionBox.forEach((el) => {
		const accordionInfoActive =
			el.lastChild.previousElementSibling.classList.contains(
				"faq__accordion-info--active"
			);

		const arrowFaq =
			el.firstChild.nextSibling.firstElementChild.lastChild.previousSibling; //faq__accordion-arrow

		if (accordionInfoActive) {
			arrowFaq.classList.add("faq__accordion-arrow--active");
		} else {
			arrowFaq.classList.remove("faq__accordion-arrow--active");
		}
	});
};
accordion();

accordionBox.forEach((el) => {
	el.addEventListener("click", () => {
		if (el.lastElementChild.classList.contains("faq__accordion-info--active")) {
			el.lastElementChild.classList.remove("faq__accordion-info--active");
			accordion();
		} else {
			el.lastElementChild.classList.add("faq__accordion-info--active");
			accordion();
		}
	});
});

const handleCurrentYear = () => {
    const year = new Date().getFullYear();
    footerYear.innerText = year
}
handleCurrentYear();

burgerBtn.addEventListener("click", handleMenu);
closeBtn.addEventListener("click", handleMenu);
window.addEventListener("resize", resizeMenu);
window.addEventListener("scroll", navBorderBottom);
