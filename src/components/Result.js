import React from 'react';
import { useSelector } from 'react-redux';

const Result = () => {
  const { basicSalary, grossEarning, grossDeduction, employeeEPF, apit, netSalary, employerEPF, employerETF, costToCompany } = useSelector((state) => state.salary);

  return (
    <div className=' bg-white mr-32 mt-36 p-3 border-white-gray border rounded-none' >
    <h2 className=' font-bold '>Your Salary</h2>
    <div>

    <div className=' flex justify-between pt-2 text-base'>
        <div className=' text-xs text-secondary-txt'>Items</div>
        <div className=' text-xs text-secondary-txt'>Amount</div>
      </div>

      <div className=' flex justify-between pt-2'>
        <div>Basic Salary</div>
        <div>{basicSalary}</div>
      </div>

      <div className=' flex justify-between pt-2'>
        <div>Gross Earning</div>
        <div>{grossEarning}</div>
      </div>

      <div className=' flex justify-between pt-2'>
        <div>Gross Deduction</div>
        <div>-{grossDeduction}</div>
      </div>

      <div className=' flex justify-between pt-2'>
        <div>Employee EPF (8%)</div>
        <div>-{employeeEPF}</div>
      </div>

      <div className=' flex justify-between pb-3 pt-2'>
        <div>APIT</div>
        <div>-{apit}</div>
      </div>      
    </div>

    <div className=' flex justify-between font-bold border-b-white-gray border-[0.78px] p-2'>
      <div>Net Salary (Take Home)</div>
      <div>{netSalary}</div>
    </div>

    <h3 className=' text-xs text-secondary-txt pt-3'>Contribution from the Employer</h3>
    <div>
    <div className=' flex justify-between pt-2'>
        <div>Employer EPF (12%)</div>
        <div>{employerEPF}</div>
      </div>

      <div className=' flex justify-between pt-2'>
        <div>Employer ETF (3%)</div>
        <div>{employerETF}</div>
      </div>

      <div className=' flex justify-between pt-4'>
        <div>CTC (Cost to Company)</div>
        <div>{costToCompany}</div>
      </div>
    </div>
  </div>
);
};

export default Result;
