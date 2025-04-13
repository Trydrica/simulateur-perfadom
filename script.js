document.getElementById('perfadomForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const type = document.getElementById('type').value;
  const perfs = parseInt(document.getElementById('perfsParJour').value);
  const jours = parseInt(document.getElementById('duree').value);
  const installation = document.getElementById('installation').checked;
  const intercure = document.getElementById('intercure').checked;
  const debranchement = document.getElementById('debranchement').checked;
  const resultDiv = document.getElementById('resultat');
  resultDiv.innerHTML = "";

  if (!type || isNaN(perfs) || perfs < 1 || isNaN(jours) || jours < 1) {
    resultDiv.innerHTML = "<span style='color:red;'>Veuillez remplir correctement tous les champs obligatoires.</span>";
    return;
  }

  let result = "";
  const semaines = Math.ceil(jours / 7);
  const totalPerfs = perfs * jours;

  const forfaits = {
    electrique: [
      ["PERFADOM 1", "Installation 1ère perf", 357.20],
      ["PERFADOM 2", "Installation 2e perf", 52.80],
      ["PERFADOM 7", "Installation 3e perf", 52.80],
      ["PERFADOM 8", "Installation 4e perf", 52.80]
    ],
    diffuseur: [
      ["PERFADOM 4", "Installation 1ère perf", 135.33],
      ["PERFADOM 5", "Installation 2e perf", 52.80],
      ["PERFADOM 7", "Installation 3e perf", 52.80],
      ["PERFADOM 8", "Installation 4e perf", 52.80]
    ],
    gravite: [
      ["PERFADOM 6", "Installation + suivi", 74.57]
    ]
  };

  if (installation) {
    const inst = forfaits[type];
    if (inst) {
      for (let i = 0; i < inst.length && i < perfs; i++) {
        result += `- ${inst[i][1]} : ${inst[i][0]} — ${inst[i][2].toFixed(2)} €<br>`;
      }
    }
  }

  const suivi = {
    electrique: [
      [1, "PERFADOM 30", 240.15],
      [2, "PERFADOM 31", 469.44],
      [3, "PERFADOM 32", 693.36],
      [4, "PERFADOM 33", 815.18]
    ],
    diffuseur: [
      [1, "PERFADOM 25", 113.28],
      [2, "PERFADOM 26", 226.56],
      [3, "PERFADOM 27", 339.84]
    ],
    gravite: [
      [1, "PERFADOM 18", 74.57],
      [2, "PERFADOM 19", 122.97],
      [3, "PERFADOM 20", 204.24]
    ]
  };

  if (type === 'gravite') {
    if (totalPerfs < 15) {
      const semainesPleines = Math.floor(jours / 7);
      const joursRestants = jours % 7;

      if (semainesPleines > 0) {
        result += `- Suivi : PERFADOM 18 × ${semainesPleines} — 74,57 €/semaine<br>`;
      }

      if (joursRestants > 0) {
        const perfsRestantes = joursRestants * perfs;
        result += `- À la perfusion : PERFADOM 17 × ${perfsRestantes} — 10,80 €/perf<br>`;
      }

      if (semainesPleines === 0 && joursRestants === 0) {
        result += `- À la perfusion : PERFADOM 17 × ${totalPerfs} — 10,80 €/perf<br>`;
      }
    } else {
      const suivis = suivi[type];
      let index = Math.min(perfs - 1, suivis.length - 1);
      const [_, code, tarif] = suivis[index];
      result += `- Suivi : ${code} × ${semaines} — ${tarif.toFixed(2)} €/semaine<br>`;
    }
  } else {
    const suivis = suivi[type];
    if (suivis) {
      let index = Math.min(perfs - 1, suivis.length - 1);
      const [_, code, tarif] = suivis[index];
      result += `- Suivi : ${code} × ${semaines} — ${tarif.toFixed(2)} €/semaine<br>`;
    }
  }

  if (intercure) result += "- Entretien inter-cure : PERFADOM 10 — tarif selon perfusion<br>";
  if (debranchement) result += "- Débranchement : PERFADOM 45 — 50 €<br>";

  resultDiv.innerHTML = result || "Aucun forfait applicable.";
});