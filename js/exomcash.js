const axeContent = {

  detection_exocamsh: {
    title: "Détection temps réel d'évènements extrêmes atmosphériques",
    sections : [
      {
      side : "right",
      text: `
        SPASCIA développe des approches originales de filtrage et de sélection des données en temps réel pour des exploitations scientifiques et de services, applicables au traitement opérationnel des instruments spatiaux de sondage atmosphérique. 

        A l’origine, les travaux ont porté sur l’exploitation spécifique d’une méthode particulièrement adaptée au filtrage et à l’analyse des spectres ; l’analyse en composante principale (ACP). Cette approche a d’abord été développée puis mise en opération sur l’instrument IASI pour la détection d’évènements extrêmes et a donné d’excellents résultats, notamment pour la détection et le suivi des feux et des volcans. Nous l’avons appliquée sur un second instrument spatial de sondage, Sentinel 5 Précurseur (S5P), pour démontrer là aussi un fort potentiel, très complémentaire à celui de IASI, pour le suivi et à la caractérisation temps-réel des feux. Nous travaillons depuis 2024 également sur <a href="products.html" class='axe-detail__link'>l'application à IASI d'une nouvelle méthode basée sur l'ACP</a> pour l’analyse des grandes composantes de la variabilité atmosphérique et l’évaluation des modèles de climat. En 2025, nous testons l’application de cette méthode sur un radiomètre, Sentinel 3/SLSTR, pour la détection des torchère et des émissions de méthane.
        `,
      image: "../Media/spc_iasi_day.png",
      imageCredit: {
        description: "[.................]",
        source:  "SPASCIA",
        author: "Sarah Pipien"
      }
      },
      {
        side: "left",
        text : `
        SPASCIA mène également des travaux de R&D permettant de proposer ou tester, et valider, des solutions applicables à l’opérationnel de caractérisation et d’exploitation des mesures des sondeurs. En 2024, nous avons en particulier validé et évalué l’utilisation d’une configuration optimisée de la caractérisation du bruit sur la mesure IASI (NMC pour Noise Covariance Matrix). En 2025, nous avons effectué une revue des outils et méthodes pour l’exploitation multi-instruments et multi-produits des donnés de sondage atmosphérique. Dans le cadre de l’accompagnement d’une thèse cofinancée par SPASCIA, nous avons effectué des travaux de R&D pour préparer la mesure de gaz polluant, le NH3, depuis l’orbite géostationnaire.

        Enfin, nous investissons depuis 2025 sur le développement d’approches basées sur l’intelligence artificielle : des travaux de R&D interne pour le développement de méthodes de réseaux de neurones pour la restitution rapide de variables atmosphériques à partir des sondeur hyperspectraux dans l’infrarouge thermique, et la mise en œuvre d’une thèse CIFRE pour la détection d'événements extrêmes par la synergie entre les données spatiales et l'intelligence artificielle.
        `,
        image: "../Media/article_tourdumonde_hawai_pca.png",
        imageCredit: {
          description: "[.................]",
          source:  "SPASCIA",
          author: "Sarah Pipien"
        }
      }
      
    ]

  },

  quantification_exocamsh: {
    title: "Quantification des émissions de polluants",
    sections : [{
      text: `
      Nous avons étendus nos réflexions et travaux de développement de méthodes efficaces, capables d’exploiter de façon systématique des grandes quantités de mesures des sondeurs IASI ou S5P, à d’autres questions : approche pour identifier les épisodes de pollutions des villes à partir des produits de niveau 2 des sondeurs (notamment de S5P) ; méthodes de détection et de quantification des sources de polluants au sol à partir du sondeur spatial S5P. 
      
      Ces travaux permettent de mettre en place des traitements et des produits qui visent à termes à alimenter des services de monitoring de la qualité de l’air et de soutien aux politiques environnementales. Ces travaux permettent également de mettre en évidence les limites des sondeurs atmosphériques et les recommandations/spécifications vers les futurs sondeurs pour la mesure des émissions de polluants depuis l’espace.
      `,
      image: "../Media/concentrations-dioxyde-azote-france.jpg",
      side : "left",
      imageCredit: {
        description: "Cartes des concentrations de dioxyde d'azote en France. A gauche : en mars 2019. A droite : en mars 2020, pendant la pandémie de Covid-19 ",
        source:  "Centre National des Études Spatiales (CNES)",
        // author: "Adrien DESCHAMPS",
        // licence: "CC BY-SA 3.0",
        link: "https://cnes.fr/dossiers/pollution"
      }
    }]
  },

  ozone_exocamsh: {
    title: "Analyse et évaluation de la mesure de l'ozone",
    sections: [{
      text: `
      En collaboration avec le centre de données et de services AERIS et le laboratoire LATMOS, nous analysons et évaluons scientifiquement les mesures d’ozone atmosphérique IASI sur toute la durée de vie des instruments IASI (2008 à aujourd’hui) au moyen d’approches et de travaux approfondis d'intercomparaison et d’analyse utilisant des observations indépendantes (satellite, sol ou aéroportées). Ces produits sont qualifiés et distribués par le laboratoire LATMOS1 aux centres opérationnels Copernicus d’analyse et de prévision de la qualité de l’air et du climat. 
      
      Cette activité scientifique multi-annuelle s’appuie sur une démarche scientifique reproductible, basée sur un cycle continu d’itérations, et une gestion fine des données atmosphériques à grande échelle, au service de la communauté scientifique et des politiques environnementales.
      `,
      image: "../Media/Uars_ozone_waves.jpg",
      side : "right",
      imageCredit: {
        description: "Comparaison de l'appauvrissement de la couche d'ozone en Amérique du Nord entre 1984 et 1997. Contrairement à une idée reçue, l'appauvrissement de la couche d'ozone ne touche pas exclusivement le pôle Sud.",
        source:  "NASA",
        // author: "Adrien DESCHAMPS",
        // licence: "CC BY-SA 3.0",
        link: "http://earthobservatory.nasa.gov/IOTD/view.php?id=1771f"
      }
    }]
  },

  concepts_exocamsh: {
    title: "Études pour de nouveaux concepts de mission opérationnelle",
    sections: [{
      text: `
      Nous avons initié en 2024 des travaux de recherche et développements contribuant à la préparation, par le CNES, d’un nouveau concept d’instrument original pour améliorer la mesure de la température et de la vapeur d’eau de l’atmosphère dans les basses couches : CMIM (Constellation de MIni sondeurs pour la Météorologie). Ce concept vise à fournir des mesures spatiales permettant d’améliorer encore les prévisions météorologiques à fine échelle, en proposant des solutions instrumentales pour diminuer le cout des missions. 
      
      Cette année, SPASCIA mène une étude métier pour l’analyse de faisabilité de nouvelle méthode de sondage des profils de température et de vapeur d’eau dans l’infrarouge, qui contribue à la définition et au développement de CMIM.
      `,
      image: "../Media/cmim.png",
      side : "left",
      imageCredit: {
        description: "Orbital configuration for a 8 satellite constellation, 2 satellites per plane",
        source:  "Centre National des Études Spatiales (CNES)",
        author: "Adrien DESCHAMPS",
        // licence: "CC BY-SA 3.0",
        link: "https://lps25.esa.int/lps25-presentations/presentations/2904/_2904.pdf"
      }
    }]
  },

  physique_mesure_megese: {
    title: "Physique de la mesure",
    sections: [{
      text: `
      SPASCIA cherche activement à progresser sur la physique de la mesure de GES dans l’atmosphère par télédétection et à développer et tester des méthodes originales de restitution des concentrations de GES. En 2025, nous avons progressés sur la caractérisation des performances et des biais de restitution du méthane à partir de la mesure dans le TIR (Thermal InfraRed) à partir de mesure IASI. Nous avons continué nos travaux sur la caractérisation de la spectroscopie du méthane dans le TIR, en exploitant des données spectroscopiques et expérimentales pour améliorer la représentation des interférences entre raies dans les codes de transfert radiatif permettant de simuler la mesure. Nous avons progressé sur les aspects algorithmiques et méthodologiques d’une nouvelle méthode d’inversion combinant des mesures dans le TIR et dans le SWIR (Short Wave InfraRed) de CH4 en consolidant et en évaluant la chaine de traitement SWIR/TIR par rapport aux inversions classiques utilisant le TIR ou le SWIR, sur une zone d’étude spécifique disposant de mesures aéroportées indépendantes. Enfin, nous avons continué nos travaux scientifiques de de développement et de validation, à la demande d’EUMETSAT, de nouvelles méthodes  de Machine Learning pour la restitution du CO2 et du N2O à partir de IASI (en préparation de IASI-NG).
      `,
      image: "../Media/swir.jpeg",
      side: "right",
      imageCredit: {
        description: "AID",
        source:  "Ministère des Armées et des Anciens Combattants",
        // author: "GLODAP",
        // licence: "CC BY-SA 3.0",
        link: "https://www.defense.gouv.fr/aid/actualites/voir-linvisible-lagence-soutient-projet-developper-solutions-surveillance-swir-haute-definition"
      }
    }]
  },

    analyse_perf_megese: {
    title: "Analyse de performance et traitement de données/produits",
    sections: [{
      text: `
      SPASCIA exploite les produits géophysiques GES restitués à partir de la mesure pour quantifier les émissions de surface. En 2025, nos travaux se sont essentiellement concentrés à consolider la préparation à l’exploitation des futures mesures MicroCarb mode City. La méthode d’inversion des sources de CO2 à partir d’images MicroCarb City Mode (MCM), développée par SPASCIA, a été utilisée avec le CNES pour tester la performance et améliorer les traitements des donnée MCM, et à préparer la chaine de traitement pour exploiter les données. La mission MicroCarb a été lancée avec succès à l’éte 2025. Elle est en phase de commissioning, et nos travaux sont maintenant en attente de la disponibilité de produits calibrés et validés pour traiter et analyser scientifiquement ces données avec les méthodes mises en place.
      `,
      image: "../Media/microcarb-mode-exploratoire-city-zoom-regions-interet.png",
      side: "left",
      imageCredit: {
        description: "Mode exploratoire « City » : Zoom au-dessus de régions d’intérêt",
        source:  "Centre National des Études Spatiales (CNES)",
        // author: "GLODAP",
        // licence: "CC BY-SA 3.0",
        link: "https://cnes.fr/projets/microcarb/en-details"
      }
    }]
  },

    teledetection_megese: {
    title: "Télédétection de fuites de gaz",
    sections: [{
      text: `
      SPASCIA s’attache à développer et approfondir les concepts de mesure et les méthodes d’exploitation de ces mesures pour la restitution des émissions anthropiques de GES à très fine échelle, à partir des spectro-imageurs hyperspectraux à haute résolution spatiale. En 2025, nous avons continué à développer la méthode de traitement end-to-end du niveau 1 (L1) au niveau 4 (L4), basée sur la modélisation Gaussienne du panache et l’inversion par estimation optimale, pour l’exploitation de la mesure d’imagerie hyperspectrale. Nous contniuons également nos travaux pour le développement et la validation d’un nouveau concept instrumental, basé sur une approche originale de mesure d’interférogrammes partiels multi-spectraux (MSPI pour Multi Spectral Partial Interferogram), permettant de proposer une capacité embarquée (aéroportée et spatiale) d’imagerie des gaz atmosphériques à très haute résolution spatiale avec des de bonnes performances. Ce projet se fait en partenariat avec Thales Alenia Space et l’Institut de Recherche et Technologie Saint Exupery, et avec le soutien et le suivi de l’ESA, du CNES et de EUMETSAT. Un positionnement stratégique et des soutiens financiers sont en place pour le développement d’une solution spatiale et d’une solution aéroportée pour la mesure du CO2 atmosphérique, et SPASCIA mène un travail scientifique de définition des objectifs mission et des produits, d’évaluation de leurs performances, et de développement des chaines de traitements de niveaux 2 et 4, en ligne avec le plan de développement et de démonstration sur 2025-2028.
      `,
      image: "../Media/Annual_mean_sea_surface_dissolved_inorganic_carbon_for_the_1990s_(GLODAP).png",
      side: "right",
      imageCredit: {
        description: "Concentration moyenne annuelle de carbone inorganique dissous (DIC) dans les eaux de surface des océans durant les années 1990.",
        source:  "Global Ocean Data Analysis Project (GLODAP), via Wikimedia Commons",
        author: "GLODAP",
        licence: "CC BY-SA 3.0",
        link: "https://commons.wikimedia.org/wiki/File:Annual_mean_sea_surface_dissolved_inorganic_carbon_for_the_1990s_(GLODAP).png"
      }
    }]
    }
};

