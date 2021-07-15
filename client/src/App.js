import React, { useState } from 'react';

import Navbar from './components/navbar';
import Main from './components/main';
import Book from './components/book';

function App() {
  const [page, setPage] = useState(0);
  return (
    <div className='App'>
      <Navbar setPage={setPage} />
      {page === 0 ? <Main setPage={setPage} /> : null}
      {page === 1 ? <Book setPage={setPage} /> : null}
    </div>
  );
}

export default App;
