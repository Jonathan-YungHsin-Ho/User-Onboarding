import React from 'react';
import FormikUserForm from './components/Form';

import GlobalStyle from './styles/GlobalStyle';

export default function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <FormikUserForm />
    </div>
  );
};