function renderAxeDetail(axeKey) {
  const data = axeContent[axeKey];
  const container = document.getElementById("axe-detail");

  if (!data || !container) return;

  let html = `<div class="axe-detail">`;

  data.sections.forEach((section, index) => {

    // Bulle d'information de l'image
    let imageCreditHtml = "";

    if (section.imageCredit) {
      imageCreditHtml = `
        <div class="axe-detail__comment">

          ${
            section.imageCredit.description
              ? `${section.imageCredit.description}<br><br>`
              : ""
          }

          ${
            section.imageCredit.source
              ? `<strong>Source :</strong> ${section.imageCredit.source}<br>`
              : ""
          }

          ${
            section.imageCredit.author
              ? `<strong>Auteur :</strong> ${section.imageCredit.author}<br>`
              : ""
          }

          ${
            section.imageCredit.licence
              ? `<strong>Licence :</strong> ${section.imageCredit.licence}<br>`
              : ""
          }

          ${
            section.imageCredit.link
              ? `<br>
                 <a href="${section.imageCredit.link}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Voir la source
                 </a>`
              : ""
          }

        </div>
      `;
    }

    html += `
      <div class="axe-detail__section">

        ${
          section.image
            ? `
              <div class="axe-detail__img-wrapper axe-detail__img-wrapper--${section.side}">
                <img
                    class="axe-detail__img"
                  src="${section.image}"
                  alt="${data.title}">
                ${imageCreditHtml}
              </div>
            `
            : ""
        }

        ${
          index === 0
            ? `<h3 class="axe-detail__title">${data.title}</h3>`
            : ""
        }

        <p>${section.text}</p>

      </div>
    `;
  });

  html += `</div>`;

  container.innerHTML = html;
}

function initGrid(selector) {
  const boxes = document.querySelectorAll(`${selector} .box`);
  if (!boxes.length) return;

  boxes.forEach(box => {
    box.addEventListener("click", () => {
      boxes.forEach(b => b.classList.remove("active"));
      box.classList.add("active");
      renderAxeDetail(box.dataset.axe);
    });
  });

  boxes[0].classList.add("active");
  renderAxeDetail(boxes[0].dataset.axe);
}

document.addEventListener("DOMContentLoaded", () => {
  initGrid(".exomcash-grid");
  initGrid(".megese-grid");
});