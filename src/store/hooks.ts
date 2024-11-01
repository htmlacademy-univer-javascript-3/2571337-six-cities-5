import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { TAppDispatch, TState } from '../types/state.types';

export const useAppSelector: TypedUseSelectorHook<TState> = useSelector;
export const useAppDispatch = () => useDispatch<TAppDispatch>();
