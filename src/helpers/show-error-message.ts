import { toast } from 'react-toastify';

const TIME_TO_CLOSE_NOTIFICATION = 3000;

export function showErrorMessage(message: string) {
  toast.error(message, { position: 'bottom-right', autoClose: TIME_TO_CLOSE_NOTIFICATION });
}
