import Ember from 'ember';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  reportPress(keycode) {
    "use strict";
    alert('Not yet implemented!');
  },
  reportUserData(data) {
    "use strict";
    alert('Not yet implemented!');
  },
  reportPause(userid, userpass) {
    "use strict";
    return this.get('ajax').request('extra/pause-lightset', {
      method: 'GET',
      data: {
        userid: userid,
        userpass: userpass
      }
    });
  },
  retrieveSettings(userid, userpass) {
    "use strict";
    return this.get('ajax').request('extra/get-experiment', {
      method: 'GET',
      data: {
        userid: userid,
        userpass: userpass
      }
    });
  },
  retrieveLightset(userid, userpass) {
    "use strict";
    return this.get('ajax').request('extra/get-lightset', {
      method: 'GET',
      data: {
        userid: userid,
        userpass: userpass
      }
    });
  },
});
