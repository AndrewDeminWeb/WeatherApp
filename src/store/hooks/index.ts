import { useMemo } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../types/store.types";
import {
	type ActionCreatorsMapObject,
	type AsyncThunk,
	bindActionCreators
} from "@reduxjs/toolkit";

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const ActionSlice = <Actions extends ActionCreatorsMapObject>(
	actions: Actions
): BoundActions<Actions> => {
	const dispatch = useAppDispatch();

	return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};

type BoundActions<Actions extends ActionCreatorsMapObject> = {
	[key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
		? BoundAsyncThunk<Actions[key]>
		: Actions[key];
};

type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (
	...args: Parameters<Thunk>
) => ReturnType<ReturnType<Thunk>>;
