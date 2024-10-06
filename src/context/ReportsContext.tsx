import { createContext, useEffect, useState } from "react";
import { loadData } from "../utils/functions/load-data";
import { saveData } from "../utils/functions/save-data";
import {
  ReportsContextProps,
  ReportProps,
  ReportsProviderProps,
} from "../@types";

const reportsData: ReportProps[] = [];

export const ReportsContext = createContext<ReportsContextProps>({
  reports: [],
  addReport: () => {},
});

export const ReportsProvider = ({ children }: ReportsProviderProps) => {
  const [reports, setReports] = useState<ReportProps[]>(reportsData);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await loadData("reports");
      setReports(storedData);
    };

    fetchData();
  }, []);

  const addReport = async (report: ReportProps) => {
    await saveData("reports", report);
    const updatedReports = await loadData("reports");

    setReports(updatedReports);
  };

  const removeReport = () => {};

  const downloadReport = () => {};

  return (
    <ReportsContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportsContext.Provider>
  );
};
