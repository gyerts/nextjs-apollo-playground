import React from 'react';
import ReactModal from 'react-modal';
import {toGridTemplate} from "src/uikitEjected";
import {Box, themed} from "@deity/falcon-ui";
import {ResponsiveIf} from "src/components";

import {useModalContext} from '.';
import {ModalContent, ModalTitle} from "./components";

const getTopPosition = (isMobile: boolean, bigContent?: boolean): string | number => {
  if (isMobile) {
    return 0;
  }
  if (bigContent) {
    return '50%';
  }
  return '40%';
}

const customStyles = (isMobile: boolean, bigContent?: boolean) => ({
  content : {
    top                   : getTopPosition(isMobile, bigContent),
    left                  : isMobile ? 0 : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : isMobile ? 0 : '-50%',
    transform             : isMobile ? 'unset': 'translate(-50%, -50%)',
    padding               : 0,
    borderRadius          : 0,
    width                 : isMobile ? '100vw' : 'unset',
    height                : isMobile ? '100vh' : 'unset',
  },
  overlay: {
    zIndex: 1500,
  },
});

ReactModal.setAppElement('#root');

const area = {
  header: 'header',
  content: 'content',
  footer: 'footer',
};

const MobileModalLayout = themed({
  tag: Box,
  defaultTheme: {
    modalLayout: {
      display: 'grid',
      fontSize: 'xs',
      css: {
        minWidth: 100,
      },
      // prettier-ignore
      gridTemplate:  toGridTemplate([
        ['1fr'        ],
        [area.header  ],
        [area.content ],
        [area.footer  ],
      ])
    },
  }
});

const DesktopModalLayout = themed({
  tag: Box,
  defaultTheme: {
    modalLayout: {
      display: 'grid',
      fontSize: 'xs',
      css: {
        minWidth: 300,
      },
      // prettier-ignore
      gridTemplate:  toGridTemplate([
        ['1fr'        ],
        [area.header  ],
        [area.content ],
        [area.footer  ],
      ])
    },
  }
});

export const Modal = () => {
  const { opened, Component, title, closeModal, options } = useModalContext();

  return (
    <React.Fragment>

      <ResponsiveIf mobile>
        <ReactModal
          isOpen={opened}
          onRequestClose={closeModal}
          style={customStyles(true, options && options.bigContent)}
        >
          <MobileModalLayout>
            <ModalTitle titleI18n={title} onClose={closeModal} />
            <ModalContent>
              <Component closeModal={closeModal} />
            </ModalContent>
          </MobileModalLayout>
        </ReactModal>
      </ResponsiveIf>

      <ResponsiveIf desktop>
        <ReactModal
          isOpen={opened}
          onRequestClose={closeModal}
          style={customStyles(false, options && options.bigContent)}
        >
          <DesktopModalLayout className={options && options.className}>
            {title && <ModalTitle titleI18n={title} onClose={closeModal} />}
            <ModalContent>
              <Component closeModal={closeModal} />
            </ModalContent>
          </DesktopModalLayout>
        </ReactModal>
      </ResponsiveIf>

    </React.Fragment>
  );
};
