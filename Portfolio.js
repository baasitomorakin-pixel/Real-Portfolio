/* =========================================================
   PORTFOLIO JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body = document.body;

    const themeToggle = document.getElementById("theme-toggle");

    const menuToggle = document.getElementById("menu-toggle");

    const navMenu = document.getElementById("nav-menu");

    const navLinks = document.querySelectorAll(".nav-link");

    const contactForm = document.getElementById("contact-form");

    const successAlert = document.getElementById("success-alert");

    const closeAlert = document.getElementById("close-alert");

    const currentYear = document.getElementById("current-year");

    const progressBars = document.querySelectorAll(".progress");

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-grid, .project-card, .skill-category, .contact-wrapper"
    );


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    currentYear.textContent = new Date().getFullYear();


    /* =====================================================
       THEME TOGGLE
    ====================================================== */

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        body.classList.add("light-mode");
    }

    themeToggle.addEventListener("click", () => {

        body.classList.toggle("light-mode");

        const isLightMode = body.classList.contains("light-mode");

        localStorage.setItem(
            "portfolio-theme",
            isLightMode ? "light" : "dark"
        );

    });


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const isOpen = navMenu.classList.contains("open");

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        const menuBars = menuToggle.querySelectorAll("span");

        if (isOpen) {

            menuBars[0].style.transform =
                "rotate(45deg) translate(5px, 5px)";

            menuBars[1].style.opacity = "0";

            menuBars[2].style.transform =
                "rotate(-45deg) translate(5px, -5px)";

        } else {

            menuBars[0].style.transform = "none";
            menuBars[1].style.opacity = "1";
            menuBars[2].style.transform = "none";

        }

    });


    /* =====================================================
       CLOSE MOBILE MENU
    ====================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            const menuBars = menuToggle.querySelectorAll("span");

            menuBars[0].style.transform = "none";
            menuBars[1].style.opacity = "1";
            menuBars[2].style.transform = "none";

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });


    /* =====================================================
       SMOOTH SCROLLING
    ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ====================================================== */

    const sections = document.querySelectorAll("section[id]");

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 160;

            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       PROJECT CARD STAGGER
    ====================================================== */

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 0.08}s`;

    });


    /* =====================================================
       SKILLS PROGRESS BARS
    ====================================================== */

    const skillObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                progressBars.forEach((bar) => {

                    const width =
                        bar.getAttribute("data-width");

                    bar.style.width = width;

                });

                observer.disconnect();

            });

        },
        {
            threshold: 0.3
        }
    );


    const skillsSection =
        document.getElementById("skills");

    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }


    /* =====================================================
       CONTACT FORM
    ====================================================== */

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();


        /* -----------------------------------------------
           Basic Validation
        ------------------------------------------------ */

        if (!name || !email || !message) {

            showFormError(
                "Please complete all fields before sending."
            );

            return;
        }


        if (!isValidEmail(email)) {

            showFormError(
                "Please enter a valid email address."
            );

            return;
        }


        /* -----------------------------------------------
           Simulate Successful Submission
        ------------------------------------------------ */

        const submitButton =
            contactForm.querySelector(
                'button[type="submit"]'
            );

        const originalButtonText =
            submitButton.innerHTML;

        submitButton.disabled = true;

        submitButton.innerHTML =
            `<span class="loading-spinner"></span> Sending...`;


        setTimeout(() => {

            contactForm.reset();

            submitButton.disabled = false;

            submitButton.innerHTML =
                originalButtonText;

            showSuccessAlert();

        }, 900);

    });


    /* =====================================================
       EMAIL VALIDATION
    ====================================================== */

    function isValidEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    /* =====================================================
       SUCCESS ALERT
    ====================================================== */

    function showSuccessAlert() {

        successAlert.classList.add("show");

        setTimeout(() => {

            successAlert.classList.remove("show");

        }, 6000);

    }


    /* =====================================================
       CLOSE SUCCESS ALERT
    ====================================================== */

    closeAlert.addEventListener("click", () => {

        successAlert.classList.remove("show");

    });


    /* =====================================================
       FORM ERROR
    ====================================================== */

    function showFormError(message) {

        const existingError =
            document.querySelector(".form-error");

        if (existingError) {
            existingError.remove();
        }

        const errorElement =
            document.createElement("div");

        errorElement.className = "form-error";

        errorElement.textContent = message;

        errorElement.style.cssText = `
            padding: 13px 15px;
            color: #ff8c8c;
            background: rgba(255, 80, 80, 0.08);
            border: 1px solid rgba(255, 80, 80, 0.2);
            border-radius: 10px;
            font-size: 0.72rem;
            font-weight: 700;
        `;

        contactForm.prepend(errorElement);

        setTimeout(() => {

            errorElement.style.opacity = "0";

            errorElement.style.transition =
                "opacity 0.3s ease";

            setTimeout(() => {
                errorElement.remove();
            }, 300);

        }, 4000);

    }


    /* =====================================================
       BUTTON LOADING SPINNER
    ====================================================== */

    const spinnerStyle =
        document.createElement("style");

    spinnerStyle.textContent = `
        .loading-spinner {
            width: 15px;
            height: 15px;
            display: inline-block;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: buttonSpin 0.7s linear infinite;
        }

        @keyframes buttonSpin {
            to {
                transform: rotate(360deg);
            }
        }

        button:disabled {
            cursor: not-allowed;
            opacity: 0.75;
        }
    `;

    document.head.appendChild(spinnerStyle);


    /* =====================================================
       INITIALIZE
    ====================================================== */

    updateActiveNavigation();

});