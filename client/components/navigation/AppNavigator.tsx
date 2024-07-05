// AppNavigator.tsx

export interface Residence {
  _id: number;
  address: string;
  price: string;
  description: string;
  contact_info: string;
  status: "pending" | "approved" | "declined";
  operation:"rent" | "sale";
  images: string[];
}

export type RootTabParamList = {
  HousesScreen: undefined;
  PropertyDetailsScreen: { residence: Residence };
  // Add other screens in your tab navigator as needed
};

