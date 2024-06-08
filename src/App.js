import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SalaryForm from './components/SalaryForm';
import Result from './components/Result';

const App = () => {
  return (
    <Provider store={store}>
      <div className="grid grid-cols-2 gap-5">
        <SalaryForm />
        <Result />
      </div>
    </Provider>
  );
};

export default App;
