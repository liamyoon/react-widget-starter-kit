import React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
import {
  JupyterFrontEnd,
  ILabShell,
} from '@jupyterlab/application';  // labshell 추가
import { INotebookTracker } from '@jupyterlab/notebook';
import CellController from './CellController';
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
  app: JupyterFrontEnd;
  labShell: ILabShell;
  notebooks: INotebookTracker;

  constructor(app: JupyterFrontEnd, labShell: ILabShell, notebooks: INotebookTracker) {
    super();
    this.labShell = labShell; // labshell 추가
    this.app = app;
    this.notebooks = notebooks;
    this.addClass('custom-style');
  }

  render(): JSX.Element {
    return (
      <MainBox>
        <CellController
          app={this.app}
          labShell={this.labShell}
          notebooks={this.notebooks}
        />
      </MainBox>
    );
  }
}
