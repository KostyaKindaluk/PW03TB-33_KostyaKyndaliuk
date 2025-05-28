import { SolarCalculator } from "./utils.js";

class App {
	constructor() {
		let calculatorForm = document.getElementById("profit-calculator");
		calculatorForm.addEventListener("submit", (event) => this.calculator_form_submit(event));
		this.hide_results();
	}

	//Обробка запиту на обрахунок
	calculator_form_submit(event) {
		event.preventDefault();
		
		let averagePower = parseFloat(document.getElementById("average-power").value);
		let errorBefore = parseFloat(document.getElementById("error-before").value);
		let errorAfter = parseFloat(document.getElementById("error-after").value);
		let energyPrice = parseFloat(document.getElementById("energy-price").value);
		
		if (
			isNaN(averagePower) || isNaN(errorBefore) || 
			isNaN(errorAfter) || isNaN(energyPrice)
		) {
			alert("Будь ласка, введіть коректні числові значення.");
			return;
		}
		
		let solarCalculator = new SolarCalculator(averagePower, errorBefore, errorAfter, energyPrice);
		this.show_results(solarCalculator.calculateResults());
	}

	//Показати результати на екрані
	show_results(results) {
		document.getElementById("profit-before").textContent = results.profitBefore.toFixed(2);
		document.getElementById("fine-before").textContent = results.fineBefore.toFixed(2);
		document.getElementById("profit-after").textContent = results.profitAfter.toFixed(2);
		document.getElementById("fine-after").textContent = results.fineAfter.toFixed(2);
		document.getElementById("total-profit").textContent = results.totalProfit.toFixed(2);
		
		document.getElementById("results").style.display = "block";
	}

	//Приховати результати
	hide_results() {
		document.getElementById("results").style.display = "none";
	}
}

export { App };