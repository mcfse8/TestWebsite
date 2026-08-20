/**
 * products.js
 * ── DATA TABLE (Products page) ──
 * Récupère les données depuis data.csv (généré par un script d'extraction
 * indépendant) et remplit le tableau de la page Products.
 *
 * ── MAP ──
 * Récupère les données depuis plot_data.csv (une seule date) et affiche
 * les points/clusters sur la carte.
 *
 * Dépend de : parseCSV() (csv.js), escapeHtml() (utils.js),
 * renderDataTablePage() (pagination.js).
 */

// ------------------------------------------------------------------
// Chargement direct d'un fichier CSV
// ------------------------------------------------------------------

const CSV_FILE = "../data.csv";
const CSV_PLOT_FILE = "../plot_data.csv"

let monitoringDataLoaded = false;

let allRows = [];

let currentPage = 1;

const rowsPerPage = 10;

async function loadMonitoringData(forceRefresh = false) {

  if (monitoringDataLoaded && !forceRefresh) {
    return allRows;
  }

  const statusEl = document.getElementById("data-table-status");
  const refreshBtn = document.getElementById("data-table-refresh-btn");

  statusEl.textContent = "Chargement des données...";
  refreshBtn.disabled = true;

  let rows=[];

  try {

    const response = await fetch(
      `${CSV_FILE}?t=${Date.now()}`
    );

    console.log("Status :", response.status);
    console.log("OK :", response.ok);

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const csvText = await response.text();

    rows = parseCSV(csvText);

    allRows = rows;

    currentPage = 1;

    renderDataTablePage();

    statusEl.textContent =
      `${rows.length} ligne(s) chargée(s)`;

    monitoringDataLoaded = true;

  } catch (error) {

    console.error(error);

    statusEl.textContent =
      "Impossible de charger le fichier CSV";

    document.getElementById("data-table-body").innerHTML =
      `<tr>
        <td colspan="99" class="data-table-error">
          Erreur de chargement
        </td>
      </tr>`;

  } finally {

    refreshBtn.disabled = false;

  }

  return rows;
}

// ------------------------------------------------------------------
// Chargement des données de la carte (plot_data.csv)
// ------------------------------------------------------------------

async function loadPlotData() {

  let rows = [];

  try {

    const response = await fetch(
      `${CSV_PLOT_FILE}?t=${Date.now()}`
    );

    console.log("Status :", response.status);
    console.log("OK :", response.ok);

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const csvText = await response.text();

    rows = parseCSV(csvText);

  } catch (error) {

    console.error(error);

  }

  return rows;
}


// ------------------------------------------------------------------
// Affichage du tableau
// ------------------------------------------------------------------

function renderDataTable(rows) {

  const thead = document.getElementById("data-table-head");
  const tbody = document.getElementById("data-table-body");

  if (!rows.length) {

    thead.innerHTML = "";

    tbody.innerHTML =
      `<tr>
        <td colspan="99" class="data-table-empty">
          Aucune donnée disponible
        </td>
      </tr>`;

    return;
  }

  const headers = Object.keys(rows[0]);

  thead.innerHTML =
    `<tr>
      ${headers.map(h => `<th>${escapeHtml(h)}</th>`).join("")}
    </tr>`;

  tbody.innerHTML = rows.map(row => `
      <tr>
        ${headers.map(header =>
          `<td>${escapeHtml(row[header])}</td>`
        ).join("")}
      </tr>
  `).join("");
}

// ------------------------------------------------------------------
// AFFICHAGE MAP
// ------------------------------------------------------------------

window.addEventListener("DOMContentLoaded", async () => {
    console.log("Appel loadMonitoringData() + DisplayMap()");
    await loadMonitoringData();
    await DisplayMap();
    // await refreshMap();
});

/* Palette de couleurs */

const clusterColors = {
    fire: "#e41a1c",
    others: "#377eb8",
    volcano: "#984ea3",
    fire_type_1: "#ff7f00",
    voc: "#00ffff",
    calcite : "#ff1493",
    Unclassified : "#666666",
    extrem : "#000000"
};

