// Клас для математичних обчислень
class MathUtils {
	static normalCDF(x, mean, std) {
		return (1 + this.erf((x - mean) / (Math.sqrt(2) * std))) / 2;
	}

	static erf(x) {
		let sign = (x < 0) ? -1 : 1;
		x = Math.abs(x);
		let t = 1 / (1 + 0.3275911 * x);
		let y = 1 - ((((1.061405429 * t + -1.453152027) * t + 1.421413741) * t + -0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
		return sign * y;
	}
}

// Клас для обчислення даних СЕС
class SolarCalculator {
	constructor(averagePower, errorBefore, errorAfter, energyPrice) {
		this.averagePower = averagePower;
		this.errorBefore = errorBefore;
		this.errorAfter = errorAfter;
		this.energyPrice = energyPrice;
	}

	calculateResults() {
		let delta1 = MathUtils.normalCDF(5.25, 5, this.errorBefore) - MathUtils.normalCDF(4.75, 5, this.errorBefore);
		let delta2 = MathUtils.normalCDF(5.25, 5, this.errorAfter) - MathUtils.normalCDF(4.75, 5, this.errorAfter);

		let w1 = this.averagePower * 24 * delta1;
		let w2 = this.averagePower * 24 * (1 - delta1);
		let w3 = this.averagePower * 24 * delta2;
		let w4 = this.averagePower * 24 * (1 - delta2);
		
		let profit1 = w1 * this.energyPrice * 1000;
		let profit2 = w3 * this.energyPrice * 1000;
		let fine1 = w2 * this.energyPrice * 1000;
		let fine2 = w4 * this.energyPrice * 1000;
		let totalProfit = profit2 - fine2;

		return {
			profitBefore: profit1,
			fineBefore: fine1,
			profitAfter: profit2,
			fineAfter: fine2,
			totalProfit: totalProfit
		};
	}

	clone() {
		return new SolarCalculator(
			this.averagePower,
			this.errorBefore,
			this.errorAfter,
			this.energyPrice
		);
	}
}

export { MathUtils, SolarCalculator };