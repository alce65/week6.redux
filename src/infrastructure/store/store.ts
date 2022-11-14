import { configureStore } from '@reduxjs/toolkit';
import { taskReducer } from '../../features/todo/reducer/reducer';

export const appStore = configureStore({
    reducer: {
        tasks: taskReducer,
    },
    preloadedState: { tasks: [] },
});

export type rootStore = typeof appStore;

export type rootState = ReturnType<typeof appStore.getState>;
