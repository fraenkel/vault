import Route from '@ember/routing/route';
import ClusterRoute from 'vault/mixins/cluster-route';
import { hash } from 'rsvp';

export default Route.extend(ClusterRoute, {
  model() {
    let entitiesModel = this.store.queryRecord('entity', {}).then(response => {
      return response.totalEntities;
    });

    let httpsRequestsModel = this.store.queryRecord('http-requests', {}).then(response => {
      let reverseArray = response.counters.reverse();
      return reverseArray[0].total;
    });

    let tokenModel = this.store.queryRecord('token', {}).then(response => {
      return response.totalTokens;
    });

    return hash({
      entitiesTotal: entitiesModel,
      httpsRequestTotal: httpsRequestsModel,
      tokenTotal: tokenModel,
    });
  },
});
