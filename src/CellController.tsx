import React, { useState, useEffect } from 'react';
import { ILabShell, JupyterFrontEnd } from '@jupyterlab/application';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { CellType } from '@jupyterlab/nbformat';
import { Dialog, InputDialog } from '@jupyterlab/apputils';
import ReactDialog from './ReactDialog';
import styled from 'styled-components';
import WidgetDialog from './WidgetDialog';

interface ICellControllerProps {
  app: JupyterFrontEnd;
  labShell: ILabShell;
  notebooks: INotebookTracker;
}

const defaultProps: ICellControllerProps = {
  app: undefined,
  labShell: undefined,
  notebooks: undefined,
}

const CellControllerBox = styled.div`
`;

const CellController: React.FC<ICellControllerProps> = (props) => {
  const [nbWidget, setNbWidget] = useState<NotebookPanel>();

  const addCell = (type: CellType = 'code', value?: string) => {
    // cell 생성
    const cell = nbWidget.model.contentFactory.createCell(type, {});
    cell.value.text = value || '';
    nbWidget.model.cells.push(cell);
  }

  const handleAddCell = () => {
    addCell();
  };

  const handleRemoveCell = () => {
    const cell = props.notebooks.activeCell;
    nbWidget.model.cells.removeValue(cell.model);
  };

  const handleCopyCell = () => {
    const cell = props.notebooks.activeCell;
    const { type, value } = cell.model;
    addCell(type, value.text);
  };

  const handleSave = () => {
    props.app.commands.execute('docmanager:save');
  }
  const handleSaveAs = () => {
    props.app.commands.execute('docmanager:save-as');
  }
  const handleSaveAll = () => {
    props.app.commands.execute('docmanager:save-all');
  }

  const handleOpenDialog = async () => {
    const dialog = new Dialog({
      title: 'hello dialog',
      body: '기본 다이얼로그',
      buttons: [Dialog.okButton({ label: '확인' })],
    });
    const result = await dialog.launch();
    dialog.dispose(); // dialog 제거
    console.log(result);
  }

  const handleOpenInputDialog = async () => {
    const result = await InputDialog.getText({
      title: 'hello text dialog',
      label: 'input',
      placeholder: 'input text',
      okLabel: '확인',
    });

    // number
    // const result = await InputDialog.getNumber({
    //   title: 'hello number dialog',
    //   label: 'input',
    //   okLabel: '확인',
    // });

    // select
    // const result = await InputDialog.getNumber({
    //   title: 'hello number dialog',
    //   label: 'input',
    //   items: ['a', 'b', 'c', 'd'],
    //   okLabel: '확인',
    // });

    alert(result.value);
  }

  const handleOpenWidgetDialog = async () => {
    const users = Array.from(Array(5)).map((_, index) => ({
      text: `liam_${index}`,
      value: {
        id: index,
        name: `liam_${index}`,
        age: index * 10,
      },
    }));

    const dialog = new Dialog({
      title: 'hello widget dialog',
      body: new WidgetDialog(users),
      focusNodeSelector: 'select',
      buttons: [Dialog.okButton({ label: '확인' })],
    });

    const result = await dialog.launch();
    dialog.dispose();
    // ok버튼을 누른 경우
    if (result.button.accept) {
      alert(result.value.name);
    }
  }
  const handleOpenReactDialog = async () => {
    const dialog = new Dialog({
      title: 'hello react dialog',
      body: new ReactDialog(),
      buttons: [Dialog.okButton({ label: '확인' })],
    });

    const result = await dialog.launch();
    dialog.dispose();
    // ok버튼을 누른 경우
    if (result.button.accept) {
      alert(result.value.userName);
    }
  }

  useEffect(() => {
    props.labShell.currentChanged.connect((_, change) => {
      const { newValue } = change;
      setNbWidget(newValue instanceof NotebookPanel ? newValue : undefined);
    });
  }, []);

  return (
    <CellControllerBox>
      {
        nbWidget ? (
          <>
            <h3>Cell Controller</h3>
            <div>
              <button onClick={handleAddCell}>add cell</button>
              <button onClick={handleRemoveCell}>remove cell</button>
              <button onClick={handleCopyCell}>copy cell</button>
            </div>
            <hr />
            <h3>Doc Controller</h3>
            <div>
              <button onClick={handleSave}>save document</button>
              <button onClick={handleSaveAs}>save as document</button>
              <button onClick={handleSaveAll}>save all document</button>
            </div>
            <hr />
            <h3>Dialog Controller</h3>
            <div>
              <button onClick={handleOpenDialog}>open dialog</button>
              <button onClick={handleOpenInputDialog}>open input dialog</button>
              <button onClick={handleOpenWidgetDialog}>open widget input dialog</button>
              <button onClick={handleOpenReactDialog}>open react input dialog</button>
            </div>
          </>
        ) : (
          <h3>노트북을 선택해주세요!</h3>
        )
      }
    </CellControllerBox>
  );
};

CellController.defaultProps = defaultProps;

export default CellController;
