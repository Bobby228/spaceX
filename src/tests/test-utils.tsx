import React from 'react';
import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

export function renderWithProviders(ui: React.ReactElement) {
  // 🔥 создаём root ДО рендера
  let modalRoot = document.getElementById('modal');

  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);
  }

  const result = render(
    <MantineProvider defaultColorScheme="light">
      {ui}
    </MantineProvider>
  );

  result.unmount = () => {
    result.unmount();
    modalRoot?.remove();
  };

  return result;
}