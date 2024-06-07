import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SalaryForm from './components/SalaryForm';
import Result from './components/Result';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <SalaryForm />
        <Result />
      </div>
    </Provider>
  );
};

export default App;
