// Services
import DisneyService from '../../services/DisneyService';

// libs
import { runParallel } from '../lib/async';
import loadAction from '../lib/loadAction';

// Actions
import { loadRef } from './refs';

export const loadHome = loadAction(DisneyService, 'disney.home', 'HOME');

export function loadRefs (context, payload, done) {
    const refIdList = payload?.refIdList;

    if (refIdList?.length > 0) {
        const actions = refIdList.reduce((acc, refId) => {
            acc[refId] = {
                action: loadRef,
                payload: {
                    refId
                }
            };

            return acc;
        }, {});

        runParallel(context, actions, done);
    }

    done?.();
}

