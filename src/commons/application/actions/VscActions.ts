import { createActions } from 'src/commons/redux/utils';

const VscActions = createActions('vsc', {
  setVsc: () => ({})
});

// For compatibility with existing code (actions helper)
export default {
  ...VscActions
};
