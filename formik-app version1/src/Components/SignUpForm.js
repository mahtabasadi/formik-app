import { useState } from "react";
const SignUpForm = () => {
  //          _______________________________________      in the state named userData we have placed the user's information.
  //         |
  const [userData, setUserData] = useState({
    name: "", //       |_______________________________________    whith setstate named set userdata we can change user information as we want.
    email: "",
    password: "",
  });
  //           ______________________________   
  //          |                  _______________________________________     in this part of the code, instead of putting e in curly brackets, we put target in order to clean our coding.
  //          |                 |
  const changeHandeler = ({ target }) => {
    //       __________________________________     in this part of the code, we will change the user information as we want with the setstate named setUserData.
    //      |              _______________________________________    in this part of the code, with the help of the state named userData, we have taken a complet copy of the worksheet information so as not to change the original information. 
    //      |             |
    setUserData({ ...userData, [target.name]: target.value });
    //                                |________________|_______________________    in this part of the code, we have caled the name from the user information with the halp of target.
    //                                                 |_____________________________________________  in this part of the code, writing target.value causes the information that the user writs in her inputto be placed as its named. 
  };
  const submitHandeler = (e) => {
    e.preventDefault();
    console.log("submitted...");
    // call the server => submit data => post => user
  };

  return (  
    <div> {/*    _________________________________  The onsubmit event occurs when a form is submitted. 
                |       */}
      <form onSubmit={submitHandeler}>
        <div className="formControl">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}    
    //               _____________________________________     management of inputs
    //              |   
            onChange={changeHandeler}
          ></input>
        </div>
        <div className="formControl">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={changeHandeler}
          ></input>
        </div>
        <div className="formControl">
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={userData.password}
            onChange={changeHandeler}
          ></input>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;

// 1. managing state
// 2. handeling form submition
// 3. validation - error massage
// => formik