import { createPortal } from 'react-dom';
import { ToastContainer as Container } from 'react-toastify';

const ToastContainer = () => {
  const root = document.getElementById('toast');
  if (!root) {
    return null;
  }
  return createPortal(
    <Container
      autoClose={400}
      position="bottom-center"
      style={{ bottom: 30, width: '90vw', left: '50%', transform: 'translate(-50%)' }}
    />,
    root,
  );
};

export default ToastContainer;
