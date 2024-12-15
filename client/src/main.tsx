import React from "react";
import ReactDOM from "react-dom/client";


// // Example.jsx
// const MyComponent = () => <div>Hello, world!</div>;

// export default MyComponent;

// const useMyHook = () => {
//   if (true) {
//     const [state, setState] = React.useState(0); // Invalid usage
//   }
// };


import { useEffect } from 'react';

const MyComponent = ({ value }) => {
  useEffect(() => {
    console.log(value); // Missing `value` in dependency array
  }, []);
  return <div>Hello</div>;
};

export default MyComponent;




// Example.jsx
// function MyComponent({ value }) {
//   if (value == 0) { // Should trigger an error for `eqeqeq`
//     console.log('Loose equality');
//   }

//   return <div>Hello, world!</div>;
// }

// export default MyComponent;






ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div>This is the root of the app.</div>
  </React.StrictMode>,
);
