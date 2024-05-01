import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import Button from '../../components/Button';
import { SCREEN_NAMES } from '../../navigators/screenNames';
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from '../../styles/colors';
import { Color } from '../../../GlobalStyles';
import SessionContext from '../../../context/Sessions/sessionContext';

export default function Home({ navigation, route }) {
  const { name, token, meetingId } = route.params;
  const context = useContext(SessionContext);
  const { currentSession, UpdateLiveSessionHls } = context;
  const [Privilege,setPrivilege] = useState('')

  if(Privilege === 'Teacher'){
    UpdateLiveSessionHls(currentSession, 'Todo');
  }

  useEffect(() => {
    const fetchRole = async () => {
      const Privilege = await AsyncStorage.getItem("role");
      setPrivilege(Privilege);
    };

    fetchRole();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Color.colorGainsboro_200,
      }}>
      {
        Privilege === 'Teacher' ? (
          <View
            style={{
              flex: 1,
              marginHorizontal: 22,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
                color: colors.primary,
              }}>
              You can test this session for yourself now
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              For starting the session, you have to click "Go Live" on the next
              screen meeting header.
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              Once the live starts, your student followers will be able to join the
              session.
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              You have the controls for camera, mic, screen sharing, and making
              someone else the host.
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              If you are the host, after leaving the session, the session will be
              terminated.
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 50 }}>
              You can rejoin the session any time.
            </Text>

            {/* Button to navigate to the Meeting screen */}
            <Button
              style={{ backgroundColor: '#373eb2' }}
              text={'Enter Session'}
              onPress={() => {
                navigation.navigate(SCREEN_NAMES.Meeting, {
                  name: name,
                  token: token,
                  meetingId: meetingId,
                  micEnabled: true,
                  webcamEnabled: true,
                  mode: 'CONFERENCE',
                });
              }}
            />
            <Button
              style={{ backgroundColor: Color.colorGray_100 }}
              text={'Go Back'}
              onPress={() => {
                navigation.navigate('MySessions')
              }}
            />
          </View>
        ) :
          <View
            style={{
              flex: 1,
              marginHorizontal: 22,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 20,
                color: colors.primary,
              }}>
              You can join a live session and experience it for yourself.
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              To enter the session, click "Enter Session" below.
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              Once you enter, you can participate actively by raising your hand,
              chatting with others, and viewing the live streaming.
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              If you raise your hand, the host will be able to see it and respond accordingly.
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 10 }}>
              After the session, you can leave, and the host will end the meeting.
            </Text>
            <Text style={{ textAlign: 'center', marginBottom: 50 }}>
              Feel free to rejoin the session until it's live.
            </Text>

            {/* Button to navigate to the Meeting screen */}
            <Button
              style={{ backgroundColor: '#373eb2' }}
              text={'Enter Session'}
              onPress={() => {
                navigation.navigate(SCREEN_NAMES.Meeting, {
                  name: name,
                  token: token,
                  meetingId: meetingId,
                  micEnabled: true,
                  webcamEnabled: true,
                  mode: 'VIEWER',
                });
              }}
            />
            <Button
              style={{ backgroundColor: Color.colorGray_100 }}
              text={'Go Back'}
              onPress={() => {
                navigation.navigate('HomePage1')
              }}
            />
          </View>
      }
    </SafeAreaView>
  );
}
