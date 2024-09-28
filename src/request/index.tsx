import { ChatRespType } from "./type";
export const sendMessage = async (input: string) => {
  const url = "http://127.0.0.1:7001/v1/chat";
  // 设置请求的选项
  const options = {
    method: "POST", // 指定请求方法
    headers: {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/json",
    },
    body: JSON.stringify({ input }),
  };
  const resp = await fetch(url, options);
  const res: ChatRespType = await resp.json();
  return res.data;
};
