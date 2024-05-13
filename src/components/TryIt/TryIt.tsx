import { observer } from 'mobx-react';
import * as React from 'react';
import { OperationModel, RedocNormalizedOptions } from '../../services';

import { RightPanelHeader, Tab, TabList, Tabs } from '../../common-elements';
import { OptionsContext } from '../OptionsProvider';
import { l } from '../../services/Labels';

import styled from '../../styled-components';

const ParametersList = styled.div`
  background: #11171a;
  padding: 20px;
  margin: 0;
`;

const ParameterRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  &:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ParameterCol = styled.div`
  padding-right: 20px;
  min-width: 150px;
  align-content: center;
`;

const ParamInput = styled.input`
  width: 200px;
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
    const { operation } = this.props;
    const samples = operation.codeSamples;
    const responses = operation.responses.filter(response => {
      return response.content && response.content.hasSample;
    });

    console.log(operation);
    const hasSamples = samples.length > 0;
    const hideTabList = samples.length === 1 ? this.context.hideSingleRequestSampleTab : false;

    const parameters = operation.parameters;
    console.log(parameters);

    return (
      (hasSamples && responses.length && parameters.length && (
        <div>
          <RightPanelHeader> {l('tryIt')} </RightPanelHeader>

          <Tabs defaultIndex={0}>
            <TabList hidden={hideTabList}>
              {samples.map(sample => (
                <Tab key={sample.lang + '_' + (sample.label || '')}>Execute</Tab>
              ))}
            </TabList>
            <ParametersList>
              Parameters ({parameters.length})
              {parameters.map(param => (
                <ParameterRow key={param.name}>
                  <ParameterCol>{param.name}</ParameterCol>
                  <ParameterCol>
                    <ParamInput
                      type="text"
                      placeholder={`string${param.required ? ' (required)' : ''}`}
                    ></ParamInput>
                  </ParameterCol>
                </ParameterRow>
              ))}
            </ParametersList>
          </Tabs>
        </div>
      )) ||
      null
    );
  }
}