let map;
let pointLayer;
let hullLayer;

let allData = [];

let currentSpecies = ["C2H2", "C2H4", "CaCO3", "CH3OH", "HCN", "HCOOH", "HNO3", "CO", "CO2", "NH3", "SO2"];
let currentClusterTypes = Object.keys(clusterColors);
// let currentClusterTypes = ["fire", "fire_type_1", "volcano", "voc", "others", "calcite", "Unclassified"]
let currentPeriod = "ALL";

/* Carte */

function createMap() {

    const bounds = L.latLngBounds(
        [-85, -180],
        [85, 180]
    );

    const map = L.map("map", {
        minZoom: 3,
        maxBounds: bounds,
        maxBoundsViscosity: 1.0
    }).setView([46.5, 2.5], 6);

    // OPM

    L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap",
            noWrap: true
        }
    ).addTo(map);

    // CARTO

    // L.tileLayer(
    //     "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    //     {
    //         attribution: "&copy; OpenStreetMap &copy; CARTO",
    //         subdomains: "abcd",
    //         noWrap: true
    //     }
    // ).addTo(map);

    // ESRI

    // L.tileLayer(
    //     "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    //     {
    //         attribution: "Tiles &copy; Esri",
    //         noWrap: true
    //     }
    // ).addTo(map);

    return map;
}

async function DisplayMap() {

    map = createMap();

    pointLayer = L.layerGroup().addTo(map);
    hullLayer = L.layerGroup().addTo(map);

    initMapFilters();

    // addClusterLegend(map);

    allData = await loadPlotData();

    // Affichage initial
    refreshMap();
    updateFilterSummary();

    // Redessine la carte lorsque le zoom change
    map.on("zoomend", () => {
        refreshMap();
    });
}

/* Filtrage */

function filterData(data) {
    
    const latestDate = data.reduce((latest, point) => {
        return new Date(point.date) > new Date(latest)
            ? point.date
            : latest;
    }, data[0]?.date);

    return data.filter(point => {
        const isLatestDate = point.date === latestDate;

        const okPeriod =
            currentPeriod === "ALL"
            || point["DAY/NIGHT"] === currentPeriod;

        const okSpecies =
            currentSpecies.length === 0
            || currentSpecies.some(species => {
                if (!point.point_indicators) return false;

                const speciesInPoint = point.point_indicators
                    .split(",")
                    .map(indicator => {
                        const name = indicator.split(":")[0];
                        return name.split("_")[0];
                    });

                return speciesInPoint.includes(species);
            });

        const okTypes =
            currentClusterTypes.includes(point.cluster_category);

        return isLatestDate && okPeriod && okSpecies && okTypes;
    });
}
/* Refresh */

function refreshMap() {

    pointLayer.clearLayers();
    hullLayer.clearLayers();

    const data = filterData(allData);

    drawClusterHulls(hullLayer, data);
    drawPoints(pointLayer, data);  

}

/* Couleur d'un cluster */

function getClusterColor(clusterCategory) {

    return clusterColors[clusterCategory] || "#666666";

}

/* Affichage des points */

function getPointRadius() {

    const zoom = map.getZoom();

    if (zoom <= 3) return 0;
    // if (zoom >= 5) return 50;

    return 3;
}

function drawPoints(pointLayer, data) {

    data.forEach(point => {

        const color = getClusterColor(point.cluster_category);

        if (point.cluster_category === 'extrem') {

            const starIcon = L.divIcon({
                className: 'extrem-marker',
                html: `<span style="color:${color}">*</span>`,
                iconSize: [100, 100],
                iconAnchor: [10, 10],
                popupAnchor: [0, -10]
            });

            L.marker(
                [
                    Number(point.latitude),
                    Number(point.longitude)
                ],
                {
                    icon: starIcon
                }
            )
            .bindPopup(createPopup(point))
            .addTo(pointLayer);

        } else {

            L.circleMarker(
                [
                    Number(point.latitude),
                    Number(point.longitude)
                ],
                {
                    radius: getPointRadius(),
                    color,
                    fillColor: color,
                    fillOpacity: 0.8,
                    weight: 1
                }
            )
            .bindPopup(createPopup(point))
            .addTo(pointLayer);
        }

    });
}

