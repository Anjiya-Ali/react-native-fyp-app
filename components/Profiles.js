import React from "react";
import { FlatList, Image, StyleSheet, Pressable, View, Text, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../styles/GlobalStyles";

const Profiles = () => {
  const navigation = useNavigation();

  // Sample data: Array of profile objects
  const profilesData = [
    {
      id: 1,
      name: "Romasha Khurshid",
      bio: "Master's in Computer Engineering | Crafting Tomorrow's Code",
      image: require("../assets/active.png"),
    },
    {
      id: 2,
      name: "Dr. Gufran Ahmed",
      bio: "PhD in Computer Science | Extracting Insights from Data",
      image: require("../assets/active.png"),
    },
    
      
    // Add more profiles as needed
  ];

  const renderItem = ({ item }) => (
    <View style={styles.profileItem}>
      <Image style={styles.profileImage} resizeMode="cover" source={item.image} />
      <View style={styles.profileDetails}>
        <Text style={styles.profileName}>{item.name}</Text>
        <Text style={styles.profileBio}>{item.bio}</Text>
        <View style={styles.inviteWrapper}>
          <Text style={styles.invite}>Invite</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image style={styles.backIcon} resizeMode="cover" source={require("../assets/active.png")} />
        </Pressable>
        <Text style={styles.headerTitle}>Profiles</Text>
      </View>

      <View style={styles.searchBar}>
        <Image source={require("../assets/search-icon.png")} style={styles.searchIcon} />
        <TextInput
            style={styles.searchBarInput}
            placeholder="Search profiles"
            placeholderTextColor="gray" // or "dimgray"
        />

        {/* Optional: Add a button or an icon for clearing the search input */}
     </View>
      <FlatList
        data={profilesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorGainsboro_100,
  },
  searchBarInput: {
    flex: 1,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.calibri,
    color: Color.colorBlack,
    // Additional styles for better visibility
    placeholderTextColor: "gray", // or "dimgray"
    // Add other styles as needed
  },  
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8, // Adjusted header padding
    backgroundColor: Color.colorSlateblue,
  },
  backButton: {
    marginRight: 8, // Adjusted back button margin
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: FontSize.size_md, // Adjusted header title font size
    color: Color.colorWhite,
    fontFamily: FontFamily.javaneseText,
  },
  searchBar: {
    backgroundColor: "white",
    padding: 8, // Adjusted search bar padding
    margin: 8,
    borderRadius: 8,
  },
  searchBarInput: {
    flex: 1,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.calibri,
    color: Color.colorBlack,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: "gray", // Adjust the color as needed
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
    padding: 16,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_sm,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16, // Adjusted margin for the profile image
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: FontSize.size_base,
    fontWeight: "700",
    color: Color.colorBlack,
    marginTop: 8,
  },
  profileBio: {
    fontSize: FontSize.size_sm,
    color: Color.colorBlack,
    marginTop: 4,
  },
  inviteWrapper: {
    marginTop: 8,
    borderRadius: Border.br_base,
    width: 96,
    height: 31,
    backgroundColor: Color.colorSlateblue,
  },
  invite: {
    textAlign: "center",
    lineHeight: 31,
    color: Color.colorGainsboro_100,
    fontFamily: FontFamily.calibri,
    fontWeight: "700",
    fontSize: FontSize.size_lg,
  },
});

export default Profiles;
