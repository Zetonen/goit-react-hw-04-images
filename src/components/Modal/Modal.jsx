import { useEffect } from 'react';

export const Modal = props => {
  useEffect(() => {
    const handleKeyDownEsc = (e) => {
      if (e.key === 'Escape') {
        props.closeModal();
      }
    }
    document.addEventListener('keydown', handleKeyDownEsc);
    return () => {
      document.removeEventListener('keydown', handleKeyDownEsc);
    };
  });

  const { src, closeModal, tags } = props;
  return (
    <div className="Overlay" onClick={closeModal}>
      <div className="Modal" onClick={e => e.stopPropagation()}>
        <img src={src} alt={tags} />
      </div>
    </div>
  );
};
