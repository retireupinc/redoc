import { observer } from 'mobx-react';
import * as React from 'react';
import { OperationModel, RedocNormalizedOptions } from '../../services';
// import { PayloadSamples } from '../PayloadSamples/PayloadSamples';
// import { SourceCodeWithCopy } from '../SourceCode/SourceCode';
import styled from '../../styled-components';

import { RightPanelHeader } from '../../common-elements';
import { OptionsContext } from '../OptionsProvider';
import { l } from '../../services/Labels';

const Button = styled.button`
  background-color: #fff;
  color: #333;
  padding: 2px 10px;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  border: 1px solid #ccc;
  border-left: 0;
  font-size: 16px;
  height: 28px;
  box-sizing: border-box;
  vertical-align: middle;
  line-height: 1;
  outline: none;
  width: 80px;

  white-space: nowrap;

  @media screen and (max-width: 450px) {
    display: none;
  }
`;

export interface TryItProps {
  operation: OperationModel;
}

@observer
export class TryIt extends React.Component<TryItProps> {
  static contextType = OptionsContext;
  context: RedocNormalizedOptions;
  operation: OperationModel;

  render() {
    // const { operation } = this.props;
    // const samples = operation.codeSamples;

    // const hasSamples = samples.length > 0;
    // const hideTabList = samples.length === 1 ? this.context.hideSingleRequestSampleTab : false;
    return (
      <div>
        <RightPanelHeader> {l('tryIt')} </RightPanelHeader>

        <Button
          onClick={() => {
            console.log('test');
          }}
        >
          {' '}
          TRY IT{' '}
        </Button>
      </div>
    );
  }
}
