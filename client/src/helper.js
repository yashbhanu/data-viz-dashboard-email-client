export const generateChartsData = (data, barChartLabels) => {
    const lineChartLabelSet = new Set()
    const arr = new Array(barChartLabels.length).fill(0);
    if (data?.length > 0) {
      for (const feature of data) {
        const date = new Date(feature["Day"]).toISOString()
        lineChartLabelSet.add(formatDateForLabels(date))
        arr[0] += feature["A"];
        arr[1] += feature["B"];
        arr[2] += feature["C"];
        arr[3] += feature["D"];
        arr[4] += feature["E"];
        arr[5] += feature["F"];
      }

      const lineChartData = data.reduce((acc, item) => {
        const day = item.Day;
        if (!acc[day]) {
          acc[day] = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
        }
        acc[day].A += item.A;
        acc[day].B += item.B;
        acc[day].C += item.C;
        acc[day].D += item.D;
        acc[day].E += item.E;
        acc[day].F += item.F;
        return acc;
      }, {});

      const formatLineChartData = {
        A: Object.values(lineChartData).map((day) => day.A),
        B: Object.values(lineChartData).map((day) => day.B),
        C: Object.values(lineChartData).map((day) => day.C),
        D: Object.values(lineChartData).map((day) => day.D),
        E: Object.values(lineChartData).map((day) => day.E),
        F: Object.values(lineChartData).map((day) => day.F),
      };

      const lineChartLabels = Array.from(lineChartLabelSet)

      return { formatLineChartData,arr,lineChartLabels }
    }
  };

  export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  export const formatDateForLabels = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getUTCDate()}/${
      date.getUTCMonth() + 1
    }/${date.getUTCFullYear()}`;
    return formattedDate;
  };

  export const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text)
  }

  export const convertEpochToDateTime = (val) => {
    const date = new Date(val);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const format = hours >= 12 ? "pm" : "am";
  
    hours = hours % 12 || 12;
    hours = String(hours).padStart(2, "0");
  
    return `${day}/${month}/${year} ${hours}:${minutes}${format}`;
  };
  
  export const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };
  