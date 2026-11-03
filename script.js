/*
  EDIT YOUR INVITATION HERE.
  Dates use YYYY-MM-DDTHH:MM:SS in your local time.
  Replace sample names, functions, venue and WhatsApp number.
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
  whatsappNumber: "917303732633", // country code + number, no + or spaces
  musicFile: "assets/wedding-music.mp3" // add your own royalty-free audio file
};

document.querySelectorAll("[data-groom]").forEach(el => el.textContent = WEDDING.groom);
document.querySelectorAll("[data-bride]").forEach(el => el.textContent = WEDDING.bride);
document.querySelector("[data-groom-parents]").textContent = WEDDING.groomParents;
document.querySelector("[data-bride-parents]").textContent = WEDDING.brideParents;
document.querySelector("[data-family]").textContent = WEDDING.family;
document.querySelector("[data-wedding-date]").textContent = WEDDING.dateLabel;
document.querySelector("[data-venue]").textContent = WEDDING.venue;
document.querySelector("[data-address]").textContent = WEDDING.address;
document.getElementById("map-link").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(WEDDING.mapQuery);
const rsvpText = `Hello! We are happy to share that we will join ${WEDDING.groom} & ${WEDDING.bride}'s wedding celebrations.`;
document.getElementById("whatsapp-rsvp").href = "https://wa.me/" + WEDDING.whatsappNumber + "?text=" + encodeURIComponent(rsvpText);

// Countdown
const target = new Date(WEDDING.date).getTime();
function updateCountdown() {
  let distance = Math.max(0, target - Date.now());
  const days = Math.floor(distance / 86400000); distance %= 86400000;
  const hours = Math.floor(distance / 3600000); distance %= 3600000;
  const minutes = Math.floor(distance / 60000); distance %= 60000;
  const seconds = Math.floor(distance / 1000);
  document.getElementById("days").textContent = String(days).padStart(3,"0");
  document.getElementById("hours").textContent = String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");
}
updateCountdown(); setInterval(updateCountdown, 1000);

// Smooth reveal on scroll
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
}), {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open"); menuButton.setAttribute("aria-expanded","false");
}));

// Music: browsers require a user tap before audio can start.
// Add a royalty-free MP3 at assets/wedding-music.mp3, then tap the music control.
const audio = document.getElementById("bg-music");
const musicButton = document.getElementById("music-toggle");
audio.src = WEDDING.musicFile;
musicButton.addEventListener("click", async () => {
  if (audio.paused) {
    try { await audio.play(); musicButton.querySelector(".music-label").textContent = "Music on"; musicButton.setAttribute("aria-label","Pause background music"); }
    catch { musicButton.querySelector(".music-label").textContent = "Add MP3 first"; }
  } else {
    audio.pause(); musicButton.querySelector(".music-label").textContent = "Music off"; musicButton.setAttribute("aria-label","Play background music");
  }
});
