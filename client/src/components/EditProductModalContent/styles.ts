export const modalStyles: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    zIndex: 1020,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(255, 255, 255, 0.55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    background: 'white',
    width: '45rem',
    maxWidth: 'calc(100vw - 2rem)',
    maxHeight: 'calc(100vh - 2rem)',
    overflowY: 'auto',
    position: 'relative',
    border: '1px solid #ccc',
    borderRadius: '0.3rem',
  }
};