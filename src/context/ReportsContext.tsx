import { createContext, useState } from "react";
import { ReportsContextProps, ReportProps, ReportsProviderProps } from "../@types";

const reportsData: ReportProps[] = [];

export const ReportsContext = createContext<ReportsContextProps>({
  reports: [],
  addReport: () => {},
});

export const ReportsProvider = ({ children }: ReportsProviderProps) => {
  const [reports, setReports] = useState<ReportProps[]>(reportsData);

  const addReport = (report: ReportProps) => {
    setReports([...reports, report]);
  };

  const removeReport = () => {};

  const downloadReport = () => {};

  return (
    <ReportsContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportsContext.Provider>
  );
};
