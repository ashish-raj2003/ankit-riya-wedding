
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


// =====================================
// BACKGROUND MUSIC
// =====================================
const audio = document.getElementById("bg-music");
const musicButton = document.getElementById("music-toggle");

if (audio) {
  audio.src = WEDDING.musicFile;
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0.6;
}

function updateMusicLabel(message, playing) {
  if (!musicButton) return;

  const label = musicButton.querySelector(".music-label");
  if (label) label.textContent = message;

  musicButton.setAttribute(
    "aria-label",
    playing ? "Pause background music" : "Play background music"
  );
}

async function startWeddingMusic() {
  if (!audio || !audio.paused) return;

  try {
    await audio.play();
    updateMusicLabel("Music on", true);
  } catch (error) {
    console.log("Music playback blocked or unavailable:", error);
    updateMusicLabel("Tap for music", false);
  }
}

// Start music on the visitor's first click anywhere
// except the music button itself.
document.addEventListener("click", (event) => {
  if (musicButton && musicButton.contains(event.target)) return;
  startWeddingMusic();
});

// Music button: manually play or pause
if (musicButton && audio) {
  musicButton.addEventListener("click", async () => {
    if (audio.paused) {
      await startWeddingMusic();
    } else {
      audio.pause();
    }
  });
}

if (audio) {
  audio.addEventListener("play", () => {
    updateMusicLabel("Music on", true);
  });

  audio.addEventListener("pause", () => {
    updateMusicLabel("Music off", false);
  });

  audio.addEventListener("error", () => {
    updateMusicLabel("Music unavailable", false);
  });
}
