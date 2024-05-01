
const generateCertificateHTML = (name, instructorName, title, date) => {
    return `
    <div class="certificate" style="border: 20px solid #0C5280; background-color: white; padding: 25px; text-align: center; width: 88%; height: 50%">
      <h1 style="font-weight: 400; font-size: 60px; color: #0C5280;">Certificate of Completion</h1>
      <p class="student-name" style="font-size: 50px;">${name}</p>
      <div class="certificate-content">
          <p style="text-align: center; font-size: 20px; ">
              has successfully completed a course</br></br><span style="font-weight: bold">'${title}' by '${instructorName}'</span></br></br><span>on ${date}</span>
          </p>
          <img src="https://i.imgur.com/ZVF91Zf.png" class="logo" alt="" style="width: 120px; height: 120px;">
      </div>
    </div>`
};

export default generateCertificateHTML;
