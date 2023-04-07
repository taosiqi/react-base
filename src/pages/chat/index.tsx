import AChat, { Bubble, useMessages } from '@chatui/core';
import { MessageProps } from "@chatui/core/lib/components/Message";
import Style from './index.module.scss';
const initialMessages = [
  {
    type: 'text',
    content: { text: '主人好，我是智能助理，你的贴心小助手~' },
    user: { avatar: 'https://static-1253419794.cos.ap-nanjing.myqcloud.com/img/14883291_0_final.png' },
  },
  {
    type: 'text',
    content: { text: '主人好，我是智能助理，你的贴心小助手~' },
    user: { avatar: 'https://static-1253419794.cos.ap-nanjing.myqcloud.com/img/14883291_0_final.png' },
  },
];

function Chat() {
  // 消息列表
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  // 发送回调
  function handleSend(type:string, val:string) {
    if (type === 'text' && val.trim()) {
      // TODO: 发送请求
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right',
      });

      setTyping(true);

      // 模拟回复消息
      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: '亲，您遇到什么问题啦？请简要描述您的问题~' },
        });
      }, 1000);
    }
  }

  function renderMessageContent(msg:MessageProps) {
    const { type, content } = msg;

    // 根据消息类型来渲染
    switch (type) {
      case 'text':
        return <Bubble content={content.text} />;
      case 'image':
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }
  return (
    <div className={Style.main}>
      <AChat
        navbar={{ title: 'Open AI' }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
      />
    </div>
  );
}

export default Chat;
