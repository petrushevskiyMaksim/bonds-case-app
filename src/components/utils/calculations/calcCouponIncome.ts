import { calculateDateDifference } from '../date/daysMaturity';

export function calcCouponIncome(bond) {
	const num =
		((Number(bond.couponPrice) *
			(365 / Math.floor(365 / Number(bond.couponPeriod)))) /
			(Number(bond.buyPrice) +
				Number(bond.NKD) +
				Number(bond.buyPrice) * (Number(bond.brokerTax) / 100))) *
		100;

	return `${Math.floor(num * 100) / 100} % (${calcCouponRub(bond)} руб.)`;
}

export function calcCouponRub(bond) {
	const daysToMaturity = calculateDateDifference(bond);
	const quantityCouponYear = 365 / Math.floor(365 / Number(bond.couponPeriod));
	const yearsToMaturity = Number(daysToMaturity) / 365;

	const result =
		Number(bond.couponPrice) *
			(Number(
				Math.floor(yearsToMaturity /*0.997*/ * quantityCouponYear /*2.005*/)
			) +
				1) -
		bond.NKD;

	return `${Math.floor(result * 100) / 100}`;
}
