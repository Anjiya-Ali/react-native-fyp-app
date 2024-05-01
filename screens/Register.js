import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, ScrollView, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Color } from "../GlobalStyles";
import userContext from "../context/User/userContext";
import StudentContext from '../context/StudentProfile/studentProfileContext';
import TeacherContext from '../context/TeacherProfile/teacherProfileContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const context1 = useContext(userContext);
    const {
        handleUserLogin,
    } = context1;

    const context2 = useContext(StudentContext);
    const {
        getStudent,
    } = context2;

    const context3 = useContext(TeacherContext);
    const {
        getTeacher,
    } = context3;

    const handleLogin = async () => {
        if (!validateRequiredFields([email, password])) {
            setError('Please fill in all the fields!');
            setTimeout(() => {
                setError(null);
              }, 3000);
              return;
        }
        else{
            const user = await handleUserLogin(email, password);
            if(!user.success && user.error === "Please try to login with correct credentials"){
                setError('Invalid Credentials!');
                setTimeout(() => {
                    setError(null);
                  }, 3000);
                return;
            }
            else if(!user.success && user.error === "User not exist"){
                setError('You Have Been Blocked by the Admin');
                setTimeout(() => {
                    setError(null);
                  }, 3000);
                return;
            }
            else if(user.success){
                const name = await AsyncStorage.getItem('name');
                if(user.role === "Student"){
                    const userProfile = await getStudent();
                    if(!userProfile.education.length){
                        navigation.navigate("StudentProfile", { name: name, email: email }) //change
                    }
                    else{
                        navigation.navigate("HomePage1") //change
                    }
                }
                else if(user.role === "Teacher"){
                    const teacherProfile = await getTeacher();
                    if(!teacherProfile.education.length){
                        navigation.navigate("TeacherProfile", { name: name, email: email }) //change
                    }
                    else{
                        navigation.navigate("TeacherHomePage") //change
                    }
                }
                else if(user.role === "Admin"){
                    navigation.navigate("AdminHomePage") //change
                }
            }
        }
    };

    const handleForgotPasswordPress = async () => {
        navigation.navigate("EmailVerification")
    };

    const validateRequiredFields = (fields) => {
        return fields.every((field) => field.trim() !== '');
    };

    return (
        <ScrollView style={styles.paybox}>
            <Text style={styles.header}>Login to your Account</Text>
            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={handleForgotPasswordPress}>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const navigation = useNavigation();
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const countryList = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan (Province of China)",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
    ]
    const [countries, setCountries] = useState(countryList);
    const context = useContext(userContext);
    const { registerUser } = context;


    const handleRegister = async () => {

        if (!validateRequiredFields([firstName, lastName, dob, gender, email, location, password, reEnterPassword])) {
            setError('Please fill in all the fields!');
            setTimeout(() => {
                setError(null);
              }, 3000);
            return;
        }

        // Validation checks
        if (!validateEmail()) {
            setError('Please enter a valid email address!');
            setTimeout(() => {
                setError(null);
              }, 3000);
            return;
        }

        if (!validatePassword()) {
            setError(
                'Password needs an uppercase letter and a special character!'
            );
            setTimeout(() => {
                setError(null);
              }, 3000);
            return;
        }

        if (!validatePasswordMatch()) {
            setError('Passwords do not match!');
            setTimeout(() => {
                setError(null);
              }, 3000);
            return;
        }

        const response = await registerUser(firstName, lastName, password, email, gender, location, dob, selectedProfession);
        if(!response.success){
            setError(response.error);
            setTimeout(() => {
                setError(null);
              }, 3000);
        }
        else{
            await handleUserLogin(email, password);

            if(selectedProfession == 'Student')
                navigation.navigate("StudentProfile", { name: firstName + ' ' + lastName, email: email });
            if(selectedProfession == 'Teacher')
                navigation.navigate("TeacherProfile", { name: firstName + ' ' + lastName, email: email });
        }
    };

    const validateRequiredFields = (fields) => {
        return fields.every((field) => field.trim() !== '');
    };

    const validateEmail = () => {
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = () => {
        // Password validation with at least one capital letter, one small letter, one number, and one special character
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*.,?])[a-zA-Z0-9!@#$%^&*.,?]+$/;
        return passwordRegex.test(password);
    };

    const validatePasswordMatch = () => {
        return password === reEnterPassword;
    };

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const dateString = date.toLocaleDateString(undefined, options);
        setDob(dateString);
        hideDatePicker();
    };

    const [selectedProfession, setSelectedProfession] = useState(null);

    const handleProfessionSelection = (profession) => {
        setSelectedProfession(profession);
    };

    return (
        <>
            {selectedProfession === null ? (
                <View style={styles.payboxProfession}>
                    <Text style={styles.header}>Choose Your Profession</Text>
                    <View style={styles.professionContainer}>
                        <TouchableOpacity
                            onPress={() => handleProfessionSelection('Student')}
                            style={styles.professionButton}
                        >
                            <Image source={require('../assets/imageizlyy1zfitransformed-12.png')} style={styles.professionIcon} />
                            <Text style={styles.professionText}>Student</Text>
                        </TouchableOpacity>
                        <View style={styles.tiltedDivider} />
                        <TouchableOpacity
                            onPress={() => handleProfessionSelection('Teacher')}
                            style={styles.professionButton}
                        >
                            <Image source={require('../assets/pngtreelecturersuitgirlillustrationpngimage-4608040transformedremovebgpreview-1.png')} style={styles.professionIcon2} />
                            <Text style={styles.professionText}>Teacher</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <ScrollView style={styles.paybox} showsVerticalScrollIndicator={false}>
                    <Text style={styles.header}>Create a New Account</Text>
                    {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                    />

                    <TouchableOpacity onPress={showDatePicker} style={styles.input}>
                        {dob ? (
                            <Text style={styles.datePickerButtonText}>{dob}</Text>
                        ) : (
                            <Text style={styles.placeholderText}>Select Birth Date</Text>
                        )}
                    </TouchableOpacity>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                    <View>
                        <RNPickerSelect
                            onValueChange={(itemValue) => setGender(itemValue)}
                            items={[
                                { label: 'Male', value: 'Male' },
                                { label: 'Female', value: 'Female' },
                            ]}
                            placeholder={{ label: "Gender", value: null }}
                            value={gender}
                            ColorValue='black'
                            style={{
                                inputAndroid: {
                                    backgroundColor: '#f4f4f4',
                                    color: 'black',
                                    marginBottom: 20,
                                },
                            }}
                        />
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Re-enter Password"
                        secureTextEntry
                        value={reEnterPassword}
                        onChangeText={(text) => setReEnterPassword(text)}
                    />

                    <View style={styles.dropdownContainer}>
                        <RNPickerSelect
                            onValueChange={(itemValue) => setLocation(itemValue)}
                            items={countries.map((country) => ({ label: country, value: country }))}
                            placeholder={{ label: "Country", value: null }}
                            value={location}
                            ColorValue='black'
                            style={{
                                inputAndroid: {
                                    backgroundColor: '#f4f4f4',
                                    color: 'black',
                                    marginBottom: 20,
                                },
                            }}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </>
    );
};

const AuthScreen = () => {
    const [selectedHeading, setSelectedHeading] = useState('Login');

    const handleHeadingPress = (heading) => {
        setSelectedHeading(heading);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/picture4-2.png')} style={styles.logo} />
                <Text style={styles.learnLanceHeader}>LEARNLANCE</Text>
            </View>
            <View style={styles.paybox2}>
                {selectedHeading === 'Login' ?
                    <>
                        <TouchableOpacity
                            onPress={() => handleHeadingPress('Register')}
                        >
                            <Text style={styles.header2}>Create a New Account</Text>
                        </TouchableOpacity>
                        <LoginScreen />
                    </>
                    :
                    <>
                        <TouchableOpacity
                            onPress={() => handleHeadingPress('Login')}
                        >
                            <Text style={styles.header2}>Login to your Account</Text>
                        </TouchableOpacity>
                        <RegisterScreen />
                    </>
                }
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
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
    forgot: {
        color: Color.colorSlateblue,
        textAlign: 'center',
        marginBottom: 30,
    },
    professionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '100%'
    },
    professionButton: {
        flex: 1,
        alignItems: 'center',
    },
    professionIcon: {
        width: 200,
        height: 200,
        marginTop: 25,
        resizeMode: 'contain',
    },
    professionIcon2: {
        width: 200,
        height: 200,
        marginTop: 25,
        marginRight: 20,
        resizeMode: 'cover',
    },
    professionText: {
        marginTop: 10,
        fontSize: 18,
        color: 'black',
    },
    tiltedDivider: {
        width: 1.5,
        margin: 30,
        backgroundColor: Color.colorSlateblue,
        marginBottom: 300,
    },
    payboxProfession: {
        paddingTop: 30,
        height: '100%',
        width: '100%',
        marginTop: '5%',
        borderColor: Color.labelColorLightPrimary,
        borderStyle: "solid",
        borderRadius: 20,
        backgroundColor: Color.colorGainsboro_200,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
    },
    paybox: {
        padding: 20,
        paddingTop: 30,
        height: '100%',
        width: '100%',
        marginTop: '5%',
        borderColor: Color.labelColorLightPrimary,
        borderStyle: "solid",
        borderRadius: 20,
        backgroundColor: Color.colorGainsboro_200,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
    },
    paybox2: {
        marginTop: 20,
        height: '80%',
        width: '100%',
        borderColor: Color.labelColorLightPrimary,
        borderStyle: "solid",
        borderRadius: 30,
        backgroundColor: Color.colorSlateblue,
        shadowOpacity: 1,
        elevation: 4,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: "rgba(0, 0, 0, 0.25)",
    },
    placeholderText: {
        marginTop: 8,
        fontSize: 15.5,
        color: 'gray',
    },
    loginContainer: {
        marginTop: 30,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150, // Adjust the width based on your design
        height: 150, // Adjust the height based on your design
        resizeMode: 'contain',
        marginBottom: 10,
    },
    learnLanceHeader: {
        fontSize: 40,
        textTransform: 'uppercase',
        color: 'black'
    },
    container: {
        flex: 1,
    },
    banner: {
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        marginTop: 20,
    },
    heading: {
        flex: 1,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: Color.colorSlateblue,
    },
    selectedHeading: {
        backgroundColor: Color.colorGray_100,
    },
    headingText: {
        color: 'white',
        fontSize: 18,
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: '#f4f4f4',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
        // Adding shadow for a subtle lift
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    button: {
        backgroundColor: Color.colorSlateblue,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: 150,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 150,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    datePickerButton: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    datePickerButtonText: {
        marginTop: 8,
        fontSize: 15.5,
        color: 'black',
    },
    header: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 30,
        color: 'black'
    },
    header2: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
    },
    dropdownContainer: {
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 4,
    },
    label: {
        fontSize: 16,
        marginRight: 10,
    },
    dropdown: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        backgroundColor: Color.colorGainsboro_200,
        borderWidth: 1,
    },
});

export default AuthScreen;