/* Popup */

function createPopup(point) {

    return `
        <b>Date :</b> ${point.date} ${point["DAY/NIGHT"]}<br>
        <b>Cluster :</b> ${point.cluster_number}<br>
        <b>Catégorie :</b> ${point.cluster_category}<br>
        <b>Latitude :</b> ${point.latitude}<br>
        <b>Longitude :</b> ${point.longitude}<br>
        <b>Indicateur(s) :</b> ${point.point_indicators}<br>
    `;

}

/* Regroupement des points par cluster */

function groupByCluster(data) {

    const clusters = {};

    data.forEach(point => {

        const id = point.cluster_number;

        if (!clusters[id]) {
            clusters[id] = [];
        }

        clusters[id].push(point);

    });

    return clusters;

}

/* Dessin des enveloppes convexes */

function drawClusterHulls(hullLayer, data) {

    const clusters = groupByCluster(data);

    Object.entries(clusters).forEach(([clusterId, points]) => {

        if (points.length < 3)
            return;

        // const hull = computeConvexHull(points);
        let hull = computeHull(points);


        hull = turf.buffer(hull, 5, {
            units: "kilometers"
        });

        hull = turf.polygonSmooth(hull, {
            iterations: 4
        });

        if (!hull)
            return;

        const color = getClusterColor(points[0].cluster_category);

        L.geoJSON(hull, {

            style: {
                color: color,
                fillColor: color,
                fillOpacity: 0.20,
                weight: 0.1
            },

            onEachFeature(feature, layer) {

                layer.bindPopup(`
                    <b>Cycle :</b> ${points[0].date} ${points[0]["DAY/NIGHT"]}<br>
                    <b>Cluster :</b> ${clusterId}<br>
                    <b>Catégorie :</b> ${points[0].cluster_category}<br>
                    <b>Nombre de points :</b> ${points.length}<br>
                    <b>Pays :</b> ${points[0]["Country/Sea"]}<br>
                    <b>Région :</b> ${points[0].Region}<br>
                    <b>Indicateur(s) :</b> ${points[0]["cluster_indicators"]}<br>
                `);
               

            }

        }).addTo(hullLayer);

    });

}

/* Calcul de l'enveloppe convexe (Turf) */

// function computeConvexHull(points) {

//     const features = points.map(point =>

//         turf.point([
//             Number(point.longitude),
//             Number(point.latitude)
//         ])

//     );

//     const collection = turf.featureCollection(features);

//     return turf.convex(collection);

// }

function computeHull(points) {

    const features = points.map(point =>
        turf.point([
            Number(point.longitude),
            Number(point.latitude)
        ])
    );

    const collection = turf.featureCollection(features);

    return (
        turf.concave(collection, {maxEdge: 500, units: "kilometers"})
        ||
        turf.convex(collection)
    );
}

/* Filtres ------------------------------------------------------------ */

function initMapFilters() {
    // Période : ALL / DAY / NIGHT
    document.querySelectorAll("[data-period]").forEach(button => {
        button.addEventListener("click", () => {
            currentPeriod = button.dataset.period;
            updatePeriodButtons();
            refreshMap();
        });
    });

    // Espèces
    document.querySelectorAll(".species-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", updateSpeciesFilter);
    });

    // Types de cluster
    document.querySelectorAll(".legend-item").forEach(item => {
        item.addEventListener("click", () => {
            const type = item.dataset.type;

            if (currentClusterTypes.includes(type)) {
                currentClusterTypes = currentClusterTypes.filter(t => t !== type);
            } else {
                currentClusterTypes.push(type);
            }

            updateClusterFilterUI();
            updateFilterSummary();
            refreshMap();
        });
    });

    // Tout sélectionner / tout désélectionner
    const speciesToggle = document.getElementById("species-toggle");
    if (speciesToggle) {
        speciesToggle.addEventListener("click", toggleAllSpecies);
    }

    // Reset
    const resetButton = document.getElementById("reset-filters");
    if (resetButton) {
        resetButton.addEventListener("click", resetMapFilters);
    }

    updatePeriodButtons();
    updateSpeciesFilterUI();
    updateClusterFilterUI();
    updateFilterSummary();
}

