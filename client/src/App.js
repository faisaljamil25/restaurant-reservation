import React, { useState } from 'react';

import Navbar from './components/navbar';

function App() {
  const [page, setPage] = useState(0);
  return (
    <div className='App'>
      <Navbar setPage={setPage} />
      <h1>Welcome to our Restaurant!</h1>
    </div>
  );
}

export default App;
