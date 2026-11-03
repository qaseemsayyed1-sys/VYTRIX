export class AssessmentService {
  static calculateAffordability(income: number, expenses: number, savings: number, purchaseAmount: number) {
    const disposableIncome = income - expenses;
    const monthsToSave = disposableIncome > 0 ? purchaseAmount / disposableIncome : 999;
    const remainingSavings = savings - purchaseAmount;
    
    let status = 'UNSUITABLE';
    if (remainingSavings > 0 && monthsToSave < 1) status = 'HIGHLY_AFFORDABLE';
    else if (remainingSavings > 0 && monthsToSave <= 3) status = 'AFFORDABLE';
    else if (remainingSavings < 0 && monthsToSave <= 6) status = 'STRETCH';

    return {
      status,
      disposableIncome,
      monthsToSave: Math.round(monthsToSave * 10) / 10,
      remainingSavings
    };
  }

  static calculateCheckoutIntegrity(listedPrice: number, discount: number, shipping: number, taxes: number, otherCharges: number, actualCheckoutAmount: number) {
    const expectedTotal = listedPrice - discount + shipping + taxes + otherCharges;
    const discrepancy = actualCheckoutAmount - expectedTotal;
    const isDiscrepancy = Math.abs(discrepancy) > 1;

    return {
      expectedTotal,
      discrepancy,
      isDiscrepancy
    };
  }
}