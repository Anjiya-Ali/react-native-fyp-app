import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CourseContext from "../context/Courses/courseContext";

const windowWidth = Dimensions.get('window').width;

const Tab = createBottomTabNavigator();

const IndicatorBall = () => (
  <View style={styles.indicatorBall} />
);

const { height, width } = Dimensions.get('window');

function Courses() {
  const { getCourses, allCourses, setCourse } = useContext(CourseContext);
  const [numColumns, setNumColumns] = useState(2);
  const [flatListKey, setFlatListKey] = useState('initialKey');
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const host = "http://192.168.0.147:3000"

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      await getCourses();
      setFilteredData(allCourses);
    };
  
    setCourse(null);
    fetchData();
  }, [allCourses]);

  useEffect(() => {
    let newNumColumns = calculateNumColumns();
    setNumColumns(newNumColumns);
    setFlatListKey((prevKey) => prevKey + 1);
  }, []);

  useEffect(() => {
    if (allCourses) {
      const filtered = allCourses.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
      setFilteredData(filtered);
    }
  }, [search]);

  const calculateNumColumns = () => {
    const screenWidth = Dimensions.get('window').width;
    const desiredItemWidth = 150; // Adjust based on your desired item width
    return Math.max(Math.floor(screenWidth / desiredItemWidth), 1);
  };

  const calculateItemWidth = () => {
    const screenWidth = Dimensions.get('window').width;
    const numColumns = calculateNumColumns();
    return screenWidth / numColumns;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("BuyCourse", { course_id: item._id, navigate: 'CoursesE1' })}
    >
      <View style={[styles.itemContainer, { width: calculateItemWidth() }]}>
        <View style={styles.imageContainer}>
          
            <Image
              source={{ uri: `${host}/${item.featured_image}` }}
              style={styles.image}
            />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.ratingFeesContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../assets/star-1.png')}
              style={{ width: 22, height: 18, marginTop: 3}}
            />
            <Text style={styles.ratingText}>{Math.round(item.rating)}</Text>
          </View>
          <View style={styles.feesContainer}>
            <Text style={styles.feesText}>{`$${item.fees}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={[styles.headerPosition, { position: 'relative' }]}>
        <View style={[styles.headerChild, { flex: 1, width: windowWidth }]} />
        <Image
          style={styles.hamburgerIcon}
          resizeMode="cover"
          source={require("../assets/hamburger1.png")}
        />
        <Text style={styles.myCourses1}>COURSES</Text>
        <TouchableOpacity
          style={[styles.icons8Arrow241, { left: windowWidth * 0.035 }]}
          onPress={() => navigation.navigate("ELearningPage")}
        >
          <Image
            resizeMode="cover"
            source={require("../assets/icons8arrow24-1.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
        />
        <Image
          style={styles.searchIcon}
          source={require('../assets/ask-1.png')} // Replace with your search icon
        />
      </View>

      <FlatList
        key={flatListKey}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal={false}
        numColumns={numColumns}
        style={styles.flatList}
      />
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      swipeEnabled={true}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#373eb2', // Set background color
          borderTopLeftRadius: 20, // Set border radius for the top-left corner
          borderTopRightRadius: 20, // Set border radius for the top-right corner
        },
        tabBarActiveTintColor: 'white', // Set active tab text color
        tabBarInactiveTintColor: 'white', // Set inactive tab text color
        tabBarLabelStyle: { fontSize: 16, paddingBottom: 5 }, // Set font size and padding for tab text
        tabBarShowIcon: false, // Hide icons
        tabBarShowLabel: true, // Show labels
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <IndicatorBall />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen name="Courses" component={Courses} />
      <Tab.Screen name="Teachers" component={Courses} />
      <Tab.Screen name="Communities" component={Courses} />
    </Tab.Navigator>
  );
}

const CoursesE1 = () => {
  return (
    <MyTabs />
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginRight: '2%',
    flex: 1,
  },
  ratingText: {
    color: '#8e8e93',
    fontWeight: 'bold'
  },
  feesText: {
    color: '#8e8e93',
    fontWeight: 'bold'
  },
  ratingFeesContainer: {
    flexDirection: 'row',
    marginTop: 1,
    alignSelf: 'center'
  },
  feesContainer: {
    marginTop: 1,
    marginLeft: 10, 
  },
  indicatorBall: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    position: 'absolute',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    padding: 8,
    borderRadius: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: '2%',
  },
  container: {
    margin: '2%',
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
  },
  imageContainer: {
    aspectRatio: 2,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 10,
    fontSize: 10,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  headerPosition: {
    height: 81,
    position: "absolute",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16, // Add some padding for better spacing
    width: "100%", // Use 100% of the parent width
  },
  childIconLayout: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    borderRadius: 10,
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
  icons8Arrow241: {
    left: 13,
    width: 26,
    height: 24,
    top: 30,
    position: "absolute",
  },
});

export default CoursesE1;