import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDownEsc);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDownEsc);
  }
  handleKeyDownEsc = e => {
    if (e.key === 'Escape') {
      this.props.closeModal();
    }
  };
  render() {
    const { src, closeModal } = this.props;
    return (
      <div className="Overlay" onClick={closeModal}>
        <div className="Modal" onClick={e => e.stopPropagation()}>
          <img src={src} alt="cat"/>
        </div>
      </div>
    );
  }
}
