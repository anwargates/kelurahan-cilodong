import { Button, NativeSelect } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Ktp from "./syarat/Ktp";
import KK from "./syarat/KK";
import Nikah from "./syarat/Nikah";

const dropdownData = [
  { label: "Kartu Tanda Pengenal (KTP)", value: "KTP" },
  { label: "Kartu Keluarga (KK)", value: "KK" },
  { label: "Nikah (N.A)", value: "NA" },
];

const FirstStep = ({ handler, form }) => {
  const [nextStep, prevStep] = handler;
  const [selectedValue, setSelectedValue] = useState("KTP");

  const handleDropdownChange = (event) => {
    // form.setFieldValue("jenisSurat", event.currentTarget.value);
    setSelectedValue(event.currentTarget.value);
  };

  // useEffect(() => {
  //   // let isMounted = true;
  //   if (selectedValue === "KTP") {
  //     setDynamicComponent(<Ktp />);
  //   } else if (selectedValue === "KK") {
  //     setDynamicComponent(<p>Option 2 selected. Displaying Component B.</p>);
  //   } else if (selectedValue === "NA") {
  //     setDynamicComponent(<p>Option 3 selected. Displaying Component C.</p>);
  //   } else {
  //     setDynamicComponent(<p>Please select an option.</p>);
  //   }
  //   // return () => {
  //   //   isMounted = false;
  //   // };
  // }, [selectedValue]);

  const handleNext = () => {
    form.setFieldValue("jenisSurat", selectedValue);
    nextStep();
  };

  return (
    <div>
      {/* {console.log(selectedValue)} */}
      <NativeSelect
        value={selectedValue}
        onChange={handleDropdownChange}
        data={dropdownData}
      />
      {/* <h1>{Content(selectedValue)}</h1> */}
      {selectedValue === "KTP" ? (
        <Ktp />
      ) : selectedValue === "KK" ? (
        <KK />
      ) : selectedValue === "NA" ? (
        <Nikah />
      ) : (
        <p>Pilih salah satu</p>
      )}
      <button
        onClick={handleNext}
        className="w-full rounded-lg bg-primary py-4 text-2xl font-bold text-white"
      >
        Selanjutnya
      </button>
    </div>
  );
};

export default FirstStep;
