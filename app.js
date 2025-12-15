const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <h1>BMI Calculator</h1>
        <form method="POST" action="/calculate-bmi">
            Weight (kg): <input name="weight" required><br><br>
            Height (cm): <input name="height" required><br><br>
            <button>Calculate BMI</button>
        </form>
    `);
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
        result = `<span style="color: blue">Underweight: ${bmi}</span>`;
    } else if (bmiNum < 25) {
        result = `<span style="color: green">Normal weight: ${bmi}</span>`;
    } else if (bmiNum < 30) {
        result = `<span style="color: orange">Overweight: ${bmi}</span>`;
    } else {
        result = `<span style="color: red">Obese: ${bmi}</span>`;
    }
    
    res.send(`
        <h2>${result}</h2>
        <a href="/">Calculate Again</a>
    `);
});

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
});
