import React, { useCallback, useRef, useState, memo } from "react";
import { Chat } from "@douyinfe/semi-ui";
import { sendMessage } from "../../request/index";
import { MessageType, RoleEnum, StatusEnum } from "./type";
import Style from "./index.module.scss";
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
  height: 500,
};
const uploadProps = { action: "https://api.semi.design/upload" };
const ChatBot: React.FC = memo(() => {
  const [message, setMessage] = useState<Array<MessageType>>([]);
  const chatRef = useRef();
  const onMessageSend = useCallback((i: string) => {
    setMessage((mes) => [
      ...mes,
      {
        id: getId(),
        role: RoleEnum.Assistant,
        status: StatusEnum.Loading,
      },
    ]);
    getMessage(i);
  }, []);
  const getMessage = async (input: string) => {
    let respRole = RoleEnum.Assistant;
    let answer = "";
    let status = StatusEnum.Success;
    const tempMessage: MessageType[] = [...message];
    tempMessage.pop();
    try {
      answer = await sendMessage(input);
    } catch (err) {
      respRole = RoleEnum.System;
      status = StatusEnum.Err;
    }
    setMessage([
      ...tempMessage,
      {
        id: getId(),
        role: respRole,
        createAt: Date.now(),
        content: answer === "" ? "something go wrong" : answer,
        status: status,
      },
    ]);
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
        onMessageSend={onMessageSend}
        uploadProps={uploadProps}
      />
    </div>
  );
});
export default ChatBot;
