import React, { useEffect } from 'react';
import './App.css';
import mermaid from 'mermaid';
import debounce from 'debounce'

const App = () => {
  useEffect(() => {
    const output = document.getElementById('output')

    mermaid.initialize({startOnLoad: true});
    const graphDefinition = 
    `graph TB
    a-->b
    b-->a`;

      mermaid.render('theGraph', graphDefinition, (svgCode) => { output.innerHTML = svgCode; })
  }, [])

  const handleChange = debounce((value) => {
    console.log(value);
    const output = document.getElementById('output')
    
    try {
      // use the mermaid parse to ensure code is parsable.
      // Otherwise, throw an error and do nothing.

      mermaid.parse(value);
      output.innerHTML = '';

      mermaid.render('theGraph', value, (svgCode) => {
        console.log(svgCode);
        output.innerHTML = svgCode;
      });
    } catch (err) {
      console.error(err);
    }
  }, 500, false);

  return (
    <div className='App'>
      <h2>Mermaid Sample</h2>
      <textarea rows='5' onChange={e => handleChange(e.target.value)}></textarea>
      <div id='output'></div>
    </div>
  );
}

export default App;