function saveReflections() {
      const answers = {
        q1: document.getElementById('q1').value,
        q2: document.getElementById('q2').value,
        q3: document.getElementById('q3').value,
        q4: document.getElementById('q4').value,
        q5: document.getElementById('q5').value,
        date: new Date().toISOString()
      };
      localStorage.setItem('reflections', JSON.stringify(answers));
      alert('Reflections saved locally!');
    }

    function downloadCSV() {
      const data = JSON.parse(localStorage.getItem('reflections'));
      if (!data) { alert('No reflections to download.'); return; }
      const rows = [['Date','Resonance','Transformation','Challenges','Support','Future'],
                    [data.date,data.q1,data.q2,data.q3,data.q4,data.q5]];
      let csv = rows.map(r => r.map(v => '"'+v.replace(/"/g,'\"')+'"').join(",")).join("\n");
      const blob = new Blob([csv], {type: 'text/csv'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reflections.csv';
      a.click();
      URL.revokeObjectURL(url);
    }

    function copyAll() {
      const data = JSON.parse(localStorage.getItem('reflections'));
      if (!data) { alert('No reflections saved.'); return; }
      const text = `Date: ${data.date}\nResonance: ${data.q1}\nTransformation: ${data.q2}\nChallenges: ${data.q3}\nSupport: ${data.q4}\nFuture: ${data.q5}`;
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }

    function clearAll() {
      localStorage.removeItem('reflections');
      document.getElementById('reflectionForm').reset();
    }

    function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text("Reflection Notes", 10, 10);

    reflections.forEach((ref, i) => {
        doc.setFontSize(12);
        doc.text(`${i + 1}. ${ref}`, 10, 20 + (i * 10));
    });

    doc.save("reflections.pdf");
}

let reflections = [];

    function saveReflection() {
      const input = document.getElementById('reflectionInput');
      if (input.value.trim() !== "") {
        reflections.push(input.value.trim());
        alert("Reflection saved!");
        input.value = "";
      } else {
        alert("Please write something first.");
      }
    }

    function downloadCSV() {
      let csvContent = "data:text/csv;charset=utf-8,Reflection\n";
      reflections.forEach(r => {
        csvContent += `"${r.replace(/"/g, '""')}"\n`;
      });
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "reflections.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function downloadPDF() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Reflection Notes", 10, 10);
      reflections.forEach((ref, i) => {
        doc.setFontSize(12);
        doc.text(`${i + 1}. ${ref}`, 10, 20 + (i * 10));
      });
      doc.save("reflections.pdf");
    }

    function copyReflections() {
      if (reflections.length === 0) {
        alert("No reflections to copy.");
        return;
      }
      navigator.clipboard.writeText(reflections.join("\n"))
        .then(() => alert("Copied to clipboard!"));
    }

    function resetReflections() {
      reflections = [];
      alert("All reflections cleared.");
    }

    // Collect answers
function getAnswers() {
  return [
    document.getElementById('q1').value,
    document.getElementById('q2').value,
    document.getElementById('q3').value,
    document.getElementById('q4').value,
    document.getElementById('q5').value
  ];
}

// Download CSV
function downloadCSV() {
  const answers = getAnswers();
  let csv = "Question,Answer\n";
  answers.forEach((ans, i) => {
    csv += `"Q${i + 1}","${ans.replace(/"/g, '""')}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "reflections.csv";
  link.click();
}

// Download PDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const answers = getAnswers();

  doc.setFontSize(16);
  doc.text("Inner Alignment Reflections", 10, 10);

  const questions = [
    "1. Emotional Resonance",
    "2. Personal Transformation",
    "3. Overcoming Challenges",
    "4. Support Systems",
    "5. Future Aspirations"
  ];

  let y = 20;
  answers.forEach((ans, i) => {
    doc.setFontSize(12);
    doc.text(questions[i], 10, y);
    y += 8;
    doc.setFontSize(11);
    // Wrap text to avoid going off page
    let splitText = doc.splitTextToSize(ans || "—", 180);
    doc.text(splitText, 10, y);
    y += splitText.length * 6 + 10;

    // Add new page if reaching bottom
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("reflections.pdf");
}

// Copy to clipboard
function copyAll() {
  const answers = getAnswers();
  navigator.clipboard.writeText(answers.join("\n\n"))
    .then(() => alert("Copied to clipboard!"));
}

// Clear all
function clearAll() {
  ['q1','q2','q3','q4','q5'].forEach(id => document.getElementById(id).value = "");
}
