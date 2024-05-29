/**
 * Create validation alert
 * @param {*} msg
 * @param {*} type
 */
const createAlert = (msg, type = "danger") => {
  return `<p class="alert alert-${type} d-flex justify-content-between">${msg} <button class="btn-close" data-bs-dismiss="alert"></button></p>`;
};

/**
 * Get one number
 */
const getRandomNumber = () => {
  return Math.floor(Math.random() * 9) + 1;
};

/**
 * Check a Email is Email
 * @param {*} email
 * @returns
 */
const isEmail = (email) => {
  const pattern = /^[a-z0-9\._]{1,}@[a-z0-9]{2,}\.[a-z]{2,4}$/;
  return pattern.test(email);
};

/**
 * Check a Email is Email
 * @param {*} email
 * @returns
 */
const isMobile = (mobile) => {
  const pattern = /^(\+8801|8801|01)[0-9]{9}$/;
  return pattern.test(mobile);
};

const createID = () => {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  const machineId = "xxxxxxxxxxxx".replace(/[x]/g, function () {
    return ((Math.random() * 16) | 0).toString(16);
  });
  const processId = (Math.floor(Math.random() * 1000) % 1000)
    .toString(16)
    .padStart(3, "0");
  const counter = ((Math.random() * 16777216) | 0)
    .toString(16)
    .padStart(6, "0");

  return timestamp + machineId + processId + counter;
};

/**
 *
 * @param {*} timestamp
 * @returns
 */
const timeAgo = (timestamp) => {
  const seconds = Math.floor((new Date() - timestamp) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

const timeSayed = (postDate) => {
  const currentDate = new Date();
  const diff = currentDate - postDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return postDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } else if (days > 1) {
    return `${days} days ago`;
  } else if (days === 1) {
    return "Yesterday";
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
};



let grade;
const getGrade = (mark) => {
    if(mark>=0 && mark<33){
        grade ="F";
    }else if(mark>=33 && mark<40){
        grade ="D";
    }else if(mark>=40 && mark<50){
        grade ="C";
    }else if(mark>=50 && mark<60){
        grade ="B";
    }else if(mark>=60 && mark<70){
        grade ="A-";
    }else if(mark>=70 && mark<80){
        grade ="A";
    }else if(mark>=80 && mark<=100){
        grade ="A+";
    }else {
        grade ="Error";
    }

    return grade;
}

 let gpa;
const getGpa = (mark) => {
    if(mark>=0 && mark<33){
        gpa =0;
    }else if(mark>=33 && mark<40){
        gpa =1;
    }else if(mark>=40 && mark<50){
        gpa =2;
    }else if(mark>=50 && mark<60){
        gpa =3;
    }else if(mark>=60 && mark<70){
        gpa =3.5;
    }else if(mark>=70 && mark<80){
        gpa =4;
    }else if(mark>=80 && mark<=100){
        gpa =5;
    }else {
        gpa ="Error";
    }

    return gpa;
}


//
const getGradeAndGPA = (mark) => {
  let grade;
  let gpa;

  if (mark >= 0 && mark < 33) {
    grade = "F";
    gpa = 0;
  } else if (mark >= 33 && mark < 40) {
    grade = "D";
    gpa = 1;
  } else if (mark >= 40 && mark < 50) {
    grade = "C";
    gpa = 2;
  } else if (mark >= 50 && mark < 60) {
    grade = "B";
    gpa = 3;
  } else if (mark >= 60 && mark < 70) {
    grade = "A-";
    gpa = 3.5;
  } else if (mark >= 70 && mark < 80) {
    grade = "A";
    gpa = 4;
  } else if (mark >= 80 && mark <= 100) {
    grade = "A+";
    gpa = 5;
  } else {
    grade = "invalid";
    gpa = "invalid";
  }

  return {
    gpa: gpa,
    grade: grade,
  };
};


const resultSystemPro = (marks) => {
  const { bangla, english, math, science, social, reli } = marks;

  const totalGpaAvg = (
    (getGradeAndGPA(bangla).gpa +
      getGradeAndGPA(english).gpa +
      getGradeAndGPA(math).gpa +
      getGradeAndGPA(science).gpa +
      getGradeAndGPA(social).gpa +
      getGradeAndGPA(reli).gpa) /
    6
  ).toFixed(2);

  if (
    bangla >= 33 &&
    english >= 33 &&
    math >= 33 &&
    science >= 33 &&
    social >= 33 &&
    reli >= 33
  ) {
    if (totalGpaAvg >= 0 && totalGpaAvg < 1) {
      return {
        gpa: totalGpaAvg,
        grade: "F",
      };
    } else if (totalGpaAvg >= 1 && totalGpaAvg < 2) {
      return {
        gpa: totalGpaAvg,
        grade: "D",
      };
    } else if (totalGpaAvg >= 2 && totalGpaAvg < 3) {
      return {
        gpa: totalGpaAvg,
        grade: "C",
      };
    } else if (totalGpaAvg >= 3 && totalGpaAvg < 3.5) {
      return {
        gpa: totalGpaAvg,
        grade: "B",
      };
    } else if (totalGpaAvg >= 3.5 && totalGpaAvg < 4) {
      return {
        gpa: totalGpaAvg,
        grade: "A-",
      };
    } else if (totalGpaAvg >= 4 && totalGpaAvg < 5) {
      return {
        gpa: totalGpaAvg,
        grade: "A",
      };
    } else if (totalGpaAvg >= 5) {
      return {
        gpa: totalGpaAvg,
        grade: "A+",
      };
    }
  } else {
    return {
      gpa: 0,
      grade: "F",
    };
  }
};



/**
 * 
 * @param {*} s1 
 * @param {*} s2 
 * @param {*} s3 
 * @param {*} s4 
 * @param {*} s5 
 * @param {*} s6 
 * @param {*} s7 
 * @returns 
 */
const isPassed = (s1,s2,s3,s4,s5,s6,s7)=>{
    if(s1>=33 && s2>=33 && s3>=33 && s4>=33 && s5>=33 && s6>=33 && s7 >=33){
        return true;
    }else{
        return false;
    }
}

let getFinalGpa=(s1,s2,s3,s4,s5,s6,s7)=>{
    if(s1>=33 && s2>=33 && s3>=33 && s4>=33 && s5>=33 && s6>=33 && s7 >=33){
        let totalGpa = getGpa(s1)+getGpa(s2)+getGpa(s3)+getGpa(s4)+getGpa(s5)+getGpa(s6)+getGpa(s7);
        return totalGpa/7;
    }else{
        return 0;
    }
}

let getFinalGrade=(s1,s2,s3,s4,s5,s6,s7)=>{
    let finalGpa =getFinalGpa(s1,s2,s3,s4,s5,s6,s7);

    if(finalGpa>=0 && finalGpa<1){
        return "F";
    }else if(finalGpa>=1 && finalGpa<2){
        return "D";
    }else if(finalGpa>=2 && finalGpa<3){
        return "C";
    }else if(finalGpa>=3 && finalGpa<3.5){
        return "B";
    }else if(finalGpa>=3.5 && finalGpa<4){
        return "A-";
    }else if(finalGpa>=4 && finalGpa<5){
        return "A";
    }else if(finalGpa>=5){
        return "A+";
    }

}
