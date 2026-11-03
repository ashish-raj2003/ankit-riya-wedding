
/*
  RIYA & ANKIT WEDDING INVITATION
  Edit wedding details in the WEDDING section.
  Dates use YYYY-MM-DDTHH:MM:SS in local time.
*/

const WEDDING = {
  groom: "Ankit",
  bride: "Riya",
  groomParents: "Shila Rai & Late Avinash Rai",
  brideParents: "Rita Rai & Padam Rai",
  family: "Rai Family",
  date: "2027-02-27T18:00:00",
  dateLabel: "27 • FEBRUARY • 2027",
  venue: "K J International",
  address: "N.H-56, Airport Road, Near Sammukh Hospital, Babatpur, Sarai Takki, Varanasi, Uttar Pradesh, India",
  mapQuery: "K J International Hotel, Babatpur, Varanasi",
  whatsappNumber: "917303732633",
  musicFile: "assets/wedding-music.mp3"
};

// Wedding information
document.querySelectorAll("[data-groom]").forEach(el => el.textContent = WEDDING.groom);
document.querySelectorAll("[data-bride]").forEach(el => el.textContent = WEDDING.bride);

const groomParents = document.querySelector("[data-groom-parents]");
if (groomParents) groomParents.textContent = WEDDING.groomParents;

const brideParents = document.querySelector("[data-bride-parents]");
if (brideParents) brideParents.textContent = WEDDING.brideParents;

const family = document.querySelector("[data-family]");
if (family) family.textContent = WEDDING.family;

const weddingDate = document.querySelector("[data-wedding-date]");
if (weddingDate) weddingDate.textContent = WEDDING.dateLabel;

const venue = document.querySelector("[data-venue]");
if (venue) venue.textContent = WEDDING.venue;

const address = document.querySelector("[data-address]");
if (address) address.textContent = WEDDING.address;

const mapLink = document.getElementById("map-link");
if (mapLink) {
  mapLink.href = "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(WEDDING.mapQuery);
}

// WhatsApp RSVP
const rsvpButton = document.getElementById("whatsapp-rsvp");

if (rsvpButton) {
  const rsvpText = `Hello! We are happy to share that we will join ${WEDDING.groom} & ${WEDDING.bride}'s wedding celebrations.`;

  rsvpButton.href = "https://wa.me/" +
    WEDDING.whatsappNumber +
    "?text=" + encodeURIComponent(rsvpText);
}

// Countdown
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

  const dayElement = document.getElementById("days");
  const hourElement = document.getElementById("hours");
  const minuteElement = document.getElementById("minutes");
  const secondElement = document.getElementById("seconds");

  if (dayElement) dayElement.textContent = String(days).padStart(3, "0");
  if (hourElement) hourElement.textContent = String(hours).padStart(2, "0");
  if (minuteElement) minuteElement.textContent = String(minutes).padStart(2, "0");
  if (secondElement) secondElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Smooth reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
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

let musicStarted = false;

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

// Start music after the guest's first interaction
async function startWeddingMusic() {
  if (!audio || musicStarted) return;

  try {
    await audio.play();
    musicStarted = true;
    updateMusicLabel("Music on", true);
  } catch (error) {
    console.log("Music playback could not start:", error);
    updateMusicLabel("Tap for music", false);
  }
}

// Try automatic playback on the first guest interaction.
// Browser security rules require a user gesture for audible playback.
document.addEventListener("click", startWeddingMusic, { once: true });

document.addEventListener("keydown", startWeddingMusic, { once: true });

// Manual play / pause control
if (musicButton && audio) {
  musicButton.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
        musicStarted = true;
        updateMusicLabel("Music on", true);
      } catch (error) {
        console.log("Music playback error:", error);
        updateMusicLabel("Music unavailable", false);
      }
    } else {
      audio.pause();
      updateMusicLabel("Music off", false);
    }
  });
}

// Keep button label synchronised with audio
if (audio) {
  audio.addEventListener("play", () => {
    musicStarted = true;
    updateMusicLabel("Music on", true);
  });

  audio.addEventListener("pause", () => {
    updateMusicLabel("Music off", false);
  });

  audio.addEventListener("error", () => {
    console.log("Unable to load wedding music. Check the MP3 file path.");
    updateMusicLabel("Music unavailable", false);
  });
}
