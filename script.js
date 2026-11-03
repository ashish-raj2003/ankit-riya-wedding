
/*
  WEDDING INVITATION CONFIGURATION
*/
const WEDDING = {
  groom: "ANKIT",
  bride: "RIYA",
  groomParents: "Smt. Shila Rai & Late Avinash Rai",
  brideParents: "Smt. Rita Rai & Shri. Padam Rai",
  family: "Rai Family",
  date: "2027-02-27T18:00:00",
  dateLabel: "27 • FEBRUARY • 2027",
  venue: "K J International",
  address: "N.H-56, Airport Road, Near Sammukh Hospital, Babatpur, Sarai Takki, Varanasi, Uttar Pradesh, India",
  mapQuery: "K J International Hotel, Babatpur, Varanasi",
  whatsappNumber: "917303732633",
  musicFile: "assets/wedding-music.mp3"
};

// SAFE ELEMENT HELPER
const get = (selector) => document.querySelector(selector);
const getId = (id) => document.getElementById(id);

// WEDDING DETAILS
document.querySelectorAll("[data-groom]").forEach(el => el.textContent = WEDDING.groom);
document.querySelectorAll("[data-bride]").forEach(el => el.textContent = WEDDING.bride);

const setText = (selector, value) => {
  const el = get(selector);
  if (el) el.textContent = value;
};

setText("[data-groom-parents]", WEDDING.groomParents);
setText("[data-bride-parents]", WEDDING.brideParents);
setText("[data-family]", WEDDING.family);
setText("[data-wedding-date]", WEDDING.dateLabel);
setText("[data-venue]", WEDDING.venue);
setText("[data-address]", WEDDING.address);

// GOOGLE MAPS
const mapLink = getId("map-link");

if (mapLink) {
  mapLink.href =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(WEDDING.mapQuery);
}

// WHATSAPP RSVP
const rsvpLink = getId("whatsapp-rsvp");

if (rsvpLink) {
  const rsvpText =
    `Hello! We are happy to share that we will join ${WEDDING.groom} & ${WEDDING.bride}'s wedding celebrations.`;

  rsvpLink.href =
    "https://wa.me/" +
    WEDDING.whatsappNumber +
    "?text=" +
    encodeURIComponent(rsvpText);
}

// COUNTDOWN
const target = new Date(WEDDING.date).getTime();

function updateCountdown() {
  let distance = Math.max(0, target - Date.now());

  const days = Math.floor(distance / 86400000);
  distance %= 86400000;

  const hours = Math.floor(distance / 3600000);
  distance %= 3600000;

  const minutes = Math.floor(distance / 60000);
  distance %= 60000;

  const seconds = Math.floor(distance / 1000);

  setText("#days", String(days).padStart(3, "0"));
  setText("#hours", String(hours).padStart(2, "0"));
  setText("#minutes", String(minutes).padStart(2, "0"));
  setText("#seconds", String(seconds).padStart(2, "0"));
}

updateCountdown();
setInterval(updateCountdown, 1000);

// SCROLL REVEAL
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach(el => {
    el.classList.add("visible");
  });
}

// MOBILE NAVIGATION
const menuButton = get(".menu-toggle");
const nav = get(".nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

// ====================================
// BACKGROUND MUSIC PLAYER
// ====================================

const audio = getId("bg-music");
const musicButton = getId("music-toggle");

let musicStarted = true;

if (audio && musicButton) {

  const musicLabel = musicButton.querySelector(".music-label");

  // Configure audio
  audio.src = WEDDING.musicFile;
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.6;

  function updateMusicButton(isPlaying) {
    if (musicLabel) {
      musicLabel.textContent = isPlaying ? "Music on" : "Music off";
    }

    musicButton.setAttribute(
      "aria-label",
      isPlaying ? "Pause background music" : "Play background music"
    );
  }

  // Start music after a guest interaction
  async function startWeddingMusic() {
    if (musicStarted && !audio.paused) return;

    try {
      await audio.play();
      musicStarted = true;
      updateMusicButton(true);
    } catch (error) {
      console.warn("Wedding music could not start:", error);

      if (musicLabel) {
        musicLabel.textContent = "Tap to play";
      }
    }
  }

  // Music button: play or pause
  musicButton.addEventListener("click", async (event) => {
    event.stopPropagation();

    if (audio.paused) {
      await startWeddingMusic();
    } else {
      audio.pause();
      updateMusicButton(false);
    }
  });

  // Start music when guest taps elsewhere on the invitation.
  // Ignore the music button itself to prevent double toggling.
  document.addEventListener("click", (event) => {
    if (!musicButton.contains(event.target)) {
      startWeddingMusic();
    }
  });

  // Also support keyboard interaction
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      if (!musicButton.contains(event.target)) {
        startWeddingMusic();
      }
    }
  });

  // Keep button status synchronized
  audio.addEventListener("play", () => updateMusicButton(true));
  audio.addEventListener("pause", () => updateMusicButton(false));

  audio.addEventListener("error", () => {
    console.error("Unable to load wedding music:", audio.error);

    if (musicLabel) {
      musicLabel.textContent = "Music unavailable";
    }
  });

  updateMusicButton(false);
}
