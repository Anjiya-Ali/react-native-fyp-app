import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Modal, TouchableWithoutFeedback, } from 'react-native';
import generateCertificatePDF from './CertificateGenerator';
import { PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import FileViewer from "react-native-file-viewer";
import { format } from 'date-fns';
import { Color, FontSize, FontFamily } from "../GlobalStyles";
import CourseContext from "../context/Courses/courseContext";
import Header from "../components/Header";

const currentDate = new Date();
const formattedDateStr = format(currentDate, "do MMMM yyyy");

const FeedbackPopup = ({ onClose, onSubmit }) => {
  const [selectedStars, setSelectedStars] = useState(0);
  const [isDoneDisabled, setIsDoneDisabled] = useState(true);

  const handleStarClick = (stars) => {
    setSelectedStars(stars);
    setIsDoneDisabled(false);
  };

  const handleSubmit = () => {
    onSubmit(selectedStars);
    onClose();
  };

  return (
    <Modal transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text style={styles.text}>Please rate this course. Your opinion matters.</Text>
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((stars) => (
            <TouchableOpacity
              key={stars}
              onPress={() => handleStarClick(stars)}
            >
              <Text style={[styles.startext, { color: stars <= selectedStars ? Color.colorSlateblue : 'black' }]}>{'\u2605'}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button, { opacity: isDoneDisabled ? 0.5 : 1 }]}
          disabled={isDoneDisabled}
        >
          <Text style={styles.done}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const Certificate = (props) => {
  const navigation = useNavigation();
  const { courseId } = props.route.params;
  const context = useContext(CourseContext);
  const { getCerificateDetails, addCourseRating } = context;
  const { width } = useWindowDimensions();
  const [certificatePath, setCertificatePath] = useState(null);
  const [name, setName] = useState(null);
  const [instructorName, setInstructorName] = useState(null);
  const [title, setTitle] = useState(null);

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(true);

  const handleCloseFeedback = () => {
    setIsFeedbackOpen(false);
  };

  const handleFeedbackSubmit = (stars) => {
    addCourseRating(courseId, stars);
  };

  const renderersProps = {
    img: {
      enableExperimentalPercentWidth: true
    }
  };

  useEffect(() => {
    const generateAndShowCertificate = async () => {
      try {
        const data = await getCerificateDetails(courseId);
        if (data.data.details) {
          setName(data.data.details.name)
          setInstructorName(data.data.details.instructor_name)
          setTitle(data.data.details.course_title)

          const filePath = await generateCertificatePDF(data.data.details.name, data.data.details.instructor_name, data.data.details.course_title, formattedDateStr);
          setCertificatePath(filePath);
        }
      } catch (error) {
        console.error('Error generating certificate:', error);
      }
    };

    generateAndShowCertificate();
  }, [courseId]);

  const openDocument = async (filePath, fileName) => {
    return new Promise((resolve, reject) => {
      try {
        const localFile = `${RNFS.DownloadDirectoryPath}/${fileName}`;
        console.log("localFile ===>", localFile);
        const options = {
          displayName: `${title}_${name}.pdf`,
          mimeType: 'application/pdf',
        };

        RNFS.copyFile(filePath, localFile, options)
          .then(() => FileViewer.open(localFile))
          .then((res) => {
            // Success
            console.log('res', res);
            resolve(res);
          })
          .catch((error) => {
            // Error
            console.log('error', error);
            reject(error);
          });
      } catch (error) {
        console.log(error);
        reject(error);
        toastAndroid('File Not Available');
      }
    });
  };

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to save the certificate.',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleDownloadCertificate = async () => {
    if (certificatePath) {
      try {
        if (Platform.OS === 'android') {
          await requestStoragePermission();
        }
        openDocument(certificatePath, `${title}_${name}.pdf`,);
      } catch (error) {
        console.error('Error downloading certificate:', error);
      }
    }
  };
  const source = {
    html: `
    <div class="certificate" style="border: 20px solid #0C5280; background-color: white; padding: 25px; text-align: center; width: 100%; height: 100%">
      <h1 style="font-weight: 400; font-size: 23px; color: #0C5280;">Certificate of Completion</h1>
      <p class="student-name" style="font-size: 24px; color: black;">${name}</p>
      <div class="certificate-content">
          <p style="text-align: center; color: black;">
              has successfully completed a course</br></br><span style="font-size: 14px; font-weight: bold">'${title}' by '${instructorName}'</span></br></br><span>on ${formattedDateStr}</span>
          </p>
          <img src="https://i.imgur.com/ZVF91Zf.png" class="logo" alt="" style="width: 100px; height: 100px;">
      </div>
    </div>`
  };

  return (
    <>
      <Header
        heading='YOU DID IT!!'
        navigate="MyCourses"
        flag={false}
      />
      <View style={styles.container}>
        {certificatePath && (
          <>
            <View style={styles.container}>
              {isFeedbackOpen && (
                <FeedbackPopup
                  onClose={handleCloseFeedback}
                  onSubmit={handleFeedbackSubmit}
                />
              )}
              <View style={styles.congrats}>
                <Text style={[styles.congratulations]}>
                  CONGRATULATIONS
                </Text>
                <Text style={[styles.youHaveSuccessfully]}>
                  YOU HAVE SUCCESSFULLY COMPLETED YOUR TEST
                </Text>
              </View>

              <View style={styles.certificate}>
                <RenderHtml
                  contentWidth={width}
                  source={source}
                  renderersProps={renderersProps}
                />
              </View>
              <View>
                <TouchableOpacity onPress={handleDownloadCertificate} style={styles.button}>
                  <Text style={styles.buttonText}>Download Certificate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  congrats: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.colorGainsboro_200,
    width: '90%',
    marginTop: 20,
  },
  congratulations: {
    textAlign: 'center',
    fontSize: FontSize.size_sm,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorDimgray_100,
  },
  youHaveSuccessfully: {
    textAlign: 'center',
    fontSize: 15,
    padding: 20,
    fontWeight: "700",
    fontFamily: FontFamily.interBold,
    color: Color.labelColorLightPrimary,
  },
  container: {
    marginBottom: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  odalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    justifyContent: 'center',
    height: 250,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Color.colorGainsboro_200,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 15,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  startext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 23
  },
  done: {
    textAlign: 'center',
    color: 'white',
  },
  button: {
    marginTop: 25,
    backgroundColor: '#373eb2',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  certificate: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 25,
    backgroundColor: Color.colorSlateblue,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});

export default Certificate;
