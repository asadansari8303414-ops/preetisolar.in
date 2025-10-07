export interface StateSubsidy {
  name: string;
  subsidyPerKW: {
    upTo2kW: number;
    from2to3kW: number;
    above3kW: number;
  };
  maxSubsidy: number;
  scheme: string;
  additionalBenefits: string[];
}

export const stateSubsidyData: Record<string, StateSubsidy> = {
  "uttar-pradesh": {
    name: "Uttar Pradesh",
    subsidyPerKW: {
      upTo2kW: 45000,
      from2to3kW: 22500,
      above3kW: 0
    },
    maxSubsidy: 108000,
    scheme: "PM Surya Ghar Yojana + State Subsidy",
    additionalBenefits: [
      "Net metering facility",
      "Faster approval process",
      "25-year panel warranty",
      "Free installation support"
    ]
  },
  "maharashtra": {
    name: "Maharashtra",
    subsidyPerKW: {
      upTo2kW: 30000,
      from2to3kW: 15000,
      above3kW: 15000
    },
    maxSubsidy: 105000,
    scheme: "MSEDCL Solar Rooftop Scheme",
    additionalBenefits: [
      "Net metering available",
      "Online application",
      "Banking facility",
      "20% advance subsidy"
    ]
  },
  "rajasthan": {
    name: "Rajasthan",
    subsidyPerKW: {
      upTo2kW: 40000,
      from2to3kW: 20000,
      above3kW: 10000
    },
    maxSubsidy: 100000,
    scheme: "Rajasthan Solar Energy Policy",
    additionalBenefits: [
      "Gross metering option",
      "State additional incentive",
      "Easy documentation",
      "Rural priority scheme"
    ]
  },
  "gujarat": {
    name: "Gujarat",
    subsidyPerKW: {
      upTo2kW: 35000,
      from2to3kW: 18000,
      above3kW: 12000
    },
    maxSubsidy: 95000,
    scheme: "Gujarat Solar Power Policy",
    additionalBenefits: [
      "Net metering facility",
      "Single window clearance",
      "Agriculture subsidy extra",
      "Green energy certificate"
    ]
  },
  "madhya-pradesh": {
    name: "Madhya Pradesh",
    subsidyPerKW: {
      upTo2kW: 42000,
      from2to3kW: 21000,
      above3kW: 8000
    },
    maxSubsidy: 105000,
    scheme: "MP Urja Vikas Nigam Scheme",
    additionalBenefits: [
      "Tribal area extra subsidy",
      "Net metering available",
      "Quick approval",
      "Maintenance support"
    ]
  },
  "bihar": {
    name: "Bihar",
    subsidyPerKW: {
      upTo2kW: 45000,
      from2to3kW: 22500,
      above3kW: 0
    },
    maxSubsidy: 108000,
    scheme: "Bihar Solar Rooftop Yojana",
    additionalBenefits: [
      "Priority for rural areas",
      "Net metering facility",
      "Free technical support",
      "Extended warranty"
    ]
  },
  "delhi": {
    name: "Delhi",
    subsidyPerKW: {
      upTo2kW: 38000,
      from2to3kW: 19000,
      above3kW: 15000
    },
    maxSubsidy: 110000,
    scheme: "Delhi Solar Policy 2024",
    additionalBenefits: [
      "Virtual net metering",
      "Community solar option",
      "Fast track approval",
      "Pollution reduction incentive"
    ]
  },
  "haryana": {
    name: "Haryana",
    subsidyPerKW: {
      upTo2kW: 40000,
      from2to3kW: 20000,
      above3kW: 10000
    },
    maxSubsidy: 100000,
    scheme: "Haryana Renewable Energy Policy",
    additionalBenefits: [
      "Net metering available",
      "Agriculture extra benefit",
      "Quick disbursement",
      "Technical assistance"
    ]
  },
  "punjab": {
    name: "Punjab",
    subsidyPerKW: {
      upTo2kW: 38000,
      from2to3kW: 19000,
      above3kW: 12000
    },
    maxSubsidy: 98000,
    scheme: "Punjab Solar Power Policy",
    additionalBenefits: [
      "Agriculture subsidy extra",
      "Net metering facility",
      "Single window clearance",
      "Free energy audit"
    ]
  },
  "other": {
    name: "Other States",
    subsidyPerKW: {
      upTo2kW: 30000,
      from2to3kW: 15000,
      above3kW: 10000
    },
    maxSubsidy: 78000,
    scheme: "PM Surya Ghar Yojana (Central)",
    additionalBenefits: [
      "Central government scheme",
      "Available nationwide",
      "Standard benefits",
      "Technical support"
    ]
  }
};

export const calculateSubsidy = (state: string, systemSizeKW: number): number => {
  const stateData = stateSubsidyData[state] || stateSubsidyData["other"];
  let totalSubsidy = 0;

  if (systemSizeKW <= 2) {
    totalSubsidy = systemSizeKW * stateData.subsidyPerKW.upTo2kW;
  } else if (systemSizeKW <= 3) {
    totalSubsidy = 
      (2 * stateData.subsidyPerKW.upTo2kW) + 
      ((systemSizeKW - 2) * stateData.subsidyPerKW.from2to3kW);
  } else {
    totalSubsidy = 
      (2 * stateData.subsidyPerKW.upTo2kW) + 
      (1 * stateData.subsidyPerKW.from2to3kW) + 
      ((systemSizeKW - 3) * stateData.subsidyPerKW.above3kW);
  }

  return Math.min(totalSubsidy, stateData.maxSubsidy);
};
