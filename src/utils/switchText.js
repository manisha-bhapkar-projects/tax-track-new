export const MARITAL_STATUS = (id) => {
  switch (id) {
    case 1:
      return "Single";
    case 2:
      return "Married";
    case 3:
      return "Widowed";
    case 4:
      return "Divorced";
    default:
      return id;
  }
};

export const TAX_OFFICE_SOFTWARE = (id) => {
  switch (id) {
    case 1:
      return "TAX CALC";
    case 2:
      return "CLIENT RDP";
    case 3:
      return "IRIS";
    default:
      return id;
  }
};

export const JOB_STATUS = (id) => {
  switch (id) {
    case 1:
      return "Job in progress";
    case 2:
      return "Job in query";
    case 3:
      return "Job complete";
    case 4:
      return "Job under Review";
    case 5:
      return "Job not started";
    default:
      return id;
  }
};

export const JOB_STATUS_CLASS = (_class) => {
  switch (_class) {
    case "Job in progress":
      return "job-in-progress";
    case "Job in query":
      return "job-in-query";
    case "Job complete":
      return "job-complete";
    case "Job under Review":
      return "job-under-review";
    case "Job not started":
      return "job-not-started";
    default:
      return " ";
  }
};
