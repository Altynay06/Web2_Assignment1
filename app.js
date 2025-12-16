const express = require('express');
const app = express();
const PORT = 2025;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Health BMI</title>
        <style>${cssStyles}</style>
    </head>
    <body>
        <div class="app-container">
            <div class="daily-card">
                Daily Health Task: Calculate your BMI today
            </div>
            
            <div class="calculator-card">
                <h2 style="margin-top:0; color:#333;">BMI Calculator</h2>
                <form method="POST" action="/calculate-bmi">
                    <div class="input-row">
                        <div class="input-box">
                            <label class="input-label">Weight (kg)</label>
                            <input type="number" name="weight" class="input-field" required 
                                   step="0.1" min="1" placeholder="Enter weight">
                        </div>
                        <div class="input-box">
                            <label class="input-label">Height (cm)</label>
                            <input type="number" name="height" class="input-field" required 
                                   step="0.1" min="1" placeholder="Enter height">
                        </div>
                    </div>
                    <button type="submit" class="calculate-btn">Calculate BMI</button>
                </form>
            </div>
        </div>
    </body>
    </html>
    `;
    res.send(html);
});

app.post('/calculate-bmi', (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    
    if (!weight || !height || weight <= 0 || height <= 0) {
        return res.send('Error: Enter positive numbers<br><a href="/">Back</a>');
    }
    
    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(2);
    const bmiNum = parseFloat(bmi);
    

    let result = '';
    if (bmiNum < 18.5) {
        category = "Underweight";
        color = "#3498db"; // синий
    } else if (bmiNum < 25) {
        category = "Normal Weight";
        color = "#2ecc71"; // зеленый
    } else if (bmiNum < 30) {
        category = "Overweight";
        color = "#f39c12"; // оранжевый
    } else {
        category = "Obese";
        color = "#e74c3c"; // красный
    }
    
    // Результат
    const resultHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>BMI Result</title>
        <style>${cssStyles}</style>
    </head>
    <body>
        <div class="result-container">
            <div class="result-card">
                <h2 style="color:#333; margin-top:0;">BMI Result</h2>
                
                <div class="bmi-circle" style="border-color: ${color};">
                    <div class="bmi-value">${bmi}</div>
                    <div class="bmi-label">BMI</div>
                </div>
                
                <div class="category" style="background: ${color};">${category}</div>
                
                <div class="info-box">
                    <div class="info-row">
                        <span>Weight:</span>
                        <span><strong>${weight} kg</strong></span>
                    </div>
                    <div class="info-row">
                        <span>Height:</span>
                        <span><strong>${height} cm</strong></span>
                    </div>
                    <div class="info-row">
                        <span>Status:</span>
                        <span style="color:${color}; font-weight:bold;">${category}</span>
                    </div>
                </div>
                
                <a href="/" class="back-btn">Calculate Again</a>
            </div>
        </div>
    </body>
    </html>
    `;
    
    res.send(resultHtml);
});

app.listen(PORT, () => {
    console.log(`✅ Server running: http://localhost:${PORT}`);
});
