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
  
    // INSTALLATION
    const forfaitsInstallation = {
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
      const inst = forfaitsInstallation[type];
      if (inst) {
        for (let i = 0; i < inst.length && i < perfs; i++) {
          result += `- ${inst[i][1]} : ${inst[i][0]} — ${inst[i][2].toFixed(2)} €<br>`;
        }
      }
    }
  
    // SUIVI
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
      } else {
        // ≥ 15 perfusions
        let code, tarif;
        if (perfs === 1) [code, tarif] = ["PERFADOM 18", 74.57];
        else if (perfs === 2) [code, tarif] = ["PERFADOM 19", 122.97];
        else [code, tarif] = ["PERFADOM 20", 204.24];
  
        result += `- Suivi : ${code} × ${semaines} — ${tarif.toFixed(2)} €/semaine<br>`;
      }
    }
  
    else if (type === 'electrique') {
      let code, tarif;
      if (perfs === 1) [code, tarif] = ["PERFADOM 30", 240.15];
      else if (perfs === 2) [code, tarif] = ["PERFADOM 31", 469.44];
      else if (perfs === 3) [code, tarif] = ["PERFADOM 32", 693.36];
      else [code, tarif] = ["PERFADOM 33", 815.18];
  
      result += `- Suivi : ${code} × ${semaines} — ${tarif.toFixed(2)} €/semaine<br>`;
    }
  
    else if (type === 'diffuseur') {
      let code, tarif;
      if (perfs === 1) [code, tarif] = ["PERFADOM 25", 113.28];
      else if (perfs === 2) [code, tarif] = ["PERFADOM 26", 226.56];
      else [code, tarif] = ["PERFADOM 27", 339.84];
  
      result += `- Suivi : ${code} × ${semaines} — ${tarif.toFixed(2)} €/semaine<br>`;
    }
  
    // AUTRES FORFAITS
    if (intercure) {
      result += "- Entretien inter-cure : PERFADOM 10 — tarif selon perfusion<br>";
    }
  
    if (debranchement) {
      result += "- Débranchement : PERFADOM 45 — 50 €<br>";
    }
  
    resultDiv.innerHTML = result || "Aucun forfait applicable.";
  });