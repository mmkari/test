import * as React from 'react';

const useContainerDimensions = () => {
  const ref = React.useRef();
  const [dimension, setDimension] = React.useState({});

  React.useLayoutEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect) {
      const rect = ref.current.getBoundingClientRect().toJSON();
      setDimension(rect);
    }
  }, [ref.current]);

  // // measure position once
  // React.useEffect(() => {
  //   console.log('Measured container position');
  //   setPosition({ x: e.clientX, y: e.clientY });
  // }, []);

  return [ref, dimension];
};

// const useDragOverPosition = () => {
//   const [dragOverPosition, setDragOverPosition] = React.useState({
//     x: 0,
//     y: 0,
//   });

//   React.useEffect(() => {
//     const updatePosition = (e) => {
//       setDragOverPosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('dragover', updatePosition);

//     return () => {
//       window.removeEventListener('dragover', updatePosition);
//     };
//   }, []);
//   React.useEffect(() => {
//     const removeOverPosition = () => {
//       console.log('clearing over position...');

//       setDragOverPosition(null);
//     };
//     window.addEventListener('dragend', removeOverPosition);

//     return () => {
//       window.removeEventListener('dragend', removeOverPosition);
//     };
//   }, []);

//   return dragOverPosition;
// };

// const useMousePosition = () => {
//   const [position, setPosition] = React.useState({ x: 0, y: 0 });

//   React.useEffect(() => {
//     const updatePosition = (e) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', updatePosition);

//     return () => {
//       window.removeEventListener('mousemove', updatePosition);
//     };
//   }, []);

//   return position;
// };
// const useMouseStatusDown = (position) => {
//   const [statusDown, setStatusDown] = React.useState(false);

//   React.useEffect(() => {
//     const addDown = () => {
//       setStatusDown(true);
//     };
//     window.addEventListener('dragstart', addDown);

//     return () => {
//       window.removeEventListener('dragstart', addDown);
//     };
//   }, []);
//   React.useEffect(() => {
//     const removeDown = () => {
//       setStatusDown(false);
//     };
//     window.addEventListener('dragend', removeDown);

//     return () => {
//       window.removeEventListener('dragend', removeDown);
//     };
//   }, []);
//   return statusDown ? position : null;
// };

export default useContainerDimensions;
