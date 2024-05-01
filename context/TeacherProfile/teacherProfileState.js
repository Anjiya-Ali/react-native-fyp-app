import TeacherProfileContext from "./teacherProfileContext";
import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const teacherProfileState = (props) => {
    const host = "http://192.168.0.147:3000"
    const userProfileInitial = []
    const [teacherProfile, setTeacherProfile] = useState(userProfileInitial)
    const [otherUserProfile, setOtherUserProfile] = useState(userProfileInitial)
    const [experience, setExperiences] = useState(userProfileInitial)
    const [languages, setLanguages] = useState(userProfileInitial)
    const [educations, setEducations] = useState(userProfileInitial)
    const [haw, setHaw] = useState(userProfileInitial)
    const [certifications, setCertifications] = useState(userProfileInitial)
    const [projects, setProjects] = useState(userProfileInitial)
    const [interests, setInterests] = useState(userProfileInitial)
    const [skills, setSkills] = useState(userProfileInitial)
    const [mySkills, setMySkills] = useState({})
    const [connections, setConnections] = useState(userProfileInitial)
    const [pendingConnections, setPendingConnections] = useState(userProfileInitial)

    const getTeacherProfilePicture = async () => {
      try {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/GetProfilePicture`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });
        const json = await response.json()
        return json;
      }
      catch (error) {
        console.error('Error getting profile pic:', error.message);
      }
    }

    const addBio = async (bio) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/AddBio`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({bio})
        });
        if (!response.ok) {
          console.error('Error adding bio:', response.status);
          return;
        }
        const json = await response.json()
        setBio(json.bio)
      }
      catch (error) {
        console.error('Error adding bio:', error.message);
      }
    }

    const addProfilePic = async (formData) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/UploadProfilePicture`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            "auth-token": token
          },
          body:formData
        });
        if (!response.ok) {
          console.error('Error adding profile pic:', response.status);
          return;
        }
        await response.json()
      }
      catch (error) {
        console.error('Error adding profile pic:', error.message);
      }
    }

    const updateBio = async (bio) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/AddBio`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({bio})
        });
        if (!response.ok) {
          console.error('Error updating teacher bio:', response.status);
          return;
        }
        const json = await response.json()
      }
      catch (error) {
        console.error('Error updating teacher bio:', error.message);
      }
    }
  
    const getTeacher = async () => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/GetProfile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });
        if (!response.ok) {
          console.error('Error fetching teacher profile:', response.status);
          return;
        }
        const json = await response.json()
        setTeacherProfile(json)
        return json;
      }
      catch (error) {
        console.error('Error fetching teacher profile:', error.message);
      }
    }

    const addExperience = async (title, company, start_date, end_date, location) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/AddExperience`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({title, company, start_date, end_date, location})
        });
        if (!response.ok) {
          console.error('Error adding experience:', response.status);
          return;
        }
        const json = await response.json()
        setExperiences(json.experiences)
      }
      catch (error) {
        console.error('Error adding experience:', error.message);
      }
    }

    const editExperience = async (title, company, start_date, end_date, location, id) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/EditExperience/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({title, company, start_date, end_date, location})
        });
        if (!response.ok) {
          console.error('Error updating experience:', response.status);
          return;
        }
        await response.json()
      }
      catch (error) {
        console.error('Error updating experience:', error.message);
      }
    }

    const deleteExperience = async (experienceId) => {
      try {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/DeleteExperience/${experienceId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });

        if (!response.ok) {
          console.error('Error deleting experience:', response.status);
          return;
        }
        const json = await response.json()
        setExperiences(json.education);
      } catch (error) {
        console.error('Error deleting experience:', error);
      }
    };

    const addEducation = async (school, degree, start_date, end_date, grade) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/AddEducation`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({school, degree, start_date, end_date, grade})
        });
        if (!response.ok) {
          console.error('Error adding education:', response.status);
          return;
        }
        const json = await response.json()
        setEducations(json)
      }
      catch (error) {
        console.error('Error adding education:', error.message);
      }
    }

    const addCertification = async (title, issuer, link) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/AddCertifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({title, issuer, link})
        });
        if (!response.ok) {
          console.error('Error adding certification:', response.status);
          return;
        }
        const json = await response.json()
        setCertifications(json)
      }
      catch (error) {
        console.error('Error adding certification:', error.message);
      }
    }

    const editCertification = async (title, issuer, link, id) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/EditCertification/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({title, issuer, link})
        });
        if (!response.ok) {
          console.error('Error updating certification:', response.status);
          return;
        }
        await response.json()
      }
      catch (error) {
        console.error('Error updating certification:', error.message);
      }
    }

    const deleteCertification = async (certificateId) => {
      try {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/DeleteCertificate/${certificateId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });

        if (!response.ok) {
          console.error('Error deleting certificate:', response.status);
          return;
        }
        const json = await response.json()
        setCertifications(json.languages);
      } catch (error) {
        console.error('Error deleting certificate:', error);
      }
    };

    const addProject = async (title, description, start_date, end_date, link) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/AddProjects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({title, description, start_date, end_date, link})
        });
        if (!response.ok) {
          console.error('Error adding project:', response.status);
          return;
        }
        const json = await response.json()
        setProjects(json)
      }
      catch (error) {
        console.error('Error adding project:', error.message);
      }
    }

    const editProject = async (title, description, start_date, end_date, link, id) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/EditProject/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({title, description, start_date, end_date, link})
        });
        if (!response.ok) {
          console.error('Error updating project:', response.status);
          return;
        }
        await response.json()
      }
      catch (error) {
        console.error('Error updating project:', error.message);
      }
    }

    const deleteProject = async (projectId) => {
      try {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/DeleteProject/${projectId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });

        if (!response.ok) {
          console.error('Error deleting project:', response.status);
          return;
        }
        const json = await response.json()
        setProjects(json.projects);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    };

    const addHaw = async (title, issuer, issue_date) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/AddHAW`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({title, issuer, issue_date})
        });
        if (!response.ok) {
          console.error('Error adding haw:', response.status);
          return;
        }
        const json = await response.json()
        setHaw(json)
      }
      catch (error) {
        console.error('Error adding haw:', error.message);
      }
    }

    const editHaw = async (title, issuer, issue_date, id) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/EditHAW/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({title, issuer, issue_date})
        });
        if (!response.ok) {
          console.error('Error updating haw:', response.status);
          return;
        }
        await response.json()
      }
      catch (error) {
        console.error('Error updating haw:', error.message);
      }
    }

    const deleteHaw = async (hawId) => {
      try {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/DeleteHAW/${hawId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });

        if (!response.ok) {
          console.error('Error deleting haw:', response.status);
          return;
        }
        const json = await response.json()
        setHaw(json.skills);
      } catch (error) {
        console.error('Error deleting haw:', error);
      }
    };

    const addLanguage = async (name, level) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/AddLanguages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({name, level})
        });
        if (!response.ok) {
          console.error('Error adding language:', response.status);
          return;
        }
        const json = await response.json()
        setLanguages(json)
      }
      catch (error) {
        console.error('Error adding language:', error.message);
      }
    }

    const getSkill = async () => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Admin/GetSkills`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          console.error('Error getting skill:', response.status);
          return;
        }
        const json = await response.json()
        setSkills(json.skills)
      }
      catch (error) {
        console.error('Error getting skill:', error.message);
      }
    }

    const addSkill = async (name) => {
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/AddSkills`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({name})
        });
        if (!response.ok) {
          console.error('Error adding skill:', response.status);
          return;
        }
        const json = await response.json()
        setMySkills(json)
      }
      catch (error) {
        console.error('Error adding skill:', error.message);
      }
    }

    const deleteSkill = async (skillId) => {
      try {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/DeleteSkills/${skillId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });

        if (!response.ok) {
          console.error('Error deleting skill:', response.status);
          return;
        }
        const json = await response.json()
        setSkills(json.skills);
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    };

    const editLanguage = async (name, level, id) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/EditLanguage/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({name, level})
        });
        if (!response.ok) {
          console.error('Error updating language:', response.status);
          return;
        }
        await response.json()
      }
      catch (error) {
        console.error('Error updating language:', error.message);
      }
    }

    const deleteLanguage = async (languageId) => {
      try {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/DeleteLanguage/${languageId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });

        if (!response.ok) {
          console.error('Error deleting language:', response.status);
          return;
        }
        const json = await response.json()
        setLanguages(json.languages);
      } catch (error) {
        console.error('Error deleting language:', error);
      }
    };

    const editEducation = async (school, degree, start_date, end_date, grade, id) => {      
      try{
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/EditEducation/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
          body: JSON.stringify({school, degree, start_date, end_date, grade})
        });
        if (!response.ok) {
          console.error('Error updating education:', response.status);
          return;
        }
        await response.json()
      }
      catch (error) {
        console.error('Error updating education:', error.message);
      }
    }

    const deleteEducation = async (educationId) => {
      try {
        const token = await AsyncStorage.getItem('tokenn');
        const response = await fetch(`${host}/api/Teacher/DeleteEducation/${educationId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token
          },
        });

        if (!response.ok) {
          console.error('Error deleting education:', response.status);
          return;
        }
        const json = await response.json()
        setEducations(json.education);
      } catch (error) {
        console.error('Error deleting education:', error);
      }
    };

    // const getStudentConnections = async () => {      
    //   try{
    //     const response = await fetch(`${host}/api/SocialHub/GetMyConnections`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         "auth-token": token
    //       },
    //     });
    //     if (!response.ok) {
    //       console.error('Error fetching student connections:', response.status);
    //       return;
    //     }
    //     const json = await response.json()
    //     setConnections(json.connections)
    //   }
    //   catch (error) {
    //     console.error('Error fetching student connections:', error.message);
    //   }
    // }

    // const getStudentPendingConnections = async () => {      
    //   try{
    //     const response = await fetch(`${host}/api/SocialHub/GetPendingConnections`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         "auth-token": token
    //       },
    //     });
    //     if (!response.ok) {
    //       console.error('Error fetching student pending connections:', response.status);
    //       return;
    //     }
    //     const json = await response.json()
    //     setPendingConnections(json.connections)
    //   }
    //   catch (error) {
    //     console.error('Error fetching student pending connections:', error.message);
    //   }
    // }

    // const acceptRequest = async (id) => {      
    //   try{
    //     const response = await fetch(`${host}/api/SocialHub/AcceptRequest/${id}`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         "auth-token": token
    //       },
    //     });
    //     if (!response.ok) {
    //       console.error('Error accepting request', response.status);
    //       return;
    //     }
    //     const json = await response.json()
    //   }
    //   catch (error) {
    //     console.error('Error accepting request', error.message);
    //   }
    // }

    // const getOtherProfile = async (id) => {      
    //   try{
    //     const response = await fetch(`${host}/api/User/GetProfileForOther/${id}`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         "auth-token": token
    //       },
    //     });
    //     if (!response.ok) {
    //       console.error('Error fetching other student profile:', response.status);
    //       return;
    //     }
    //     const json = await response.json()
    //     setOtherUserProfile(json)
    //   }
    //   catch (error) {
    //     console.error('Error fetching other student profile:', error.message);
    //   }
    // }
  
    return (
    <TeacherProfileContext.Provider value={{ addBio, getTeacherProfilePicture, teacherProfile, getTeacher, addExperience, addEducation, addCertification, addProject, addHaw, addLanguage, getSkill, skills, addSkill, mySkills, deleteLanguage, deleteSkill, deleteProject, deleteHaw, deleteCertification, deleteEducation, deleteExperience, editExperience, editEducation, editLanguage, editCertification, editProject, editHaw, updateBio, addProfilePic }}>
      {props.children}
    </TeacherProfileContext.Provider>
    )
  }
  
  export default teacherProfileState;