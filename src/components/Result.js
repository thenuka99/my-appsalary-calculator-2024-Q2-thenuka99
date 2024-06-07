import React from 'react';
import { useSelector } from 'react-redux';

const Result = () => {
  const { basicSalary, grossEarning, grossDeduction, employeeEPF, apit, netSalary, employerEPF, employerETF, costToCompany } = useSelector((state) => state.salary);

  return (
    <div >
    <h2>Your Salary</h2>
    <div>

    <div>
        <div>Items</div>
        <div>Amount</div>
      </div>

      <div>
        <div>Basic Salary</div>
        <div>{basicSalary}</div>
      </div>

      <div>
        <div>Gross Earning</div>
        <div>{grossEarning}</div>
      </div>

      <div>
        <div>Gross Deduction</div>
        <div>-{grossDeduction}</div>
      </div>

      <div>
        <div>Employee EPF (8%)</div>
        <div>-{employeeEPF}</div>
      </div>

      <div>
        <div>APIT</div>
        <div>-{apit}</div>
      </div>      
    </div>

    <div >
      <div>Net Salary (Take Home)</div>
      <div>{netSalary}</div>
    </div>

    <h3>Contribution from the Employer</h3>
    <div>
      <div>
        <div>Employer EPF (12%)</div>
        <div>{employerEPF}</div>
      </div>

      <div>
        <div>Employer ETF (3%)</div>
        <div>{employerETF}</div>
      </div>

      <div>
        <div>CTC (Cost to Company)</div>
        <div>{costToCompany}</div>
      </div>
    </div>
  </div>
);
};

export default Result;
