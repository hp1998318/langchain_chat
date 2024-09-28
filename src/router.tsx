import { createBrowserRouter } from "react-router-dom";
import ChatBot from "./page/Chat/chat";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ChatBot />,
  },
]);
export default router;
