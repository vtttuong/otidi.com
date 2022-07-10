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
  chatId?: number;
  initialChatId?: number;
};
const ProfilePage: NextPage<Props> = ({
  chats,
  token,
  userId,
  chatId,
  initialChatId,
}) => {
  const router = useRouter();

  let initialData = {
    chatId: chatId,
    messageUnRead: 0,
    messages: [],
  };

  const contentMessageHandle = () => {
    if (chatId == null && router.query.id == undefined) {
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
          <Conversation chatId={chatId} currentUserId={userId} chats={chats} />

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

  const chatId = context.query.id ? context.query.id : null;
  const response = await getChats(token);
  // const chats = response.result;
  const chats = [
    {
      id: 1,
      seller_id: 2,
      buyer_id: 9,
      seller: {
        name: "Lê Ngọc Sơn",
        avatar:
          "https://i.pinimg.com/564x/4b/71/f8/4b71f8137985eaa992d17a315997791e.jpg",
      },
      buyer: {
        name: "Nguyễn Thị Hồng",
        avatar:
          "https://i.pinimg.com/736x/23/6f/07/236f07c0557948b53270e6b0558dc159.jpg",
      },
      last_message: {
        id: 1,
        created_at: "2022-04-27T06:19:39.000000Z",
      },
      post: {
        id: 24,
        main_image_url:
          "https://otody.s3.ap-southeast-1.amazonaws.com/products/1/1_OMUUycO3k4uppkHo.jpg",
      },
      role: "seller",
    },
    {
      id: 2,
      seller_id: 2,
      buyer_id: 1,
      seller: {
        name: "Lê Ngọc Sơn",
        avatar:
          "https://i.pinimg.com/564x/4b/71/f8/4b71f8137985eaa992d17a315997791e.jpg",
      },
      buyer: {
        name: "Nguyễn Văn Minh",
        avatar:
          "https://i.pinimg.com/736x/23/6f/07/236f07c0557948b53270e6b0558dc159.jpg",
      },
      last_message: {
        id: 1,
        created_at: "2022-04-27T06:19:39.000000Z",
      },
      post: {
        id: 24,
        main_image_url:
          "https://otody.s3.ap-southeast-1.amazonaws.com/products/1/1_OMUUycO3k4uppkHo.jpg",
      },
      role: "seller",
    },
    {
      id: 3,
      seller_id: 9,
      buyer_id: 2,
      seller: {
        name: "Pham Truong Nam",
        avatar:
          "https://i.pinimg.com/564x/4b/71/f8/4b71f8137985eaa992d17a315997791e.jpg",
      },
      buyer: {
        name: "Lê Ngọc Sơn",
        avatar:
          "https://i.pinimg.com/736x/23/6f/07/236f07c0557948b53270e6b0558dc159.jpg",
      },
      last_message: {
        id: 1,
        created_at: "2022-04-27T06:19:39.000000Z",
      },
      post: {
        id: 24,
        main_image_url:
          "https://otody.s3.ap-southeast-1.amazonaws.com/products/1/1_OMUUycO3k4uppkHo.jpg",
      },
      role: "buyer",
    },
    {
      id: 4,
      seller_id: 2,
      buyer_id: 8,
      seller: {
        name: "Lê Ngọc Sơn",
        avatar:
          "https://i.pinimg.com/564x/4b/71/f8/4b71f8137985eaa992d17a315997791e.jpg",
      },
      buyer: {
        name: "Midu",
        avatar:
          "https://i.pinimg.com/736x/23/6f/07/236f07c0557948b53270e6b0558dc159.jpg",
      },
      last_message: {
        id: 1,
        created_at: "2022-04-27T06:19:39.000000Z",
      },
      post: {
        id: 24,
        main_image_url:
          "https://otody.s3.ap-southeast-1.amazonaws.com/products/1/1_OMUUycO3k4uppkHo.jpg",
      },
      role: "seller",
    },
  ];

  return {
    props: {
      chats: chats,
      token: token,
      userId: userId,
      chatId: chatId,
    }, // will be passed to the page component as props
  };
}

export default ProfilePage;
