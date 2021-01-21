import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILayoutRestorer, // layout restorer 플러그인 추가.
  ILabShell, // shell 플러그인 추가.
} from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import { Menu } from '@lumino/widgets';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { CustomWidget } from './widget'; // react-widget
import speakerIconSvg from '../style/icon/Speaker_Icon.svg'; // 메뉴에 등록할 아이콘
import { LabIcon } from '@jupyterlab/ui-components'; // 랩 아이콘 컴포넌트

// widget id
const WIDGET_ID = 'react-widget-extension';

// 아이콘 생성
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
    IMainMenu,
    ILayoutRestorer, // 플러그인 등록
    ILabShell,
    INotebookTracker,
  ],
  activate: (
    app: JupyterFrontEnd,
    mainMenu: IMainMenu,
    restorer: ILayoutRestorer,
    labShell: ILabShell,
    notebooks: INotebookTracker,
  ) => {
    // 위젯 생성
    const widget = new CustomWidget(app, labShell, notebooks); // labShell 전달
    widget.id = WIDGET_ID;
    widget.title.icon = speakerIcon;

    // 메뉴 복원 추척에 등록
    restorer.add(widget, WIDGET_ID);
    // left 메뉴에 위젯 추가.
    app.shell.add(widget, 'left', { rank: 200 });

    // application 객체에서 commands를 사용
    const { commands } = app;

    // command key값
    const command = 'example:on-load';

    const option = {
      label: 'Execute example:main-menu Command',
      caption: 'Execute example:main-menu Command',
      execute: () => {
        console.log('onload labextension example');
        alert('onload labextension example');
      },
    }
    // command 추가
    commands.addCommand(command, option);

    // command 실행
    // commands.execute(command);

    // 메뉴 생성
    const tutorialMenu: Menu = new Menu({ commands });
    tutorialMenu.title.label = 'Main Menu Example';
    mainMenu.addMenu(tutorialMenu, { rank: 80 });

    // 서브 메뉴 추가
    tutorialMenu.addItem({ command });
  },
};

export default extension;
