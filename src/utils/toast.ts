import { toast } from "react-toastify";

export default class Toast {
    static success = (message: string) => toast.success(message);

    static error = (message: string) => toast.error(message);

    static info = (message: string) => toast.info(message);
};
