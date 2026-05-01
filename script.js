document.getElementById('convertBtn').addEventListener('click', function() {
    const size = parseFloat(document.getElementById('shoeSize').value);
    const from = document.getElementById('countryFrom').value.toUpperCase().trim();
    const targets = document.querySelectorAll('input[name="target"]:checked');
    const resultBox = document.getElementById('resultBox');

    // 1. Check if input is valid
    if (isNaN(size) || !from || targets.length === 0) {
        alert("Please enter a size, a 'from' country, and select at least one destination.");
        return;
    }

    let resultsText = `✨ CONVERSION RESULTS ✨\n━━━━━━━━━━━━━━━━━━━━\n`;
    let jsonData = { original: { size, from }, conversions: [] };

    // 2. Conversion Loop
    targets.forEach(target => {
        let convertedValue = 0;
        const toCountry = target.value;

        // Math Logic
        if (from === 'UK') {
            if (toCountry === 'US') convertedValue = size + 1;
            else if (toCountry === 'EU') convertedValue = size + 33;
            else if (toCountry === 'JP') convertedValue = size + 18;
            else if (toCountry === 'AU') convertedValue = size + 1;
            else if (toCountry === 'MX') convertedValue = size + 1;
            else if (toCountry === 'CN') convertedValue = size + 35.5;
            else if (toCountry === 'BR') convertedValue = size + 31;
        } else if (from === 'US') {
            if (toCountry === 'UK') convertedValue = size - 1;
            else if (toCountry === 'EU') convertedValue = size + 32;
            else if (toCountry === 'JP') convertedValue = size + 17;
            else if (toCountry === 'AU') convertedValue = size;
            else if (toCountry === 'MX') convertedValue = size;
        }
        // Add more 'else if' blocks for other 'from' countries here

        resultsText += `${toCountry}: ${convertedValue}\n`;
        jsonData.conversions.push({ country: toCountry, size: convertedValue });
    });

    // 3. Finalize Results Box
resultsText += `\n--------------------------\nReady to shop!`;
resultBox.value = resultsText;

    // 4. Activate Download Buttons
    const dlBtns = document.querySelectorAll('.dl-btn');
    dlBtns.forEach(btn => btn.disabled = false);

    document.getElementById('dlTxt').onclick = () => downloadFile(resultsText, 'shoe-size.txt', 'text/plain');
    document.getElementById('dlJson').onclick = () => downloadFile(JSON.stringify(jsonData, null, 2), 'shoe-size.json', 'application/json');
    document.getElementById('dlPdf').onclick = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(resultsText, 10, 10);
        doc.save('shoe-size.pdf');
    };
});

// 5. Shared Download Function
function downloadFile(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
// --- THE ULTIMATE CLEAR ALL FIX ---
document.getElementById('clearBtn').addEventListener('click', function() {
    
    // 1. Clear the "Enter Size" and "Country (e.g. UK)" inputs
    // We target them by their placeholder text to be 100% sure
    document.querySelector('input[placeholder="Enter Size"]').value = '';
    document.querySelector('input[placeholder*="Country"]').value = '';

    // 2. Uncheck EVERY checkbox in the destination list
    const allCheckboxes = document.querySelectorAll('.destination-countries input[type="checkbox"]');
    allCheckboxes.forEach(box => {
        box.checked = false;
    });

    // 3. Clear the Results Box
    // In your code this is likely 'resultsText' or 'resultBox'
    const displayArea = document.getElementById('resultBox') || document.getElementById('resultsDisplay');
    if (displayArea) {
        displayArea.value = 'Your converted sizes will appear here...';
    }

    // 4. Reset the Download Buttons to grey/disabled
    const dlBtns = document.querySelectorAll('.dl-btn');
    dlBtns.forEach(btn => btn.disabled = true);
    
    console.log("Page cleared and reset!");
});