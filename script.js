// script.js 

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
    const totalPerfs = perfs * jours;
  
    // INSTALLATION
    const forfaitsInstallation = {
      gravite: [
        ["PERFADOM 6", "Installation + suivi", 74.57]
      ]
    };
  
    if (installation && forfaitsInstallation[type]) {
      forfaitsInstallation[type].forEach(f => {
        result += `- ${f[1]} : ${f[0]}<br>`;
      });
    }
  
    // SUIVI - GRAVITE UNIQUEMENT
    if (type === 'gravite') {
      const semainesCompletes = Math.floor(jours / 7);
      const joursRestants = jours % 7;
  
      let codeSuivi = "";
      if (perfs === 1) codeSuivi = "PERFADOM 18";
      else if (perfs === 2) codeSuivi = "PERFADOM 19";
      else if (perfs > 2) codeSuivi = "PERFADOM 20";
  
      const perfsHebdo = semainesCompletes * 7 * perfs;
      const perfsRestantes = totalPerfs - perfsHebdo;
  
      if (semainesCompletes > 0) {
        result += `- Suivi : ${codeSuivi} × ${semainesCompletes}<br>`;
      }
  
      if (perfsRestantes > 0) {
        if (perfsRestantes > 6) {
          result += `- Avertissement : plus de 6 PERFADOM 17 non autorisés par semaine.<br>`;
        }
        if (perfs > 3) {
          result += `- Avertissement : max 3 perfusions/jour autorisées pour PERFADOM 17.<br>`;
        }
        result += `- À la perfusion : PERFADOM 17 × ${perfsRestantes}<br>`;
      }
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
  