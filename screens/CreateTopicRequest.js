import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import teacherProfileContext from "../context/TeacherProfile/teacherProfileContext";
import { useFocusEffect } from "@react-navigation/native";
import TopicRequestContext from "../context/TopicRequest/TopicRequestContext";
import RNPickerSelect from "react-native-picker-select";
import MultiSelect from 'react-native-multiple-select';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotificationContext from "../context/Notifications/notificationContext";

const windowWidth = Dimensions.get("window").width;
const { height, width } = Dimensions.get("window");

const CreateTopicRequest = () => {

  const context = useContext(TopicRequestContext);
  const [topicAdded, setTopicAdded] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const { CreateTopicRequest } = context;
  const context1 = useContext(teacherProfileContext);
  const [items, setItems] = useState([]);
  const { getSkill, skills, addSkill, mySkills } = context1;
  const context2 = useContext(NotificationContext);
  const {
    CreateNotification
  } = context2;

  const handleDropdownChange = (value) => {
    setValue(value);
  };

  const handleDropdownChange1 = (value) => {
    setValue1(value);
  };

  const handleDropdownChange2 = (value) => {
    setValue2(value);
  };


  const val = [];

  for (let year = 1; year <= 1000; year++) {
    val.push({ label: year.toString(), value: year.toString() });
  }

  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState([]);
  const [error, setError] = useState(null);

  const handleCreateTopicRequest = async () => {
    try {
        setError(null);
        if (title.trim() === "" || description.trim() === "" || language.trim() === "" || value2.length <= 0 || value === null || value1 === null) {
          setError("Please provide complete and valid details.");
          setTimeout(() => {
            setError(null);
          }, 3000);
          return;
        }
        else{
          await CreateTopicRequest(title, description, value, value1, value2, language);
          userName = await AsyncStorage.getItem('name');
          id = await AsyncStorage.getItem('id');
          await CreateNotification(`Hi ${userName}! Your topic request was created.`, "MyTopicRequest", "Topic Request Created", id)
          setTopicAdded(true);
        }
    }
    catch (error) {
      setError("An error occurred while creating the topic request. Please try again.");
      console.error("Create topic request error:", error);
    }
  };

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await getSkill();
        skillData = [];
        for (let i = 0; i < skills.length; i++) {
          const skillName = skills[i];
          skillData.push({ label: skillName, value: skillName });
        }
        setItems(skillData);
      };
  
      fetchData();
    }, [getSkill, skills])
  );  

  useEffect(() => {
    if(topicAdded){
      navigation.navigate("MyTopicRequest")
    }
  }, [topicAdded]);
  

  const flexD = "column";

  return (
    <ScrollView style={{ flex: 1, flexDirection: flexD, backgroundColor: "#d9d9d9" }}>
      <View style={[styles.headerPosition, { position: "relative" }]}>
        <View style={[styles.headerChild, { flex: 1, width: windowWidth }]} />
        <TouchableOpacity
          style={[styles.icons8Arrow241, { left: windowWidth * 0.035 }]}
          onPress={() => navigation.navigate("MyTopicRequest")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/icons8arrow24-1.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.header}>Create Topic Request</Text>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Title</Text>
          <TextInput placeholder="Ex. Mobile App Development" placeholderTextColor="black"value={title} onChangeText={(text) => setTitle(text)} style={styles.input}/>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput placeholder="Ex. Embarking on a React Mobile App Development Journey! Seeking a Skilled Developer to Guide and Collaborate on Building Dynamic User Interfaces. Open to Hiring!" placeholderTextColor="black"value={description} onChangeText={(text) => setDescription(text)} multiline={true} style={styles.input}/>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Skills</Text>
            <MultiSelect
              hideTags
              items={items}
              uniqueKey="value"
              ref={(component) => { this.multiSelect = component }}
              onSelectedItemsChange={handleDropdownChange2}
              selectedItems={value2}
              selectText="Select Skills"
              iconSearch={<Image source={require('../assets/icons8delete24-3.png')} style={{ width: 20, height: 20 }} />}
              searchInputPlaceholderText="Search Skills"
              tagRemoveIconColor="#FFFFFF"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#373EB2"
              selectedItemIconColor="#FFFFFF"
              itemTextColor="#000"
              displayKey="label"
              searchInputStyle={{ color: '#373EB2' }}
              submitButtonColor="#373EB2"
              submitButtonText="Add"
            />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Estimated Hours</Text>
          <RNPickerSelect
              onValueChange={handleDropdownChange}
              items={val}
              placeholder={{ label: "Select hours", value: null }}
              value={value}
              style={{
                inputAndroid: {
                  backgroundColor: '#d9d9d9',
                  color: 'black',
                },
                inputIOS: {
                  backgroundColor: '#d9d9d9',
                  color: 'black',
                },
              }}
            />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Rate per Hour</Text>
          <RNPickerSelect
              onValueChange={handleDropdownChange1}
              items={val}
              placeholder={{ label: "Select rate", value: null }}
              value={value1}
              style={{
                inputAndroid: {
                  backgroundColor: '#d9d9d9',
                  color: 'black',
                },
                inputIOS: {
                  backgroundColor: '#d9d9d9',
                  color: 'black',
                },
              }}
            />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Language</Text>
          <TextInput placeholder="Ex. English" placeholderTextColor="black"value={language} onChangeText={(text) => setLanguage(text)} style={styles.input}/>
        </View>
        <TouchableOpacity
          onPress={handleCreateTopicRequest}
          style={styles.viewAllButtonContainer}
        >
          <Text style={styles.viewAllButton}>Create</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input:{
    color: 'black'
  },
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
  },
  viewAllButtonContainer: {
    backgroundColor: Color.colorSlateblue,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  viewAllButton: {
    color: Color.colorWhite,
    fontSize: FontSize.size_sm,
  },
  sectionTitle: {
    color: "black",
    fontSize: FontSize.size_lg,
    fontWeight: "700",
  },
  sectionContainer: {
    padding: 5,
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  parent: {
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  headerPosition: {
    height: 81,
    position: "absolute",
    alignItems: "center",
    paddingHorizontal: 16, // Add some padding for better spacing
    width: "100%", // Use 100% of the parent width
  },
  childIconLayout: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
  headerChild: {
    borderBottomRightRadius: Border.br_11xl,
    borderBottomLeftRadius: Border.br_11xl,
    backgroundColor: Color.colorSlateblue,
  },
  hamburgerIcon: {
    top: 33,
    left: windowWidth - 40,
    width: 25,
    height: 16,
    position: "absolute",
  },
  box: {
    margin: "0 auto",
    height: height / 6,
    alignSelf: "center",
  },
  excelInAgileTypo: {
    height: 46,
    width: 283,
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    fontSize: FontSize.size_lg,
    textAlign: "left",
    position: "absolute",
  },
  myCourses1: {
    fontSize: FontSize.size_xl,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    color: Color.colorWhite,
    width: 185,
    height: 26,
    textAlign: "center",
    top: 30,
    position: "absolute",
  },
  image1Icon: {
    width: width * 0.8,
    margin: "0 auto",
    height: width < 600 ? height / 5.5 : height / 2.8,
  },
  excelInAgile: {
    top: width < 600 ? 115 : 245,
    left: 7,
  },
  agile: {
    width: "100%", // Use 100% of the parent width
  },
  icons8Arrow241: {
    left: 13,
    width: 26,
    height: 24,
    top: 30,
    position: "absolute",
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
    width: 25,
    height: 25,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
  },
  header: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
});

export default CreateTopicRequest;