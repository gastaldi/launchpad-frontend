import * as React from 'react';
import { DescriptiveHeader, SpecialValue } from '../core/stuff';
import { FormPanel } from '../core/form-panel/form-panel';
import { ClusterPicker, ClusterPickerValue } from '../pickers/cluster-picker';
import { OpenshiftClusterLoader, OpenshiftClustersLoader } from '../loaders/openshiftcluster-loader';
import { useAuthApi } from 'keycloak-react';
import { FormHub } from '../core/types';
import { Button } from '@patternfly/react-core';
import { OverviewComplete } from '../core/hub-n-spoke/overview-complete';
import { OverviewEmpty } from '../core/hub-n-spoke/overview-empty';

export interface DeploymentFormValue {
  clusterPickerValue?: ClusterPickerValue;
}

export const DeploymentHub: FormHub<DeploymentFormValue> = {
  id: 'openshift-deployment',
  title: 'OpenShift Deployment',
  checkCompletion: value => !!value.clusterPickerValue && ClusterPicker.checkCompletion(value.clusterPickerValue),
  Overview: props => {
    if (!DeploymentHub.checkCompletion(props.value)) {
      return (
        <OverviewEmpty
          id={DeploymentHub.id}
          title="You need to configure the OpenShift deployment"
          action={<Button variant="primary" onClick={props.onClick}>Configure OpenShift Deployment</Button>}
        >
          You are going to choose where your application will be built, deployed and served.
        </OverviewEmpty>
      );
    }
    return (
      <OpenshiftClusterLoader clusterId={props.value.clusterPickerValue!.clusterId!}>
        {result => (
          <OverviewComplete id={DeploymentHub.id} title="OpenShift Deployment is configured">
            You application will be deployed to the <SpecialValue>{result!.name}</SpecialValue> OpenShift cluster.
          </OverviewComplete>
        )}
      </OpenshiftClusterLoader>
    );
  },
  Form: props => {
    const authApi = useAuthApi();
    return (
      <FormPanel
        id={DeploymentHub.id}
        initialValue={props.initialValue}
        validator={DeploymentHub.checkCompletion}
        onSave={props.onSave}
        onCancel={props.onCancel}
      >
        {
          (inputProps) => (
            <React.Fragment>
              <DescriptiveHeader
                description="Choose an OpenShift cluster to build,
               deploy and serve your application automatically on each push to your repository’s master branch."
              />
              <OpenshiftClustersLoader>
                {(clusters) => (
                  <ClusterPicker.Element
                    clusters={clusters}
                    value={inputProps.value.clusterPickerValue || {}}
                    onChange={(clusterPickerValue) => inputProps.onChange({...inputProps.value, clusterPickerValue})}
                    authorizationLinkGenerator={(clusterId) => authApi.user ? authApi.generateAuthorizationLink(clusterId) : ''}
                  />
                )}
              </OpenshiftClustersLoader>
            </React.Fragment>
          )}
      </FormPanel>
    );
  }
};
