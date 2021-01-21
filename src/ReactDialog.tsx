import React, {useEffect, useState} from 'react';
import { ReactWidget } from '@jupyterlab/apputils';
import styled from 'styled-components';

const MainBox = styled.div`
  width: 100%;
  height: 100%;
  color: var(--jp-ui-font-color1);
  background: var(--jp-layout-color1);
  font-size: 20px;
  font-weight: bold;
`;

interface ICustomUser {
  userName?: string;
  userId?: string;
  department?: string;
}

const USERS = Array.from(Array(10)).map((_, index) => ({
  userId: `liam_${index}`,
  userName: `liam_yoon_${index}`,
  department: `rnd:${index}`,
}));

const DialogContent: React.FC<{
  setValue: (value: ICustomUser) => void;
}> = (props) => {
  // 첫번째 item 선택
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!USERS[selected]) {
      return;
    }
    props.setValue(USERS[selected]);
  }, [selected]);

  return (
    <MainBox>
      <h1>Custom Dialog</h1>
      <div>
        <select
          onChange={(e) => setSelected(Number(e.target.value))}
          value={selected}
        >
          {
            USERS.map((item, index) => (
              <option
                key={item.userId}
                value={index}
              >
                {item.userName}
              </option>
            ))
          }
        </select>
      </div>
    </MainBox>
  )
}

export default class ReactDialog extends ReactWidget {
  public result: ICustomUser = {};
  constructor() {
    super();
    this.addClass('custom-style');
  }

  /**
   * widget 내에 getValue method 가 있는 경우
   * dialog resolve 상태에 해당 함수를 실행하여
   * 결과를 반환함.
   */
  getValue(): ICustomUser {
    return this.result;
  }

  setValue(value: ICustomUser): void {
    this.result = value;
  }

  render(): JSX.Element {
    return (
      <DialogContent setValue={(value) => this.setValue(value)} />
    );
  }
}
