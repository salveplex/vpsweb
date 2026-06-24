(function () {
  const params = new URLSearchParams(window.location.search);
  const adminReturn = params.get("adminReturn");
  const reloaded = params.get("reloaded");
  const returnKey = "fliser-admin-return";
  const navEntries = typeof performance.getEntriesByType === "function"
    ? performance.getEntriesByType("navigation")
    : [];
  const navType = navEntries.length ? navEntries[0].type : "";

  if (navType === "back_forward" && !params.get("bfReload")) {
    window.location.replace("./index.html?bfReload=1");
    return;
  }

  if (adminReturn) {
    const previousToken = sessionStorage.getItem(returnKey);
    if (previousToken !== adminReturn) {
      sessionStorage.setItem(returnKey, adminReturn);
      window.location.replace(`./index.html?reloaded=${encodeURIComponent(adminReturn)}`);
      return;
    }
  }

  if (reloaded || params.get("bfReload")) {
    sessionStorage.removeItem(returnKey);
    window.history.replaceState({}, document.title, "./index.html");
  }

  if (typeof window.startKioskApp !== "function") {
    throw new Error("Kunne ikke starte kiosk-appen.");
  }

  window.startKioskApp();
})();
