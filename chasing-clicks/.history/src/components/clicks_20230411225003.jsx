// Build a web page  with a clickable button and a click count. Every time that the button is clicked, the number increases by 1. When the web page is refreshed, the click count number should reflect all previous clicks. That means, refreshing the page should not reset the count to 0 or any other default number.

import React, { useState } from 'react';

const Clicks = () => {
  const [count, setCount] = useState(0);
  // Add a function so that When the web page is refreshed, the click count number should reflect all previous clicks



  return (
    <div>
      <h1>Clicks</h1>
      <p>Click Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  );
}

export default Clicks;