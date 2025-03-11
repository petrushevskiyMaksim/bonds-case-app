import { daysMaturity } from '../date/daysMaturity';

export function yieldYearIncome(bond) {
	const { nominalPrice, buyPrice, couponPrice, couponPeriod, brokerTax, NKD } =
		bond;
	const daysToMaturity = daysMaturity(bond);

	const tax = Number(buyPrice) * (Number(brokerTax) / 100);
	const quantityCouponYear = 365 / Math.floor(365 / Number(couponPeriod));
	const yearsToMaturity = Number(daysToMaturity) / 365;
	const difference =
		Number(nominalPrice) - (Number(buyPrice) + Number(NKD) + tax);

	let result;

	if (yearsToMaturity >= 1) {
		result =
			((Number(couponPrice) * quantityCouponYear +
				difference / yearsToMaturity) /
				(Number(buyPrice) + Number(NKD) + Number(tax))) *
			100;
		
	} else {
		result =
			((Number(couponPrice) *
				(Math.floor(yearsToMaturity * quantityCouponYear) + 1) +
				difference) /
				(Number(buyPrice) + Number(tax) + Number(NKD))) *
			100;
		
	}

	return `${Math.floor(result * 100) / 100} % (${calcCouponRub(bond)} руб.)`;
}

export function calcCouponRub(bond) {
	const { nominalPrice, buyPrice, couponPrice, couponPeriod, brokerTax, NKD } =
		bond;
	const daysToMaturity = daysMaturity(bond);

	const tax = Number(buyPrice) * (Number(brokerTax) / 100);
	const quantityCouponYear = 365 / Math.floor(365 / Number(couponPeriod));
	const yearsToMaturity = Number(daysToMaturity) / 365;
	const difference =
		Number(nominalPrice) - (Number(buyPrice) + Number(NKD) + tax);

	let result;

	if (yearsToMaturity >= 1) {
		result =
			((Number(couponPrice) * quantityCouponYear +
				difference / yearsToMaturity) /
				(Number(buyPrice) + Number(buyPrice) * (Number(brokerTax) / 100))) *
			(Number(buyPrice) + Number(buyPrice) * (Number(brokerTax) / 100));
	} else {
		result =
			Number(couponPrice) *
				(Math.floor(yearsToMaturity * quantityCouponYear) + 1) +
			difference;
	}

	return Math.floor(result * 100) / 100;
}
