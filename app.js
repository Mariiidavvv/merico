(function () {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    function setMenuOpen(open) {
      menuToggle.classList.toggle("is-open", open);
      mobileMenu.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    }

    menuToggle.addEventListener("click", function () {
      setMenuOpen(!menuToggle.classList.contains("is-open"));
    });

    mobileMenu.querySelectorAll("a, button").forEach(function (el) {
      el.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });
  }

  function resetTariffModal() {
    const title = document.getElementById("tariff-title");
    const subtitle = document.getElementById("tariff-subtitle");
    const tariffName = document.getElementById("tariff-name");
    if (title) {
      title.textContent = "Заказать тариф";
    }
    if (subtitle) {
      subtitle.classList.remove("hidden");
    }
    if (tariffName) {
      tariffName.textContent = "";
    }
  }

  function openModal(id, tariff) {
    const modal = document.getElementById(id);
    if (!modal) {
      return;
    }
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    if (id === "tariff-modal") {
      resetTariffModal();
      if (tariff === "Зафиксировать условия") {
        document.getElementById("tariff-title").textContent = "Зафиксировать условия";
        document.getElementById("tariff-subtitle").classList.add("hidden");
      } else if (tariff) {
        document.getElementById("tariff-name").textContent = tariff;
      }
    }
  }

  function closeModal(modal) {
    if (modal.id === "tariff-modal") {
      resetTariffModal();
    }
    modal.classList.add("hidden");
    if (!document.querySelector(".modal:not(.hidden)")) {
      document.body.style.overflow = "";
    }
  }

  document.querySelectorAll("[data-open-modal]").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      openModal(btn.getAttribute("data-open-modal"), btn.getAttribute("data-tariff"));
    });
  });

  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.querySelectorAll("[data-close-modal]").forEach(function (el) {
      el.addEventListener("click", function () {
        closeModal(modal);
      });
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      document.querySelectorAll(".modal:not(.hidden)").forEach(closeModal);
    }
  });

  function maskPhone(input) {
    input.addEventListener("input", function () {
      let digits = input.value.replace(/\D/g, "");
      if (digits.startsWith("8")) {
        digits = "7" + digits.slice(1);
      }
      if (!digits.startsWith("7")) {
        digits = "7" + digits;
      }
      digits = digits.slice(0, 11);
      const rest = digits.slice(1);
      let formatted = "+7";
      if (rest.length) {
        formatted += " (" + rest.slice(0, 3);
      }
      if (rest.length >= 3) {
        formatted += ") " + rest.slice(3, 6);
      }
      if (rest.length >= 6) {
        formatted += "-" + rest.slice(6, 8);
      }
      if (rest.length >= 8) {
        formatted += "-" + rest.slice(8, 10);
      }
      input.value = formatted;
    });
  }

  document.querySelectorAll(".js-phone").forEach(maskPhone);

  const quizForm = document.getElementById("quiz-form");
  let quizStep = 1;

  function showQuizStep(step) {
    quizStep = step;
    for (let i = 1; i <= 4; i += 1) {
      document.getElementById("quiz-step-" + i).classList.toggle("hidden", i !== step);
    }
    document.getElementById("quiz-progress").style.width = String(step * 25) + "%";
    document.getElementById("quiz-step-label").textContent = String(step);
  }

  if (quizForm) {
    quizForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });

    quizForm.querySelectorAll("[data-quiz-next]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (quizStep === 1 && !quizForm.cleaningType.value) {
          return;
        }
        if (quizStep === 2 && !quizForm.area.value) {
          return;
        }
        showQuizStep(quizStep + 1);
      });
    });

    quizForm.querySelectorAll("[data-quiz-prev]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        showQuizStep(quizStep - 1);
      });
    });
  }

  const cookieBanner = document.getElementById("cookie-banner");
  const cookieKey = "merico_cookies_accepted";
  if (localStorage.getItem(cookieKey) !== "1") {
    cookieBanner.classList.remove("hidden");
  }
  document.getElementById("cookie-accept").addEventListener("click", function () {
    localStorage.setItem(cookieKey, "1");
    cookieBanner.classList.add("hidden");
  });

  document.querySelectorAll(".lux-card-more").forEach(function (toggle) {
    const details = document.getElementById(toggle.getAttribute("aria-controls"));
    if (!details) {
      return;
    }
    details.classList.add("hidden");
    details.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      const open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (open) {
        details.classList.remove("hidden");
        details.classList.add("is-open");
      } else {
        details.classList.remove("is-open");
        details.classList.add("hidden");
      }
    });
  });

  const chatSlider = document.getElementById("reviews-chat-slider");
  const chatDots = document.getElementById("reviews-chat-dots");
  if (chatSlider && chatDots) {
    const slides = chatSlider.querySelectorAll(".reviews-chat-slide");
    const dots = chatDots.querySelectorAll(".reviews-chat-dot");

    function activeSlideIndex() {
      const center = chatSlider.scrollLeft + chatSlider.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      slides.forEach(function (slide, index) {
        const mid = slide.offsetLeft + slide.offsetWidth / 2;
        const dist = Math.abs(mid - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });
      return best;
    }

    function syncChatDots() {
      const active = activeSlideIndex();
      dots.forEach(function (dot, index) {
        dot.classList.toggle("is-active", index === active);
      });
    }

    chatSlider.addEventListener("scroll", syncChatDots, { passive: true });
    dots.forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        slides[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
    });

    function cardStep() {
      const slide = slides[0];
      const gap = parseFloat(window.getComputedStyle(chatSlider).gap) || 0;
      return slide ? slide.getBoundingClientRect().width + gap : 360;
    }

    const nextBtn = document.getElementById("reviews-chat-next");
    const prevBtn = document.getElementById("reviews-chat-prev");

    function syncChatArrows() {
      if (!prevBtn) {
        return;
      }
      const atStart = chatSlider.scrollLeft <= 8;
      prevBtn.classList.toggle("is-disabled", atStart);
      prevBtn.setAttribute("aria-disabled", String(atStart));
    }

    chatSlider.addEventListener("scroll", syncChatArrows, { passive: true });
    syncChatArrows();

    if (nextBtn) {
      nextBtn.addEventListener("click", function (event) {
        event.preventDefault();
        chatSlider.scrollBy({ left: cardStep(), behavior: "smooth" });
      });
    }
  }

  window.mericoChatPrev = function (event) {
    if (event) {
      event.preventDefault();
    }
    var slider = document.getElementById("reviews-chat-slider");
    if (!slider) {
      return;
    }
    var slide = slider.querySelector(".reviews-chat-slide");
    var gap = parseFloat(window.getComputedStyle(slider).columnGap || window.getComputedStyle(slider).gap) || 0;
    var amount = slide ? slide.getBoundingClientRect().width + gap : 360;
    slider.scrollTo({ left: Math.max(0, slider.scrollLeft - amount), behavior: "smooth" });
  };

  var prevArrow = document.getElementById("reviews-chat-prev");
  var chatRow = document.querySelector("#reviews-chat .reviews-chat-row");
  if (prevArrow) {
    prevArrow.onclick = window.mericoChatPrev;
  }
  if (chatRow && prevArrow) {
    chatRow.addEventListener("click", function (event) {
      if (prevArrow.contains(event.target)) {
        return;
      }
      var box = prevArrow.getBoundingClientRect();
      if (
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top &&
        event.clientY <= box.bottom
      ) {
        window.mericoChatPrev(event);
      }
    }, true);
  }
})();
