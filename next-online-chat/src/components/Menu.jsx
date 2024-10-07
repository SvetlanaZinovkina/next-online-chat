import React from "react";
import { UserIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid'

const messages = [
  { id: 1, sender: "Александр", text: "Привет! Как дела?", avatar: UserIcon},
  { id: 2, sender: "Мария", text: "Не забудь про встречу завтра!", avatar: UserIcon },
  { id: 3, sender: "Дмитрий", text: "Отправь мне отчет, пожалуйста.", avatar: UserIcon },
  { id: 4, sender: "Александр", text: "Привет! Как дела?", avatar: UserIcon},
  { id: 5, sender: "Мария", text: "Не забудь про встречу завтра!", avatar: UserIcon },
  { id: 6, sender: "Дмитрий", text: "Отправь мне отчет, пожалуйста.", avatar: UserIcon },
  { id: 7, sender: "Александр", text: "Привет! Как дела?", avatar: UserIcon},
  { id: 8, sender: "Мария", text: "Не забудь про встречу завтра!", avatar: UserIcon },
  { id: 9, sender: "Дмитрий", text: "Отправь мне отчет, пожалуйста.", avatar: UserIcon },
];

const Menu = () => {
  return (
    <aside className="flex flex-col bg-transparent rounded-3xl w-1/3 min-w-60 p-4 m-2 drop-shadow-md backdrop-opacity-10 min-h-80">
      <div className="m-2 p-2 hover:bg-purple-700 rounded-md">
        <UserIcon className="w-7 h-7 inline" />
        <span className="ml-4">Личный кабинет</span>
      </div>
      <div className="p-2 flex flex-col bg-transparent rounded-3xl w-1/3 min-w-full drop-shadow-md backdrop-opacity-10 min-h-60">
        <span className="ml-1">
          <ChatBubbleOvalLeftIcon className="w-7 h-7 inline mr-1" />
          <span>Сообщения</span>
        </span>
        <div className="mt-2 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="p-2 hover:bg-purple-700 rounded-md mb-1">
              <message.avatar className="w-5 inline mr-1"/><strong>{message.sender}</strong> 
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Menu;
