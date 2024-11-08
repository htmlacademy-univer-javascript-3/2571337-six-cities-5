import { store } from '../store';
import { setError } from '../store/action';
import { clearError } from '../store/api-action';

export function processErrorHandler(message: string) {
  store.dispatch(setError(message));
  store.dispatch(clearError());
}