function updatePeriodButtons() {
    document.querySelectorAll("[data-period]").forEach(button => {
        const active = button.dataset.period === currentPeriod;

        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });
}

function updateSpeciesFilter() {
    currentSpecies = Array.from(
        document.querySelectorAll(".species-checkbox:checked")
    ).map(checkbox => checkbox.value);

    updateSpeciesFilterUI();
    updateFilterSummary();
    refreshMap();
}

function updateSpeciesFilterUI() {
    const checkboxes = Array.from(
        document.querySelectorAll(".species-checkbox")
    );

    const selectedCount = checkboxes.filter(checkbox => checkbox.checked).length;
    const totalCount = checkboxes.length;

    const countEl = document.getElementById("species-count");
    const summaryEl = document.getElementById("filter-species-count");
    const toggleButton = document.getElementById("species-toggle");

    if (countEl) {
        countEl.textContent = `${selectedCount} / ${totalCount}`;
    }

    if (summaryEl) {
        summaryEl.textContent = `${selectedCount} / ${totalCount}`;
    }

    if (toggleButton) {
        const allSelected = selectedCount === totalCount;
        toggleButton.dataset.state = allSelected ? "all" : "partial";
        toggleButton.textContent = allSelected
            ? "Tout désélectionner"
            : "Tout sélectionner";
    }
}

function toggleAllSpecies() {
    const checkboxes = Array.from(
        document.querySelectorAll(".species-checkbox")
    );

    const allSelected = checkboxes.every(checkbox => checkbox.checked);

    checkboxes.forEach(checkbox => {
        checkbox.checked = !allSelected;
    });

    currentSpecies = checkboxes
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    updateSpeciesFilterUI();
    updateFilterSummary();
    refreshMap();
}

function updateClusterFilterUI() {
    document.querySelectorAll(".legend-item").forEach(item => {
        const active = currentClusterTypes.includes(item.dataset.type);

        item.classList.toggle("active", active);
        item.classList.toggle("inactive", !active);
        item.setAttribute("aria-pressed", String(active));

        const state = item.querySelector(".legend-state");
        if (state) {
            state.textContent = active ? "ON" : "OFF";
        }
    });
}

function updateFilterSummary() {
    const observationCount = document.getElementById("filter-observation-count");
    const speciesCount = document.getElementById("filter-species-count");
    const clusterCount = document.getElementById("filter-cluster-count");

    if (speciesCount) {
        const totalSpecies = document.querySelectorAll(".species-checkbox").length;
        speciesCount.textContent = `${currentSpecies.length} / ${totalSpecies}`;
    }

    if (clusterCount) {
        clusterCount.textContent = `${currentClusterTypes.length} / ${Object.keys(clusterColors).length}`;
    }

    // allData est vide avant le chargement CSV : ne pas appeler filterData dans ce cas.
    if (observationCount) {
        if (allData.length > 0) {
            observationCount.textContent = filterData(allData).length.toLocaleString("fr-FR");
        } else {
            observationCount.textContent = "—";
        }
    }
}

function resetMapFilters() {
    currentPeriod = "ALL";
    currentSpecies = [
        "C2H2", "C2H4", "CaCO3", "CH3OH", "HCN", "HCOOH",
        "HNO3", "CO", "CO2", "NH3", "SO2"
    ];
    currentClusterTypes = Object.keys(clusterColors);

    document.querySelectorAll(".species-checkbox").forEach(checkbox => {
        checkbox.checked = true;
    });

    updatePeriodButtons();
    updateSpeciesFilterUI();
    updateClusterFilterUI();
    updateFilterSummary();
    refreshMap();
}
