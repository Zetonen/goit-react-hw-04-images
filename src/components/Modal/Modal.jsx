import { useEffect } from 'react';

export const Modal = props => {
  const { src, closeModal, tags } = props;
  useEffect(() => {
    const handleKeyDownEsc = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDownEsc);
    return () => {
      document.removeEventListener('keydown', handleKeyDownEsc);
    };
  }, [closeModal]);

  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal" onClick={e => e.stopPropagation()}>
        <img src={src} alt={tags} />
      </div>
    </div>
  );
};
