import { BackendFormValue } from './backend-form';
import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import * as React from 'react';
import { RuntimeLoader } from '../loaders/enums-runtimes-loaders';
import { CapabilitiesByModuleLoader } from '../loaders/capabilities-loader';
import { OverviewComplete } from '../core/hub-n-spoke/overview-complete';

interface BackendOverviewProps {
  value: BackendFormValue;
  onClick: () => void;
}

export function BackendFormOverview(props: BackendOverviewProps) {

  if (!props.value.runtime) {
    return (
      <EmptyState>
        <Title size="lg">You can select a Backend for your custom application</Title>
        <EmptyStateBody>
          By selecting a bunch of capabilities (Http Api, Database, ...), you will be able to bootstrap the backend of
          your application in a few seconds...
        </EmptyStateBody>
        <Button variant="primary" onClick={props.onClick}>Select Backend</Button>
      </EmptyState>
    );
  }
  return (
    <RuntimeLoader id={props.value.runtime.id}>
      {runtime => (
        <OverviewComplete title={`Your ${runtime!.name} backend is configured`}>
          <CapabilitiesByModuleLoader categories={['backend', 'support']}>
            {capabilitiesById => (
              <React.Fragment>
                It will feature:
                {props.value.capabilities.filter(c => c.selected).map(c => capabilitiesById.get(c.id)!.name).join(', ')}
              </React.Fragment>
            )}
          </CapabilitiesByModuleLoader>
        </OverviewComplete>
      )}
    </RuntimeLoader>
  );
}
