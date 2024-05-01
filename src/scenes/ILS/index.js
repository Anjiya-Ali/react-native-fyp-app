import React from 'react';
import {SafeAreaView} from 'react-native';
import colors from '../../styles/colors';
import { Color } from "../../../GlobalStyles";
import {
  MeetingProvider,
  MeetingConsumer,
} from '@videosdk.live/react-native-sdk';
import ILSContainer from './ILSContainer';
import {SCREEN_NAMES} from '../../navigators/screenNames';
import { useNavigation } from "@react-navigation/native";

export default function Meeting({route}) {
  const navigation = useNavigation();
  const token = route.params.token;
  const meetingId = route.params.meetingId;
  const micEnabled = route.params.micEnabled
    ? route.params.webcamEnabled
    : false;
  const webcamEnabled = route.params.webcamEnabled
    ? route.params.webcamEnabled
    : false;
  const name = route.params.name ? route.params.name : 'Test User';
  const mode = route.params.mode ? route.params.mode : 'CONFERENCE';

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: Color.colorDimgray_400, padding: 12}}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name,
          mode, // "CONFERENCE" || "VIEWER"
          notification: {
            title: 'Video SDK Meeting',
            message: 'Meeting is running.',
          },
        }}
        token={token}>
        <MeetingConsumer
          {...{
            onMeetingLeft: () => {
              navigation.navigate(SCREEN_NAMES.Home, { name: name, token: token, meetingId: meetingId })
            },
          }}>
          {() => {
            return <ILSContainer webcamEnabled={webcamEnabled} />;
          }}
        </MeetingConsumer>
      </MeetingProvider>
    </SafeAreaView>
  );
}
