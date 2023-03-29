import React, { useState } from "react";

function Profile() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [reports, setReports] = useState(null);

  setName("Ayushi");
  setEmail("ayushi@ieeeits.vit.ac.in");
  setPhone("897654321");
  setGender("female");
  setAge("20");
  setHeight("152cm");
  setWeight("50kg");

  return (
    <div className="bg-gray-50 h-screen p-4 flex flex-col">
      <div className="text-lg">Hi {name}</div>
      <div className="flex flex-wrap w-full">
        <div className="bg-gray-300 rounded-md p-4 shadow-md w-1/2">
            Gender {gender}
        </div>
        <div className="bg-gray-300 rounded-md p-4 shadow-md w-1/2">
            Age {age}
        </div>
      </div>
      <div className="flex flex-wrap w-full">
        <div className="bg-gray-300 rounded-md p-4 shadow-md w-1/2">
            Height {height}
        </div>
        <div className="bg-gray-300 rounded-md p-4 shadow-md w-1/2">
            Weight {weight}
        </div>
      </div>
    </div>
  );
}

export default Profile;
