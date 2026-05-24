import type {ReactNode} from "react";

import './Overlay.css'

type OverlayProps = {
  children: ReactNode
  onClose: () => void;
}

const Overlay = ({children, onClose}: OverlayProps) => {
  return (
    <div className='overlay' onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Overlay;