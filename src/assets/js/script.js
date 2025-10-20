function appMain() {
  
	// Pobieramy aktualny adres URL
	var currentUrl = window.location.pathname;
	var menuLinks = document.querySelectorAll('.menu a');
	menuLinks.forEach(function(link) {
		link.classList.remove('link-active');
	});
	menuLinks.forEach(function(link) {
		if (link.getAttribute('href') === currentUrl) {
			link.classList.add('link-active');
		}
	});

	// Greeting
	if (document.querySelector("#greeting")) {
		const greeting = document.getElementById("greeting");
		const hour = new Date().getHours();
		const welcomeTypes = ["Dzień dobry", "Dobry wieczór"];
		let welcomeText = "";
		if (hour < 20) welcomeText = welcomeTypes[0];
		else welcomeText = welcomeTypes[1];
		greeting.innerHTML = welcomeText;
	}
  // Header scrolled
	(function() {
		var doc = document.documentElement;
		var w = window;
		var curScroll;
		var prevScroll = w.scrollY || doc.scrollTop;
		var curDirection = 0;
		var prevDirection = 0;
		var body = document.querySelector('body');
		var header = document.querySelector('.site-header');
		var toggled;
		var threshold = 20;

		var checkScroll = function() {
			curScroll = w.scrollY || doc.scrollTop;
			if (curScroll > prevScroll) {
				// scrolled down
				curDirection = 2;
			} else {
				// scrolled up
				curDirection = 1;
			}

			if (curDirection !== prevDirection) {
				toggled = toggleHeader();
			}

			// Add or remove 'scrolled' class based on scroll position
			if (curScroll > 150) {
				header.classList.add('scrolled');
			} else {
				header.classList.remove('scrolled');
			}

			prevScroll = curScroll;
			if (toggled) {
				prevDirection = curDirection;
			}
		};

		var toggleHeader = function() {
			toggled = true;
			if (curDirection === 2 && curScroll > threshold) {
				header.classList.add('hide');
				body.classList.add('sticky-up');
        body.classList.remove('sticky-down');
			} else if (curDirection === 1) {
				header.classList.remove('hide');
				body.classList.remove('sticky-up');
        body.classList.add('sticky-down');
			} else {
				toggled = false;
			}
			return toggled;
		};

		window.addEventListener('scroll', checkScroll);

	})();

	// Acordion
	if (document.querySelector(".accordion")) {
		let t = document.getElementsByClassName("accordion");
		for (let e = 0; e < t.length; e++)
			t[e].addEventListener("click", function() {
				let e = this.nextElementSibling;
				if (e.style.maxHeight)
					(e.style.maxHeight = null), this.classList.remove("open");
				else {
					for (let a = 0; a < t.length; a++)
						t[a].classList.remove("open"),
						(t[a].nextElementSibling.style.maxHeight = null);
					(e.style.maxHeight = e.scrollHeight + "px"),
					this.classList.toggle("open");
				}
			});
	};


	  // Lazy blur images
  if (document.querySelector(".blur-load")) {
		const lazyImages = document.querySelectorAll('img[loading="lazy"]');
	
		if (lazyImages.length > 0) {
			const observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const img = entry.target;
	
						function loaded() {
							img.classList.add("loaded");
						}
	
						if (img.complete) {
							loaded();
						} else {
							img.addEventListener("load", loaded);
						}
	
						observer.unobserve(img); // Przestań obserwować po załadowaniu
					}
				});
			}, {
				root: null, // Obserwujemy widoczność w oknie przeglądarki
				rootMargin: "300px" // Załaduj obraz 300px przed krawędzią ekranu
			});
	
			lazyImages.forEach(img => observer.observe(img));
		}
	
};



	if (document.querySelector('.form-outer')) {
		initMultiStepForm();

		function initMultiStepForm() {
			const progressNumber = document.querySelectorAll(".step").length;
			const slidePage = document.querySelector(".slide-page");
			const progressCheck = document.querySelectorAll(".step .check");
			const bullet = document.querySelectorAll(".step .bullet");
			const pages = document.querySelectorAll(".page");
			const nextButtons = document.querySelectorAll(".next");
			const prevButtons = document.querySelectorAll(".prev");
			const stepsNumber = pages.length;

			if (progressNumber !== stepsNumber) {
				console.warn(
					"Error, number of steps in progress bar do not match number of pages"
				);
			}

			document.documentElement.style.setProperty("--stepNumber", stepsNumber);

			let current = 1;

			for (let i = 0; i < nextButtons.length; i++) {
				nextButtons[i].addEventListener("click", function(event) {
					event.preventDefault();

					inputsValid = validateInputs(this);
					// inputsValid = true;

					if (inputsValid) {
						slidePage.style.marginLeft = `-${
                      (100 / stepsNumber) * current
                  }%`;
						bullet[current - 1].classList.add("active");
						progressCheck[current - 1].classList.add("active");
						current += 1;
					}
				});
			}

			for (let i = 0; i < prevButtons.length; i++) {
				prevButtons[i].addEventListener("click", function(event) {
					event.preventDefault();
					slidePage.style.marginLeft = `-${
                  (100 / stepsNumber) * (current - 2)
              }%`;
					bullet[current - 2].classList.remove("active");
					progressCheck[current - 2].classList.remove("active");
					current -= 1;
				});
			}

			function validateInputs(ths) {
				let inputsValid = true;

				const inputs =
					ths.parentElement.parentElement.querySelectorAll("input");
				for (let i = 0; i < inputs.length; i++) {
					const valid = inputs[i].checkValidity();
					if (!valid) {
						inputsValid = false;
						inputs[i].classList.add("invalid-input");
					} else {
						inputs[i].classList.remove("invalid-input");
					}
				}
				return inputsValid;
			}
		}

	}

	function handleSubmit(formId, redirectUrl) {
		var form = document.getElementById(formId);

		if (form) {
			form.addEventListener('submit', function(e) {
				e.preventDefault();

				var formData = new FormData(form);
				var xhr = new XMLHttpRequest();

				xhr.open('POST', 'https://www.futurewebstudio.pl/form/forms/' + formId + '.php');

				xhr.onreadystatechange = function() {
					if (xhr.readyState === XMLHttpRequest.DONE) {
						if (xhr.status === 200) {
							var res = JSON.parse(xhr.responseText);
							if (res.status === 1) {
								form.reset();
								window.location.href = redirectUrl; // Przekieruj po pomyślnym wysłaniu formularza
							}
						}
					}
				};

				xhr.send(formData);
			});
		}
	}
	handleSubmit('briefForm', '/wyslano-formularz');
	handleSubmit('contactForm', '/wyslano-formularz');

// End
};