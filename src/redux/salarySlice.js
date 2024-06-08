import { createSlice } from '@reduxjs/toolkit';

const initialState = loadState() || {
  basicSalary: 0,
  earnings: [],
  deductions: [],
  grossEarning: 0,
  grossDeduction: 0,
  employeeEPF: 0,
  apit: 0,
  netSalary: 0,
  employerEPF: 0,
  employerETF: 0,
  costToCompany: 0,
};

const salarySlice = createSlice({
  name: 'salary',
  initialState,
  reducers: {
    setBasicSalary(state, action) {
      state.basicSalary = action.payload;
      calculateSalary(state);
      saveState(state);
    },
    addEarning(state, action) {
      state.earnings.push(action.payload);
      calculateSalary(state);
      saveState(state);
    },
    updateEarning(state, action) {
      const { index, earning } = action.payload;
      state.earnings[index] = earning;
      calculateSalary(state);
      saveState(state);
    },
    deleteEarning(state, action) {
      state.earnings.splice(action.payload, 1);
      calculateSalary(state);
      saveState(state);
    },
    addDeduction(state, action) {
      state.deductions.push(action.payload);
      calculateSalary(state);
      saveState(state);
    },
    updateDeduction(state, action) {
      const { index, deduction } = action.payload;
      state.deductions[index] = deduction;
      calculateSalary(state);
      saveState(state);
    },
    deleteDeduction(state, action) {
      state.deductions.splice(action.payload, 1);
      calculateSalary(state);
      saveState(state);
    },
    reset(state) {
      saveState({basicSalary: 0,
        earnings: [],
        deductions: [],
        grossEarning: 0,
        grossDeduction: 0,
        employeeEPF: 0,
        apit: 0,
        netSalary: 0,
        employerEPF: 0,
        employerETF: 0,
        costToCompany: 0,});
      return {basicSalary: 0,
        earnings: [],
        deductions: [],
        grossEarning: 0,
        grossDeduction: 0,
        employeeEPF: 0,
        apit: 0,
        netSalary: 0,
        employerEPF: 0,
        employerETF: 0,
        costToCompany: 0,};
    },
  },
});

function calculateSalary(state) {
  let totalEarnings = state.basicSalary + state.earnings.reduce((sum, earning) => sum + earning.value, 0);
  state.grossDeduction = state.deductions.filter(deduction => deduction.epf).reduce((sum, deduction) => sum + deduction.value, 0);
  state.grossEarning = totalEarnings - state.grossDeduction;
  let grossSalaryForEPF = state.basicSalary +  state.earnings.filter((earning) => earning.epf).reduce((sum, earning) => sum + earning.value, 0) -  state.grossDeduction;

  state.employeeEPF = grossSalaryForEPF * 0.08;
  state.employerEPF = grossSalaryForEPF * 0.12;
  state.employerETF = grossSalaryForEPF * 0.03;

  state.apit =  (state.grossEarning * 0.18) - 25500;

  state.netSalary = state.grossEarning - state.employeeEPF- state.apit;
  state.costToCompany = state.grossEarning + state.employerEPF + state.employerETF;
}

function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('salaryState', serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
}

function loadState() {
  try {
    const serializedState = localStorage.getItem('salaryState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
}

export const { setBasicSalary, addEarning, updateEarning, deleteEarning, addDeduction, updateDeduction, deleteDeduction, reset } = salarySlice.actions;
export default salarySlice.reducer;
