/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useEffect, useState } from "react";
import ChartCom from "../../../components/chart/ChartCom";
import "./Statistics.css";
import { useFetch } from "../../../hooks/useFetch";
import { genders } from "../../../static";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Pie, PolarArea, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Statistics() {
  const {
    fetchError: filterByMajorError,
    data: filterByMajor,
    loading: filterByMajorLoading,
  } = useFetch("/api/statistics/all-students-by-major");

  const {
    fetchError: filterByRegionError,
    data: filterByRegion,
    loading: filterByRegionLoading,
  } = useFetch("/api/statistics/all-students-by-region");

  const {
    fetchError: filterByGenderError,
    data: filterByGender,
    loading: filterByGenderLoading,
  } = useFetch("/api/statistics/all-students-by-gender");

  const {
    fetchError: filterByDateError,
    data: filterByDate,
    loading: filterByDateLoading,
  } = useFetch("/api/statistics/all-students-by-date");

  const [showingYearly, setShowingYearly] = useState(false);

  // majorFilter started
  const [majorOption, setMajorOption] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Yo'nalish",
      },
    },
  });
  const [major, setMajor] = useState({
    labels: [
      "IT",
      "RUSSIA",
      "RUSSIA_KIDS",
      "ENGLISH",
      "ENGLISH_KIDS",
      "MATEMATIKA",
      "DTM",
      "BUGALTERIYA",
    ],
    datasets: [
      {
        label: "O'quvchi",
        data: [12, 12, 12, 12, 12, 12],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    if (filterByMajor) {
      let labels = [];
      let innerData = [];
      let sum = 0;
      Object.entries(filterByMajor).forEach(([key, value]) => {
        labels.push(key.toUpperCase());
        innerData.push(value);
        sum += value;
      });
      let copyMajor = structuredClone(major);
      let copyMajortOption = structuredClone(majorOption);

      copyMajor.labels = labels;
      copyMajor.datasets[0].data = innerData;

      copyMajortOption.plugins.title.text = `jami: ${sum}`;

      setMajor(copyMajor);
      setMajorOption(copyMajortOption);
    }
  }, [filterByMajor]);
  // majorFilter finished

  // regionFilter started
  const [regionOption, setRegionOption] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Hudud",
      },
    },
  });
  const [region, setRegion] = useState({
    labels: [
      "Namangan shahar",
      "Pop",
      "Uchqurgon",
      "Yangi qurgon",
      "Chust",
      "Chortoq",
      "Uychi",
      "To'raqo'rg'on",
    ],
    datasets: [
      {
        label: "Hudud",
        data: [12, 12, 12, 12, 12, 12, 12, 12],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    if (filterByRegion) {
      let labels = [];
      let innerData = [];
      let sum = 0;

      Object.entries(filterByRegion).forEach(([key, value]) => {
        labels.push(key.capitalLetter());
        innerData.push(value);
        sum += value;
      });
      let copyRegion = structuredClone(region);
      let copyRegiontOption = structuredClone(regionOption);

      copyRegion.labels = labels;
      copyRegion.datasets[0].data = innerData;

      copyRegiontOption.plugins.title.text = `jami: ${sum}`;

      setRegion(copyRegion);
      setRegionOption(copyRegiontOption);
    }
  }, [filterByRegion]);
  // regionFilter finished

  // genderFilter started
  const [genderOption, setGenderOption] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gender",
      },
    },
  });
  const [gender, setGender] = useState({
    labels: ["Qiz bola", "O'gil bola"],
    datasets: [
      {
        label: "O'quvchi",
        data: [12, 13],
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    if (filterByGender) {
      let labels = [];
      let innerData = [];
      let sum = 0;

      Object.entries(filterByGender).forEach(([key, value]) => {
        var tempObj = {
          male: "O'g'il bola",
          female: "Qiz bola",
        };
        labels.push(tempObj[key] || key);
        innerData.push(value);
        sum += value;
      });
      let copyGender = structuredClone(gender);
      let copyGendertOption = structuredClone(genderOption);

      copyGender.labels = labels;
      copyGender.datasets[0].data = innerData;

      copyGendertOption.plugins.title.text = `jami: ${sum}`;

      setGender(copyGender);
      setGenderOption(copyGendertOption);
    }
  }, [filterByGender]);
  // genderFilter finished

  // dateFilter Bar chart started
  const [dataBarOption, setDataBarOption] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Oylik",
      },
    },
  });
  const [dataBar, setDataBar] = useState({
    labels: [""],
    datasets: [
      {
        label: "Markazga O'quvchilar kelishi",
        data: [0],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  });
  useEffect(() => {
    if (filterByDate) {
      let copyDataBar = structuredClone(dataBar);
      let copyDataBarOption = structuredClone(dataBarOption);
      copyDataBar.labels = Object.keys(
        showingYearly ? filterByDate?.onlyYear : filterByDate?.onlyMonth
      );
      copyDataBar.datasets[0].data = Object.values(
        showingYearly ? filterByDate?.onlyYear : filterByDate?.onlyMonth
      );

      copyDataBarOption.plugins.title.text = showingYearly ? "Yillik" : "Oylik";

      setDataBarOption(copyDataBarOption);
      setDataBar(copyDataBar);
    }
  }, [filterByDate, showingYearly]);
  // dateFilter Bar chart finished

  return (
    <div className="statistics">
      <div className="get__navbar get__group-navbar">
        <h3>O'quv markazi Statistikasi</h3>
      </div>
      <div className="statistics__container">
        <div className="statistics__item">
          {filterByMajorLoading ? (
            <h1>Yuklanyapti</h1>
          ) : filterByMajorError ? (
            <h1>Yo'nalish bo'yicha xatolik bor</h1>
          ) : (
            <ChartCom
              data={major}
              warning="Eslatma: ba'zi o'quvchilar bir nechta guruhda o'qiganligi uchun o'quvchilar soni ko'proq"
              options={majorOption}
              title={`Yo'nalish`}
            />
          )}
        </div>
        <div className="statistics__item">
          {filterByRegionLoading ? (
            <h1>Yuklanyapti</h1>
          ) : filterByRegionError ? (
            <h1>Hudud bo'yicha xatolik bor</h1>
          ) : (
            <ChartCom data={region} options={regionOption} title="Hudud" />
          )}
        </div>
        <div className="statistics__item">
          {filterByGenderLoading ? (
            <h1>Yuklanyapti</h1>
          ) : filterByGenderError ? (
            <h1>Gender bo'yicha xatolik bor</h1>
          ) : (
            <ChartCom data={gender} options={genderOption} title="Gender" />
          )}
        </div>
      </div>
      <div className="statistics__container">
        {filterByDateLoading ? (
          <h1>Yuklanyapti</h1>
        ) : filterByDateError ? (
          <h1>Gender bo'yicha xatolik bor</h1>
        ) : (
          <>
            <button onClick={() => setShowingYearly((e) => !e)}>
              {showingYearly ? "Oylik ko'rish" : "Yillik ko'rish"}
            </button>
            <Bar options={dataBarOption} data={dataBar} />
          </>
        )}
      </div>
    </div>
  );
}

export default Statistics;
