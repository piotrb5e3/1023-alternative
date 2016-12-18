import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    sessions: { serialize: true }
  }
});
