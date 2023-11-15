import * as k8s from '@kubernetes/client-node'

const kc = new k8s.KubeConfig()
kc.loadFromDefault()

const k8sCustomApi = kc.makeApiClient(k8s.CustomObjectsApi)

const GROUP = 'webappcron.csye7125-fall2023-group05.cloud'
const VERSION = 'v1'
const KIND = 'Cron'
const KIND_PLURAL = 'crons'
const NAMESPACE = 'default'

const createCustomResourceBody = ({
  labels,
  name,
  url,
  retries,
  res_code = 200,
}) => {
  return {
    apiVersion: `${GROUP}/${VERSION}`,
    kind: KIND,
    metadata: {
      // labels: [
      //   'app.kubernetes.io/name: cron:',
      //   'app.kubernetes.io/instance: cron-sample',
      //   'app.kubernetes.io/part-of: test-operator',
      //   'app.kubernetes.io/managed-by: kustomize',
      //   'app.kubernetes.io/created-by: test-operator',
      // ],
      name,
    },
    spec: {
      url,
      retries,
      res_code,
    },
  }
}

export const createCustomResource = (params) => {
  const body = createCustomResourceBody(params)

  k8sCustomApi
    .createNamespacedCustomObject(GROUP, VERSION, NAMESPACE, KIND_PLURAL, body)
    .then((res) => {
      console.log('createNamespacedCustomObject res:', JSON.stringify(res))
    })
    .catch((err) => {
      console.log('createNamespacedCustomObject err:', JSON.stringify(err))
    })
}

export const patchCustomResource = (cr_name, params) => {
  const body = createCustomResourceBody(params)

  k8sCustomApi
    .patchNamespacedCustomObject(
      GROUP,
      VERSION,
      NAMESPACE,
      KIND_PLURAL,
      cr_name,
      body
    )
    .then((res) => {
      console.log('patchNamespacedCustomObject res:', JSON.stringify(res))
    })
    .catch((err) => {
      console.log('patchNamespacedCustomObject err:', JSON.stringify(err))
    })
}

export const deleteCustomResource = (name) => {
  k8sCustomApi
    .deleteNamespacedCustomObject(GROUP, VERSION, NAMESPACE, KIND_PLURAL, name)
    .then((res) => {
      console.log('deleteNamespacedCustomObject res:', JSON.stringify(res))
    })
    .catch((err) => {
      console.log('deleteNamespacedCustomObject err:', JSON.stringify(err))
    })
}
