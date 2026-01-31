// ==========================================
// UNDRA CLOUD API – Gemeinsame Datei für alle Seiten
// ==========================================

window.undra = window.undra || {};

// ------------------------------------------
// LOAD – Charakter aus Cloudflare Worker laden
// ------------------------------------------
undra.load = async function (name, title = "") {
  // ID erzeugen wie in Seite 1
  const id = `undra_${(name || "namenlos").trim().toLowerCase()}_${(title || "ohne").trim().toLowerCase()}`
    .replace(/\s+/g, "_");

  try {
    const res = await fetch(`https://undra.djdrear.workers.dev/load/${id}`);

    if (!res.ok) {
      console.error("Cloud‑Laden fehlgeschlagen:", await res.text());
      return null;
    }

    const data = await res.json();
    return data || null;

  } catch (err) {
    console.error("Cloud‑Load Fehler:", err);
    return null;
  }
};

// ------------------------------------------
// SAVE – Charakter in Cloudflare Worker speichern
// ------------------------------------------
undra.save = async function (name, title, data) {
  // ID erzeugen wie beim Laden
  const id = `undra_${(name || "namenlos").trim().toLowerCase()}_${(title || "ohne").trim().toLowerCase()}`
    .replace(/\s+/g, "_");

  try {
    const res = await fetch(`https://undra.djdrear.workers.dev/save/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      console.error("Cloud‑Speichern fehlgeschlagen:", await res.text());
      return false;
    }

    return true;

  } catch (err) {
    console.error("Cloud‑Save Fehler:", err);
    return false;
  }
};

// ------------------------------------------
// LIST – Optional: alle Gists anzeigen
// ------------------------------------------
undra.list = async function () {
  try {
    const res = await fetch(`https://undra.djdrear.workers.dev/list`);
    if (!res.ok) return [];

    return await res.json();

  } catch (err) {
    console.error("Cloud‑List Fehler:", err);
    return [];
  }
};
