import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { storiesOf } from '@storybook/react';
import { CreateNewAppFlow } from '../create-new-app-flow';
import { DeployExampleAppFlow } from '../deploy-example-app-flow';
import { ImportExistingFlow } from '../import-existing-flow';
import { LauncherClientProvider } from '../..';

storiesOf('Flows', module)
  .addDecorator((storyFn) => (
    <LauncherClientProvider>
      {storyFn()}
    </LauncherClientProvider>
  ))
  .add('CreateNewAppFlow', () => {
    return (
      <CreateNewAppFlow/>
    );
  })

  .add('CreateExampleAppFlow', () => {
    return (
      <DeployExampleAppFlow/>
    );
  })

  .add('ImportExistingFlow', () => {
    return (
      <ImportExistingFlow/>
    );
  });
