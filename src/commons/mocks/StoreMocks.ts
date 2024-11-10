import { Store } from '@reduxjs/toolkit';
import _ from 'lodash';
import mockStore from 'redux-mock-store';

import {
  defaultAchievement,
  defaultDashboard,
  defaultFileSystem,
  defaultPlayground,
  defaultRouter,
  defaultSession,
  defaultSideContentManager,
  defaultStories,
  defaultVsc,
  defaultWorkspaceManager,
  OverallState
} from '../application/ApplicationTypes';
import { SourceActionType } from '../utils/ActionsHelper';
import { DeepPartial } from '../utils/TypeHelper';

export function mockInitialStore(
  overrides?: DeepPartial<OverallState>
): Store<OverallState, SourceActionType> {
  const createStore = (mockStore as any)();
  const state: OverallState = {
    router: defaultRouter,
    achievement: defaultAchievement,
    dashboard: defaultDashboard,
    playground: defaultPlayground,
    workspaces: defaultWorkspaceManager,
    session: defaultSession,
    stories: defaultStories,
    fileSystem: defaultFileSystem,
    sideContent: defaultSideContentManager,
    vsc: defaultVsc
  };

  const lodashMergeCustomizer = (objValue: any, srcValue: any) => {
    if (_.isObject(objValue)) {
      return {
        ...objValue, // destination object
        ...srcValue // overrides
      };
    }
  };

  return createStore(_.mergeWith(state, overrides, lodashMergeCustomizer));
}
