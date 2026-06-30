(() => {
  "use strict";
  const OFFICIAL_SCORE_URL = "https://ptw2027.org/ptw2027-score.html";
  const QR_IMAGE = "./ptw-official-score-qr.png";
  const BLOCKED_LABELS = /^(View Results|Artistic Reveal|Open Artistic Reveal|Download PDF|Send to Institution)$/i;
  const BLOCKED_TEXT = /(Relaxed artistic score reveal|Open Artistic Reveal|Artistic Reveal|Download PDF|Send to Institution|PTW 2027 Total Score|Score Report)/i;
  const rootReady = () => document.getElementById("root");
  function isAdminContext(){
    const text = document.body?.innerText || "";
    return /Administrator Portal|Admin Console|Security Logs|Candidate Management|Exam Builder/.test(text);
  }
  function ensureModal(){
    let modal = document.getElementById("ptw-v38-official-score-modal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "ptw-v38-official-score-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="ptw-v38-modal-backdrop" data-ptw-close="1"></div>
      <section class="ptw-v38-modal-card" role="dialog" aria-modal="true" aria-labelledby="ptw-v38-modal-title">
        <button class="ptw-v38-modal-close" type="button" data-ptw-close="1" aria-label="Close">×</button>
        <div class="ptw-v38-modal-mark">PTW 2027</div>
        <h2 id="ptw-v38-modal-title">Official Score Verification</h2>
        <p class="ptw-v38-modal-copy">Score inquiry and certificate verification are handled on the official PTW 2027 website.</p>
        <div class="ptw-v38-qr-wrap"><img src="${QR_IMAGE}" alt="Official PTW 2027 score verification QR code"></div>
        <p class="ptw-v38-modal-hint">Scan this QR code with another device, or open the official website score verification page.</p>
        <a class="ptw-v38-modal-link" href="${OFFICIAL_SCORE_URL}" target="_blank" rel="noopener noreferrer">Open official verification page</a>
      </section>`;
    document.body.appendChild(modal);
    modal.addEventListener("click", (event) => {
      if (event.target && event.target.getAttribute && event.target.getAttribute("data-ptw-close") === "1") hideModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") hideModal();
    });
    return modal;
  }
  function showModal(){
    const modal = ensureModal();
    modal.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("ptw-v38-modal-open");
  }
  function hideModal(){
    const modal = document.getElementById("ptw-v38-official-score-modal");
    if (modal) modal.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("ptw-v38-modal-open");
  }
  function makeVerificationNotice(){
    const div = document.createElement("div");
    div.className = "ptw-v38-official-score-card";
    div.innerHTML = `
      <div class="ptw-v38-official-score-card-head">
        <span>Official score verification</span>
        <strong>Website only</strong>
      </div>
      <p>Candidate score inquiry has moved to the official PTW 2027 website. This exam app no longer displays standard or artistic score reports on the candidate side.</p>
      <button type="button" class="ptw-v38-verify-button">Show verification QR</button>`;
    div.querySelector("button").addEventListener("click", showModal);
    return div;
  }
  function patchButtons(){
    if (!rootReady() || isAdminContext()) return;
    document.querySelectorAll("button, a").forEach((el) => {
      if (el.dataset.ptwV38VerifyPatched === "1") return;
      const label = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (!BLOCKED_LABELS.test(label)) return;
      el.dataset.ptwV38VerifyPatched = "1";
      el.dataset.ptwOriginalLabel = label;
      el.textContent = "Official Verification QR";
      el.classList.add("ptw-v38-verify-trigger");
    });
  }
  function patchScoreCards(){
    if (!rootReady() || isAdminContext()) return;
    const nodes = Array.from(document.querySelectorAll("div, section, article"));
    for (const el of nodes) {
      if (el.dataset.ptwV38ScoreBlocked === "1") continue;
      const txt = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (!txt) continue;
      const cls = String(el.className || "");
      const looksLikeScoreCard = /bg-ptw-red-light/.test(cls) && /Score Report/.test(txt);
      const looksLikeRevealBanner = /Relaxed artistic score reveal|Open Artistic Reveal/.test(txt) && /ptw-reveal-card|from-amber-50|to-red-50/.test(cls);
      if (looksLikeScoreCard || looksLikeRevealBanner) {
        el.dataset.ptwV38ScoreBlocked = "1";
        el.replaceWith(makeVerificationNotice());
      }
    }
  }
  function patchArtisticPage(){
    if (!rootReady() || isAdminContext()) return;
    const bodyText = document.body?.innerText || "";
    if (!/Artistic score reveal|curated mode|Relaxed artistic score reveal/i.test(bodyText)) return;
    // If the user reached the artistic reveal route from an older cached state, do not show scores.
    const main = document.querySelector("main");
    if (main && !main.querySelector(".ptw-v38-artistic-blocked")) {
      main.innerHTML = "";
      const wrap = document.createElement("div");
      wrap.className = "ptw-v38-artistic-blocked";
      wrap.innerHTML = `
        <div class="ptw-v38-blocked-shell">
          <img src="./ptw-icon-192.png" alt="PTW 2027">
          <h1>Official Score Verification</h1>
          <p>Standard score lookup and artistic score reveal are no longer displayed in the exam app. Please scan the QR code to verify scores on the official PTW 2027 website.</p>
          <div class="ptw-v38-qr-wrap inline"><img src="${QR_IMAGE}" alt="Official PTW 2027 score verification QR code"></div>
          <button type="button" class="ptw-v38-verify-button">Show verification QR</button>
        </div>`;
      wrap.querySelector("button").addEventListener("click", showModal);
      main.appendChild(wrap);
    }
  }
  function patchAll(){
    try {
      patchButtons();
      patchScoreCards();
      patchArtisticPage();
    } catch (err) {
      console.warn("PTW v38 verification patch skipped:", err);
    }
  }
  document.addEventListener("click", (event) => {
    if (isAdminContext()) return;
    const target = event.target && event.target.closest ? event.target.closest("button, a") : null;
    if (!target) return;
    const label = (target.dataset.ptwOriginalLabel || target.textContent || "").replace(/\s+/g, " ").trim();
    if (!BLOCKED_LABELS.test(label) && !target.classList.contains("ptw-v38-verify-trigger")) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    showModal();
  }, true);
  const observer = new MutationObserver(() => patchAll());
  window.addEventListener("DOMContentLoaded", () => {
    ensureModal();
    patchAll();
    const root = rootReady() || document.body;
    observer.observe(root, { childList: true, subtree: true, characterData: true });
  });
  window.PTW_V38_SHOW_OFFICIAL_SCORE_QR = showModal;
})();
