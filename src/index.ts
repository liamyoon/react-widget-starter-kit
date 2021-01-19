import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILayoutRestorer,
  ILabShell,
} from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { IEditorServices } from '@jupyterlab/codeeditor';
import { INotebookTracker } from '@jupyterlab/notebook';
import { Menu } from '@lumino/widgets';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { LabIcon } from '@jupyterlab/ui-components';
import { CustomWidget } from './CustomWidget';
import speakerIconSvg from '../style/icon/Speaker_Icon.svg';

const WIDGET_ID = 'custom-widget-extension';

const speakerIcon = new LabIcon({
  name: 'custom-ui-components:speaker',
  svgstr: speakerIconSvg,
});

/**
 * Initialization data for the react-widget extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'react-widget',
  autoStart: true,
  optional: [
    ICommandPalette,
    ILayoutRestorer,
    IEditorServices,
    IMainMenu,
    ILabShell,
    INotebookTracker,
  ],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    restorer: ILayoutRestorer,
    editor: IEditorServices,
    mainMenu: IMainMenu,
    labShell: ILabShell,
    notebooks: INotebookTracker,
  ) => {
    // 위젯 생성
    const widget = new CustomWidget();
    widget.id = WIDGET_ID;
    widget.title.icon = speakerIcon;

    // 메뉴 복원 추척에 등록
    restorer.add(widget, WIDGET_ID);
    // left 메뉴에 위젯 추가.
    app.shell.add(widget, 'left', { rank: 200 });

    const { commands } = app;
    // Add a command
    const command = 'jlab-examples:main-menu';
    commands.addCommand(command, {
      label: 'Execute jlab-examples:main-menu Command',
      caption: 'Execute jlab-examples:main-menu Command',
      execute: (args: any) => {
        console.log(
          `jlab-examples:main-menu has been called ${args['origin']}.`
        );
        window.alert(
          `jlab-examples:main-menu has been called ${args['origin']}.`
        );
      },
    });

    const addConnect = 'widget:add-connect';
    commands.addCommand(addConnect, {
      label: 'Execute add connect',
      caption: 'Execute add connect',
      execute: () => {
        const cell = notebooks.activeCell;
        const currentContent = cell.model.value;
        currentContent.text = currentContent.text + '\n' + 'connect: 195.168.0.1';
      },
    });

    const category = 'Extension Examples';

    palette.addItem({
      command: addConnect,
      category,
      args: { origin: 'add connect' },
    });

    palette.addItem({
      command,
      category,
      args: { origin: 'from the palette' },
    });

    // Create a menu
    const tutorialMenu: Menu = new Menu({ commands });
    tutorialMenu.title.label = 'Main Menu Example';
    mainMenu.addMenu(tutorialMenu, { rank: 80 });

    // Add the command to the menu
    tutorialMenu.addItem({ command, args: { origin: 'from the menu' } });
  },
};

export default extension;
