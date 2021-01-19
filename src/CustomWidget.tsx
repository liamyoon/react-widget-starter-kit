import React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';

import styled from 'styled-components';

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  color: var(--jp-ui-font-color1);
  background: var(--jp-layout-color1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

export class CustomWidget extends ReactWidget {
  constructor() {
    super();
  }

  render(): JSX.Element {
    return (
      <MainBox>asdadsas</MainBox>
    );
  }
}
