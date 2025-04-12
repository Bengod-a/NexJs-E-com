"use client";

import React, { use, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import NavBarAdmin from "../../components/admin/NavbarAdmin";
import useStore from "../../store/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const user = useStore((s) => s.user);

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales ($)",
        data: [1200, 1900, 3000, 2500, 4000, 3200],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Sales Overview",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <NavBarAdmin />
      <div className="p-4 px-20">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Sales Dashboard
          </h2>
          <div className="bg-white  p-4 rounded-lg shadow">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="mt-5">
          <div className="grid md:grid-cols-4 grid-cols-2 items-center gap-2">
            <div className="bg-amber-400 p-6 rounded-md justify-center w-full">
              <div className="flex items-center w-full justify-center">
                <h1 className="text-white mx-auto my-auto flex items-center justify-center gap-2">
                  ขายแล้ว <span>10</span>
                </h1>
              </div>
            </div>
            <div className="bg-amber-400 p-6 rounded-md justify-center w-full">
              <div className="flex items-center w-full justify-center">
                <h1 className="text-white mx-auto my-auto flex items-center justify-center gap-2">
                  ขายแล้ว <span>10</span>
                </h1>
              </div>
            </div>
            <div className="bg-amber-400 p-6 rounded-md justify-center w-full">
              <div className="flex items-center w-full justify-center">
                <h1 className="text-white mx-auto my-auto flex items-center justify-center gap-2">
                  ขายแล้ว <span>10</span>
                </h1>
              </div>
            </div>
            <div className="bg-amber-400 p-6 rounded-md justify-center w-full">
              <div className="flex items-center w-full justify-center">
                <h1 className="text-white mx-auto my-auto flex items-center justify-center gap-2">
                  ขายแล้ว <span>10</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
