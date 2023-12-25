const sections = document.querySelectorAll(".section");
const scrollIndicator = document.querySelector(".scroll-indicator");
const scrollDuration = 800; // Tempo da animação em milissegundos

let isScrolling = false;
let currentSection = 0;

scrollIndicator.addEventListener("click", scrollToNextSection);
document.addEventListener("wheel", handleScroll);

function setActiveSection(sectionIndex) {
  sections.forEach((section, index) => {
    if (index === sectionIndex) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
}

function scrollToNextSection(event) {
  event.preventDefault();
  if (!isScrolling) {
    isScrolling = true;
    const currentSection = sections[currentSection];
    currentSection.querySelector(".text-slide").classList.remove("active");
    animateOut(currentSection);

    setTimeout(() => {
      isScrolling = false;
    }, scrollDuration);

    currentSection = Math.min(currentSection + 1, sections.length - 1);
    setActiveSection(currentSection);
    sections[currentSection].scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest", duration: scrollDuration });
  }
}

function handleScroll(event) {
  if (!isScrolling) {
    isScrolling = true;
    animateOut(sections[currentSection], event.deltaY > 0);

    setTimeout(() => {
      isScrolling = false;
    }, scrollDuration);

    const delta = event.deltaY;

    if (delta > 0) {
      currentSection = Math.min(currentSection + 1, sections.length - 1);
    } else {
      currentSection = Math.max(currentSection - 1, 0);
    }

    sections[currentSection].scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest", duration: scrollDuration });
  }
}

function animateOut(section, scrollDown) {
  const boxShadowSize = scrollDown ? "100px" : "10px";
  const boxShadowColor = scrollDown ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";

  section.style.transition = `box-shadow ${scrollDuration}ms ease-in-out`;
  section.style.boxShadow = `0px ${boxShadowSize} ${boxShadowSize} ${boxShadowColor}`;
  
  const textElements = section.querySelectorAll(".text-slide");
  textElements.forEach((textElement) => {
    textElement.classList.add("animate-slide");
  });
  
  setTimeout(() => {
    section.style.transition = "";
    section.style.boxShadow = "";
    textElements.forEach((textElement) => {
      textElement.classList.remove("animate-slide");
    });
  }, scrollDuration);
}

