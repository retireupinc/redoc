import { observer } from 'mobx-react';
import * as React from 'react';
import { isPayloadSample, OperationModel, RedocNormalizedOptions } from '../../services';
import { PayloadSamples } from '../PayloadSamples/PayloadSamples';
import { SourceCodeWithCopy } from '../SourceCode/SourceCode';

import { RightPanelHeader, Tab, TabList, TabPanel, Tabs } from '../../common-elements';
import { OptionsContext } from '../OptionsProvider';
import { l } from '../../services/Labels';

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

    const hasSamples = samples.length > 0;
    const hideTabList = samples.length === 1 ? this.context.hideSingleRequestSampleTab : false;
    return (
      (hasSamples && responses.length && (
        <div>
          <RightPanelHeader> {l('tryIt')} </RightPanelHeader>

          <Tabs defaultIndex={0}>
            <TabList hidden={hideTabList}>
              {samples.map(sample => (
                <Tab key={sample.lang + '_' + (sample.label || '')}>Execute</Tab>
              ))}
            </TabList>
            {samples.map(sample => (
              <TabPanel key={sample.lang + '_' + (sample.label || '')}>
                {isPayloadSample(sample) ? (
                  <div>
                    <PayloadSamples content={sample.requestBodyContent} />
                  </div>
                ) : (
                  <SourceCodeWithCopy lang={sample.lang} source={sample.source} />
                )}
              </TabPanel>
            ))}
          </Tabs>
          <RightPanelHeader> {l('response')} </RightPanelHeader>
          <Tabs defaultIndex={0}>
            <TabList>
              {responses.map(response => (
                <Tab className={'tab-' + response.type} key={response.code}>
                  {response.code}
                </Tab>
              ))}
            </TabList>
            {responses.map(response => (
              <TabPanel key={response.code}>
                <div>
                  <PayloadSamples content={response.content!} />
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      )) ||
      null
    );
  }
}
