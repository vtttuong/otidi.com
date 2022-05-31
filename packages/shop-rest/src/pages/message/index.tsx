import Image from "assets/images/chat-bubbles.jpg";
import { SEO } from "components/seo";
import { ChatProvider } from "contexts/chat/chat.provider";
import ContentMessage from "features/message/content/contentMessage";
import Conversation from "features/message/conversation/conversation";
import { PageWrapper } from "features/message/message";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import React from "react";
import { getChats } from "utils/api/chat";
import { getCookie } from "utils/session";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  chats: any;
  token: string;
  userId?: number;
  chatUuid?: string;
  initialChatId?: number;
};
const ProfilePage: NextPage<Props> = ({
  chats,
  token,
  userId,
  chatUuid,
  initialChatId,
}) => {
  const router = useRouter();

  let initialData = {
    chatId: initialChatId,
    chatUuid: chatUuid,
    messageUnRead: 0,
    messages: [],
  };

  const contentMessageHandle = () => {
    if (chatUuid == null && router.query.uuid == undefined) {
      return (
        <div className="wrap-contentmessage container wrap-image-empty">
          <img
            src={Image}
            alt="messImage"
            style={{ padding: 100, width: 600, height: 450 }}
          />
        </div>
      );
    } else {
      return (
        <ContentMessage chats={chats} currentUserId={userId} token={token} />
      );
    }
  };

  return (
    <>
      <SEO title="Message - SecondHandApp" description="Conversation" />
      <ChatProvider initData={initialData}>
        <PageWrapper className={"message-chat"}>
          <Conversation
            chatUuid={chatUuid}
            currentUserId={userId}
            chats={chats}
          />

          {contentMessageHandle()}
        </PageWrapper>
      </ChatProvider>
    </>
  );
};

export async function getServerSideProps(context) {
  const token = getCookie("access_token", context);
  const userId = getCookie("userId", context);

  if (token === null) {
    if (context.req) {
      context.res.writeHead(302, { Location: "/login" });
      context.res.end();
    } else {
      Router.push("/login");
    }
  }

  const chatUuid = context.query.uuid ? context.query.uuid : null;
  let initialChatId = null;
  const chats = await getChats(token);
  if (chatUuid != null) {
    initialChatId = chats.find((chat) => chat.uuid == chatUuid).id;
  }

  return {
    props: {
      chats: chats,
      token: token,
      userId: userId,
      chatUuid: chatUuid,
      initialChatId: initialChatId,
    }, // will be passed to the page component as props
  };
}

export default ProfilePage;
