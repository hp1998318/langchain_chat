import React, { useCallback, useRef, useState, memo } from "react";
import { Chat } from "@douyinfe/semi-ui";
import { sendMessage } from "../../request/index";
import { MessageType, RoleEnum, StatusEnum } from "./type";
const roleInfo = {
  user: {
    name: "User",
    avatar:
      "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/docs-icon.png",
  },
  assistant: {
    name: "Assistant",
    avatar:
      "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/logo.png",
  },
  system: {
    name: "System",
    avatar:
      "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/other/logo.png",
  },
};

let id = 0;
function getId() {
  return `id-${id++}`;
}
const commonOuterStyle = {
  border: "1px solid var(--semi-color-border)",
  borderRadius: "16px",
  width: "100%",
  height: "90vh",
};
const uploadProps = { action: "https://api.semi.design/upload" };
const ChatBot: React.FC = memo(() => {
  const [message, setMessage] = useState<Array<MessageType>>([]);
  const chatRef = useRef();
  const onMessageSend = useCallback((i: string) => getMessage(i), []);
  const getMessage = async (input: string) => {
    let respRole = RoleEnum.Assistant;
    let answer = "";
    let status = StatusEnum.Success;
    const id = getId();
    setMessage((mes) => [
      ...mes,
      {
        id: id,
        role: RoleEnum.Assistant,
        status: StatusEnum.Loading,
      },
    ]);
    try {
      answer = await sendMessage(input);
    } catch (err) {
      respRole = RoleEnum.System;
      status = StatusEnum.Err;
    }
    setMessage((message) => {
      console.log("messagelist", message);
      return message.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status,
            role: respRole,
            content: answer ? answer : "something go wrong",
          };
        }
        return item;
      });
    });
  };
  const onChatsChange = useCallback((chats: any) => {
    setMessage(chats);
  }, []);
  return (
    <div>
      <Chat
        style={commonOuterStyle}
        chats={message as any}
        refs={chatRef}
        roleConfig={roleInfo}
        onChatsChange={onChatsChange}
        onMessageReset={(v) => console.log("reset", v)}
        onMessageSend={onMessageSend}
        uploadProps={uploadProps}
      />
    </div>
  );
});
export default ChatBot;
