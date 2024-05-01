/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react'; // Add this line
import { Provider } from 'react-redux';
import store from './redux/store';
import { register } from '@videosdk.live/react-native-sdk';

import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification';
import {CometChat} from '@cometchat/chat-sdk-react-native';
import * as RootNavigation from './RootNavigation';
import {TokenRegisterHandler} from './utils/tokenRegisterHandler';
import {NotificationHandler} from './utils/notificationHandler';
import {AndroidStyle} from '@notifee/react-native';

new TokenRegisterHandler();
new NotificationHandler();

PushNotification.channelExists('learnlance', function (exists) {
  if(!exists){
    PushNotification.createChannel(
      {
        channelId: "learnlance", 
        channelName: "LearnLance",
        channelDescription: "A channel to categorise your notifications",
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  }
});

messaging().onMessage(async (remoteMessage) => {
    PushNotification.localNotification({
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      channelId: "learnlance",
      data: remoteMessage.data
    });
    handleMessages(remoteMessage);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!');
  handleMessages(remoteMessage, true);
});

PushNotification.configure({
  onNotification: function(notification) {
    if(notification.data.redirect){
      RootNavigation.navigate(notification.data.redirect);
    }
  }
})

messaging().onNotificationOpenedApp(async remoteMessage => {
  RootNavigation.navigate(remoteMessage.data.redirect)
});

handleMessages = (firebaseMessage, inbackground = false) => {
  try {
    let msg = CometChat.CometChatHelper.processMessage(
      JSON.parse(firebaseMessage?.data?.message),
    );
      
    if (msg.category == 'message' && inbackground) {
      switch (msg.type) {
        case 'text':
          NotificationHandler.displayNotification({
            id: msg.muid,
            title: msg.sender.name,
            body: msg.text,
            data: {
              conversationId: msg.conversationId,
              senderUid: msg.sender.uid,
              receiverType: msg.receiverType,
              guid: msg.receiverId,
            },
            android: {largeIcon: msg.sender.avatar},
          });          
          CometChat.markAsDelivered(msg);
          break;
        case 'image':
          NotificationHandler.displayNotification({
            id: msg.muid,
            title: msg.sender.name,
            body: 'Sent an image',
            data: {
              conversationId: msg.conversationId,
              senderUid: msg.sender.uid,
              receiverType: msg.receiverType,
              guid: msg.receiverId,
            },
            android: {
              style: {
                type: AndroidStyle.BIGPICTURE,
                picture: msg?.data?.attachments
                  ? msg.data.attachments[0]['url']
                  : '',
              },

              largeIcon: msg.sender.avatar,
            },
          });
          CometChat.markAsDelivered(msg);
          break;
        case 'video':
          NotificationHandler.displayNotification({
            id: msg.muid,
            title: msg.sender.name,
            body: 'Sent a video',
            data: {
              conversationId: msg.conversationId,
              senderUid: msg.sender.uid,
              receiverType: msg.receiverType,
              guid: msg.receiverId,
            },
            android: {
              style: {
                type: AndroidStyle.BIGPICTURE,
                picture: msg?.data?.attachments
                  ? msg.data.attachments[0]['url']
                  : '',
              },

              largeIcon: msg.sender.avatar,
            },
          });
          CometChat.markAsDelivered(msg);
          break;
        case 'file':
          NotificationHandler.displayNotification({
            id: msg.muid,
            title: msg.sender.name,
            body: 'Sent a file',
            data: {
              conversationId: msg.conversationId,
              senderUid: msg.sender.uid,
              receiverType: msg.receiverType,
              guid: msg.receiverId,
            },
            android: {
              largeIcon: msg.sender.avatar,
            },
          });
          CometChat.markAsDelivered(msg);
          break;
        case 'audio':
          NotificationHandler.displayNotification({
            id: msg.muid,
            title: msg.sender.name,
            body: 'Sent an audio file',
            data: {
              conversationId: msg.conversationId,
              senderUid: msg.sender.uid,
              receiverType: msg.receiverType,
              guid: msg.receiverId,
            },
            android: {
              largeIcon: msg.sender.avatar,
            },
          });
          CometChat.markAsDelivered(msg);
          break;
        case 'media':
          NotificationHandler.displayNotification({
            id: msg.muid,
            title: msg.sender.name,
            body: 'Sent a file',
            data: {
              conversationId: msg.conversationId,
              senderUid: msg.sender.uid,
              receiverType: msg.receiverType,
              guid: msg.receiverId,
            },
            android: {
              largeIcon: msg.sender.avatar,
            },
          });
          CometChat.markAsDelivered(msg);
          break;

        default:
          break;
      }
    }
    if (msg.category == 'call') {
      switch (msg.action) {
        case 'initiated':
          NotificationHandler.msg = msg;
          NotificationHandler.displayCallAndroid();
          break;
        case 'ended':
          CometChat.clearActiveCall();
          NotificationHandler.endCall(NotificationHandler.callerId);
          break;
        case 'unanswered':
          CometChat.clearActiveCall();
          NotificationHandler.removeCallDialerWithUUID(
            NotificationHandler.callerId,
          );
          break;
        case 'busy':
          CometChat.clearActiveCall();
          NotificationHandler.removeCallDialerWithUUID(
            NotificationHandler.callerId,
          );
          break;
        case 'ongoing':
          NotificationHandler.displayNotification({
            title: msg?.callReceiver?.name || '',
            body: 'ongoing call',
          });
          RootNavigation.navigate({
            index: 0,
            routes: [
              {
                name: 'CallScreen',
                params: {call: msg, needReset: true},
              },
            ],
          });
          break;
        case 'rejected':
          CometChat.clearActiveCall();
          NotificationHandler.removeCallDialerWithUUID(
            NotificationHandler.callerId,
          );
          break;
        case 'cancelled':
          CometChat.clearActiveCall();
          NotificationHandler.removeCallDialerWithUUID(
            NotificationHandler.callerId,
          );
          break;
        default:
          break;
      }
      return;
    }
  } catch (e) {
    console.log(e);
  }
};

const Main = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

register();

AppRegistry.registerComponent(appName, () => Main);
